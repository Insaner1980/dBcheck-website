import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';
import { readEditorialEntries, validateEditorialPublicationIntegrity, validateEditorialRouteCollisions, validateEditorialTranslationKeyCollisions } from '../src/lib/validate-content-route-collisions.mjs';

const withContentFixture = (files, callback) => {
  const contentDir = mkdtempSync(join(tmpdir(), 'dbcheck-content-routes-'));
  try {
    mkdirSync(join(contentDir, 'articles'), { recursive: true });
    mkdirSync(join(contentDir, 'sounds'), { recursive: true });
    for (const [path, source] of Object.entries(files)) {
      const target = join(contentDir, path);
      mkdirSync(join(target, '..'), { recursive: true });
      writeFileSync(target, source);
    }
    const result = callback(contentDir);
    if (result && typeof result.then === 'function') {
      return Promise.resolve(result).finally(() => rmSync(contentDir, { recursive: true, force: true }));
    }
    rmSync(contentDir, { recursive: true, force: true });
    return result;
  } catch (error) {
    rmSync(contentDir, { recursive: true, force: true });
    throw error;
  }
};

const editorialFrontmatter = (locale, slug, translationKey = slug, draft = false) => `---\nlocale: ${locale}\nslug: ${slug}\ntranslationKey: ${translationKey}${draft ? '\ndraft: true' : ''}\n---\n`;

test('accepts unique editorial route IDs', () => {
  withContentFixture({
    'articles/en/one.md': editorialFrontmatter('en', 'one'),
    'articles/de/eins.md': editorialFrontmatter('de', 'one'),
    'sounds/en/one.md': editorialFrontmatter('en', 'one'),
    'sounds/de/eins.md': editorialFrontmatter('de', 'one'),
  }, (contentDir) => {
    assert.doesNotThrow(() => validateEditorialRouteCollisions({ contentDir }));
  });
});

test('rejects duplicate collection, locale, and slug with both source files', () => {
  withContentFixture({
    'articles/en/first.md': editorialFrontmatter('en', 'same-route'),
    'articles/en/second.md': editorialFrontmatter('en', 'same-route'),
  }, (contentDir) => {
    assert.throws(
      () => validateEditorialRouteCollisions({ contentDir }),
      (error) => {
        assert.match(error.message, /content-route-collision/);
        assert.match(error.message, /articles\/en\/same-route/);
        assert.match(error.message, /articles\/en\/first\.md/);
        assert.match(error.message, /articles\/en\/second\.md/);
        return true;
      },
    );
  });
});

test('rejects different loader IDs that Astro normalizes to one public route', () => {
  withContentFixture({
    'articles/en/plain.md': editorialFrontmatter('en', 'same-route'),
    'articles/en/slashed.md': editorialFrontmatter('en', '/same-route/'),
  }, (contentDir) => {
    assert.throws(
      () => validateEditorialRouteCollisions({ contentDir }),
      (error) => {
        assert.match(error.message, /public route parameters/);
        assert.match(error.message, /articles\/en\/same-route/);
        assert.match(error.message, /articles\/en\/plain\.md/);
        assert.match(error.message, /articles\/en\/slashed\.md/);
        return true;
      },
    );
  });
});

test('ignores dot-prefixed entries like Astro glob loaders', () => {
  withContentFixture({
    'articles/en/visible.md': editorialFrontmatter('en', 'same-route'),
    'articles/en/.ignored.md': editorialFrontmatter('en', 'same-route'),
  }, (contentDir) => {
    assert.doesNotThrow(() => validateEditorialRouteCollisions({ contentDir }));
  });
});

test('loads only immediate Markdown files from configured locale directories', () => {
  withContentFixture({
    'articles/en/visible.md': editorialFrontmatter('en', 'visible'),
    'articles/en/notes/nested.md': editorialFrontmatter('en', 'nested'),
    'articles/notes/source-copy.md': editorialFrontmatter('en', 'source-copy'),
    'articles/fr/unconfigured.md': editorialFrontmatter('fr', 'unconfigured'),
  }, (contentDir) => {
    assert.deepEqual(readEditorialEntries({ contentDir }).map((entry) => entry.sourcePath), ['articles/en/visible.md']);
  });
});

