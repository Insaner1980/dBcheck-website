import assert from 'node:assert/strict';
import test from 'node:test';
import config from '../astro.config.mjs';

const renderer = await config.markdown.processor.createRenderer({});
const render = (source, name = 'editorial-safety.md') =>
  renderer.render(source, { fileURL: new URL(`./fixtures/${name}`, import.meta.url) });

test('rejects Markdown H1 headings and raw HTML with source context', async () => {
  for (const [source, message] of [
    ['# Second page title', /must not contain an H1/],
    ['<h1 onclick="alert(1)">Second page title</h1>', /Raw HTML is not allowed/],
    ['<script>alert(1)</script>', /Raw HTML is not allowed/],
    ['<span class="katex">manual math</span>', /Raw HTML is not allowed/],
    ['<p class="broken"', /Raw HTML is not allowed/],
  ]) {
    await assert.rejects(render(source), (error) => {
      assert.match(error.message, /editorial-safety\.md/);
      assert.match(error.message, message);
      return true;
    });
  }
});

test('rejects executable link schemes and accepts current safe URL forms', async () => {
  for (const source of ['[Run](javascript:alert(1))', '[Payload](data:text/html,<script>alert(1)</script>)']) {
    await assert.rejects(render(source), /Unsafe URL scheme/);
  }

  await assert.doesNotReject(render([
    '[Local](/articles/what-is-a-decibel/)',
    '[Relative](../reference/)',
    '[Fragment](#sources)',
    '[Source](https://example.com/reference)',
  ].join('\n\n')));
});

test('publishes root-relative linked routes from inline, fragment and reference links in document order', async () => {
  const result = await render([
    '[Plain inline](/articles/plain-inline/)',
    '[Fragment inline](/articles/with-fragment/#definition)',
    '[Reference style][related]',
    '',
    '[related]: /sounds/reference-style/',
  ].join('\n\n'));

  assert.deepEqual(result.metadata.frontmatter.linkedRoutes, [
    '/articles/plain-inline/',
    '/articles/with-fragment/',
    '/sounds/reference-style/',
  ]);
});
