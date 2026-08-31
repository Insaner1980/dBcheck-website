import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import test from 'node:test';
import { splitPriceDisplay } from '../src/data/prices.ts';
import { findRoutePair } from '../src/i18n/routes.ts';
import { validateEditorialPublicationIntegrity } from '../src/lib/validate-content-route-collisions.mjs';

test('splits localized price displays without changing their visible parts', () => {
  assert.deepEqual(splitPriceDisplay('US$24.99 / month'), {
    prefix: 'US$',
    amount: '24.99',
    suffix: ' / month',
  });
  assert.deepEqual(splitPriceDisplay('2 400 JPY'), {
    prefix: '',
    amount: '2 400',
    suffix: ' JPY',
  });
  assert.deepEqual(splitPriceDisplay('Free'), {
    prefix: '',
    amount: 'Free',
    suffix: '',
  });
});

test('route lookup rejects a long malformed path without regex backtracking', () => {
  const malformedPath = `${'/'.repeat(20_000)}x`;
  const startedAt = performance.now();

  assert.equal(findRoutePair(malformedPath), undefined);
  assert.ok(performance.now() - startedAt < 100, 'route normalization took too long');
});

test('editorial validation rejects a long malformed route without regex backtracking', async () => {
  const malformedRoute = `${'/'.repeat(20_000)}x`;
  const startedAt = performance.now();

  await assert.doesNotReject(() => validateEditorialPublicationIntegrity({
    entries: [{
      collection: 'articles',
      locale: 'en',
      sourceSlug: 'draft',
      slug: 'draft',
      route: '/articles/draft/',
      draft: true,
      sourcePath: 'articles/en/draft.md',
      content: '',
    }],
    soundEntries: [{ articleRoute: malformedRoute }],
  }));
  assert.ok(performance.now() - startedAt < 100, 'editorial route normalization took too long');
});