test('allows one bilingual translation pair within an editorial collection', () => {
  withContentFixture({
    'articles/en/one.md': editorialFrontmatter('en', 'one', 'shared-key'),
    'articles/de/eins.md': editorialFrontmatter('de', 'eins', 'shared-key'),
  }, (contentDir) => {
    assert.doesNotThrow(() => validateEditorialTranslationKeyCollisions({ contentDir }));
  });
});

test('rejects a translation key reused across editorial collections with all source files', () => {
  withContentFixture({
    'articles/en/article.md': editorialFrontmatter('en', 'article', 'shared-key'),
    'sounds/en/sound.md': editorialFrontmatter('en', 'sound', 'shared-key'),
  }, (contentDir) => {
    assert.throws(
      () => validateEditorialTranslationKeyCollisions({ contentDir }),
      (error) => {
        assert.match(error.message, /editorial-translation-key-collision/);
        assert.match(error.message, /shared-key/);
        assert.match(error.message, /articles\/en\/article\.md/);
        assert.match(error.message, /sounds\/en\/sound\.md/);
        return true;
      },
    );
  });
});

test('rejects two entries with the same translation key, collection, and locale', () => {
  withContentFixture({
    'articles/en/first.md': editorialFrontmatter('en', 'first', 'shared-key'),
    'articles/en/second.md': editorialFrontmatter('en', 'second', 'shared-key'),
  }, (contentDir) => {
    assert.throws(
      () => validateEditorialTranslationKeyCollisions({ contentDir }),
      (error) => {
        assert.match(error.message, /shared-key/);
        assert.match(error.message, /articles\/en/);
        assert.match(error.message, /articles\/en\/first\.md/);
        assert.match(error.message, /articles\/en\/second\.md/);
        return true;
      },
    );
  });
});

test('rejects a draft route remaining in the translation registry', async () => {
  await withContentFixture({
    'articles/en/draft.md': editorialFrontmatter('en', 'draft', 'draft', true),
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({
        contentDir,
        contentTranslations: [{ collection: 'articles', en: 'draft', de: 'entwurf' }],
      }),
      (error) => {
        assert.match(error.message, /src\/i18n\/routes\.ts/);
        assert.match(error.message, /\/articles\/draft\//);
        assert.match(error.message, /articles\/en\/draft\.md/);
        return true;
      },
    );
  });
});

test('rejects a sound-data link to a draft sound guide', async () => {
  await withContentFixture({
    'sounds/en/draft.md': editorialFrontmatter('en', 'draft', 'draft', true),
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({
        contentDir,
        soundEntries: [{ articleRoute: '/sounds/draft/' }],
      }),
      (error) => {
        assert.match(error.message, /src\/data\/sounds\.ts/);
        assert.match(error.message, /\/sounds\/draft\//);
        assert.match(error.message, /sounds\/en\/draft\.md/);
        return true;
      },
    );
  });
});

test('rejects a published sound guide without a translation key', async () => {
  await withContentFixture({
    'sounds/en/missing-key.md': '---\nlocale: en\nslug: missing-key\n---\n',
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({ contentDir }),
      (error) => {
        assert.match(error.message, /sound-guide-publication-integrity/);
        assert.match(error.message, /must declare a translationKey/);
        assert.match(error.message, /sounds\/en\/missing-key\.md/);
        return true;
      },
    );
  });
});

test('rejects a sound-data guide link with no published Markdown', async () => {
  await withContentFixture({}, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({
        contentDir,
        soundEntries: [{ locale: 'en', translationKey: 'missing', articleRoute: '/sounds/missing/' }],
      }),
      (error) => {
        assert.match(error.message, /sound-guide-publication-integrity/);
        assert.match(error.message, /no published sound Markdown exists/);
        return true;
      },
    );
  });
});

