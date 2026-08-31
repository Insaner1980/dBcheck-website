import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEFAULT_PRO_PRICE,
  getProPriceForCountry,
  parseCloudflareTraceCountry,
  splitPriceDisplay,
} from '../src/data/prices.ts';

test('accepts one exact Cloudflare loc field in a plain trace', () => {
  const validTraces = [
    ['loc=US', 'US'],
    ['fl=redacted\nloc=de\nwarp=off', 'DE'],
    ['fl=redacted\r\nloc=Gb\r\nwarp=off\r\n', 'GB'],
    ['\nfl=redacted\n\nloc=jp\n', 'JP'],
    [
      [
        'fl=redacted',
        'h=example.com',
        'ip=redacted',
        'ts=redacted',
        'visit_scheme=https',
        'uag=Mozilla/5.0 (test; token=value)',
        'colo=HEL',
        'sliver=none',
        'http=http/2',
        'loc=fi',
        'tls=TLSv1.3',
        'sni=plaintext',
        'warp=off',
        'gateway=off',
        'rbi=off',
        'kex=X25519MLKEM768',
      ].join('\n'),
      'FI',
    ],
  ];

  for (const [trace, expected] of validTraces) {
    assert.equal(parseCloudflareTraceCountry(trace), expected, JSON.stringify(trace));
  }
});

test('rejects malformed traces and every ambiguous loc form', () => {
  const invalidTraces = [
    '',
    'fl=redacted\nwarp=off',
    'loc=',
    'loc=U',
    'loc=USA',
    'loc=U1',
    'loc=ÜS',
    'loc= US',
    'loc=US ',
    ' loc=US',
    'loc =US',
    'loc=US\nloc=DE',
    'loc=US\nLOC=DE',
    'loc=GB\nloc=USA',
    'loc=USA\nloc=GB',
    '<html>\nloc=US\n</html>',
    'garbage\nloc=US',
    'loc=US\r',
    'fl=redacted\rloc=US',
    ' \nloc=US',
  ];

  for (const trace of invalidTraces) {
    assert.equal(parseCloudflareTraceCountry(trace), undefined, JSON.stringify(trace));
    assert.equal(getProPriceForCountry(parseCloudflareTraceCountry(trace)), DEFAULT_PRO_PRICE);
  }
});

test('keeps the default price for an unknown but well-formed country code', () => {
  const countryCode = parseCloudflareTraceCountry('fl=redacted\nloc=zz\nwarp=off');

  assert.equal(countryCode, 'ZZ');
  assert.equal(getProPriceForCountry(countryCode), DEFAULT_PRO_PRICE);
});

test('keeps every configured localized price display intact when splitting it', () => {
  const displays = ['€14.99', '$14.99', 'US$14.99', 'CA$19.99', 'A$22.99', '£14.99', 'CHF 14.99', '₹1,299', 'R$79.90', 'Mex$299', 'NZ$24.99', '¥2 400'];

  for (const display of displays) {
    const { prefix, amount, suffix } = splitPriceDisplay(display);
    assert.equal(`${prefix}${amount}${suffix}`, display);
    assert.match(amount, /^\d/);
    assert.match(amount, /\d$/);
  }
});