test('rejects duplicate sound-data locale and translation-key identities', async () => {
  await withContentFixture({
    'sounds/en/live.md': editorialFrontmatter('en', 'live', 'live'),
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({
        contentDir,
        soundEntries: [
          { locale: 'en', translationKey: 'live', slug: 'live', articleRoute: '/sounds/live/' },
          { locale: 'en', translationKey: 'live', slug: 'live', articleRoute: '/sounds/live/' },
        ],
      }),
      (error) => {
        assert.match(error.message, /sound-guide-publication-integrity/);
        assert.match(error.message, /duplicate identity en\/live/);
        return true;
      },
    );
  });
});

test('rejects published sound Markdown without an Explorer guide link', async () => {
  await withContentFixture({
    'sounds/en/live.md': editorialFrontmatter('en', 'live', 'live'),
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({
        contentDir,
        soundEntries: [{ locale: 'en', translationKey: 'live' }],
      }),
      (error) => {
        assert.match(error.message, /sound-guide-publication-integrity/);
        assert.match(error.message, /does not expose its guide link/);
        return true;
      },
    );
  });
});

test('rejects a published Markdown link to a draft editorial route', async () => {
  await withContentFixture({
    'articles/en/draft.md': editorialFrontmatter('en', 'draft', 'draft', true),
    'articles/en/published.md': `${editorialFrontmatter('en', 'published')}[Draft](/articles/draft/)`,
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({ contentDir }),
      (error) => {
        assert.match(error.message, /articles\/en\/published\.md/);
        assert.match(error.message, /\/articles\/draft\//);
        assert.match(error.message, /articles\/en\/draft\.md/);
        return true;
      },
    );
  });
});

test('rejects a reference-style Markdown link to a draft editorial route', async () => {
  await withContentFixture({
    'articles/en/draft.md': editorialFrontmatter('en', 'draft', 'draft', true),
    'articles/en/published.md': `${editorialFrontmatter('en', 'published')}[Draft][draft-link]\n\n[draft-link]: /articles/draft/`,
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({ contentDir }),
      (error) => {
        assert.match(error.message, /articles\/en\/published\.md/);
        assert.match(error.message, /\/articles\/draft\//);
        return true;
      },
    );
  });
});

test('ignores draft-like links inside fenced code', async () => {
  await withContentFixture({
    'articles/en/draft.md': editorialFrontmatter('en', 'draft', 'draft', true),
    'articles/en/published.md': `${editorialFrontmatter('en', 'published')}\`\`\`markdown\n[Draft][draft-link]\n\n[draft-link]: /articles/draft/\n\`\`\``,
  }, async (contentDir) => {
    await assert.doesNotReject(() => validateEditorialPublicationIntegrity({ contentDir }));
  });
});

test('rejects a localized sound-data slug that differs from its published guide', async () => {
  await withContentFixture({
    'sounds/de/live.md': editorialFrontmatter('de', 'richtiger-slug', 'live'),
  }, async (contentDir) => {
    await assert.rejects(
      () => validateEditorialPublicationIntegrity({
        contentDir,
        soundEntries: [{
          locale: 'de',
          translationKey: 'live',
          slug: '/richtiger-slug/',
          articleRoute: '/de/alltagsgeraeusche/richtiger-slug/',
        }],
      }),
      (error) => {
        assert.match(error.message, /\/richtiger-slug\//);
        assert.match(error.message, /published slug is richtiger-slug/);
        return true;
      },
    );
  });
});

test('allows an unregistered draft with no inbound editorial link', async () => {
  await withContentFixture({
    'articles/en/draft.md': editorialFrontmatter('en', 'draft', 'draft', true),
  }, async (contentDir) => {
    await assert.doesNotReject(() => validateEditorialPublicationIntegrity({ contentDir }));
  });
});
