// Run after npm run build with npm run test:text-wrapping. Requires an installed
// Chrome/Chromium browser (CHROME_BIN overrides discovery) and network access for
// Google Fonts and the browser's signed hyphenation dictionaries.
// Starts its own Astro preview and temporary headless browser profile; no driver dependency.
// Also inspect screenshots of splitWords when changing the typography:
// DOM ranges and computed hyphens cannot prove that a hyphen glyph was painted.
import assert from 'node:assert/strict';
import { spawn, execFile } from 'node:child_process';
import { once } from 'node:events';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, readdir, realpath, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, delimiter, dirname, join, resolve, sep } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

export const textWrappingCases = [
  { route: '/de/werkzeuge/laermexpositionsrechner/', widths: [320, 360, 375, 393, 412], targets: ['Arbeitsabschnitte zu einem L_EX,8h-Wert zusammenfassen.', 'Tages-Lärmexpositionspegel'] },
  { route: '/de/artikel/laermexpositionsgrenzen-deutschland-eu/', widths: [320, 768, 1440], targets: ['Lärmexpositionsgrenzen', 'Tages-Lärmexpositionspegel'] },
  { route: '/de/artikel/was-ist-schalldruckpegel/', widths: [320, 360], targets: ['Schalldruckpegel', 'Frequenzbewertungen'] },
  { route: '/de/artikel/wie-lange-85-db-hoeren/', widths: [320], targets: ['Umgebungsmessung'] },
  { route: '/de/artikel/sind-dezibel-apps-genau/', widths: [320], targets: ['Mikrofonempfindlichkeit'] },
  { route: '/de/werkzeuge/', widths: [320, 375], targets: ['Berechnungen', 'Lärmexpositionsrechner'] },
  { route: '/tools/', widths: [320], targets: ['calculations'] },
  { route: '/de/werkzeuge/expositionsdauer-rechner/', widths: [320], targets: ['Schallenergie', 'Kein Sicherheitsversprechen'] },
  { route: '/de/alltagsgeraeusche/', widths: [320, 412], targets: ['Alltagsgeräusche'] },
  { route: '/de/artikel/schallpegelmesser-app-vs-messgeraet/', widths: [320, 412], targets: ['Schallpegelmessgerät'] },
  { route: '/de/artikel/warum-dezibel-apps-unterschiedliche-werte-zeigen/', widths: [320, 360], targets: ['unterschiedliche'] },
];

// The adapter lets the existing browser tool run this suite without a project
// dependency on a particular browser driver. evaluate runs the function in-page.
export async function verifyTextWrapping({ navigate, resize, evaluate }) {
  const results = [];
  for (const sample of textWrappingCases) {
    await navigate(sample.route);
    for (const width of sample.widths) {
      await resize(width);
      const result = await evaluate(inspectTextWrapping, sample.targets);
      if (result.errors.length) throw new Error(`${sample.route} at ${width}px:\n${result.errors.join('\n')}`);
      results.push(result);
    }
  }
  return results;
}

export async function inspectTextWrapping(targets = []) {
  await document.fonts.ready;
  const errors = [];
  const splitWords = [];
  const boxes = [];
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  const visible = (element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden';
  const box = (element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return { left: rect.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft), right: rect.right - parseFloat(style.borderRightWidth) - parseFloat(style.paddingRight) };
  };
  const within = (rect, bounds, label) => {
    if (rect.left < bounds.left - 1 || rect.right > bounds.right + 1) errors.push(`${label}: outside content box (${rect.left.toFixed(1)}..${rect.right.toFixed(1)} vs ${bounds.left.toFixed(1)}..${bounds.right.toFixed(1)})`);
  };
  const textNodes = (element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const result = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.textContent.trim() && !node.parentElement.closest('.katex, [aria-hidden="true"]')) result.push(node);
    }
    return result;
  };
  const range = (node, start = 0, end = node.length) => {
    const result = document.createRange();
    result.setStart(node, start);
    result.setEnd(node, end);
    return result;
  };
  if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) errors.push('page: horizontal overflow');
  if (!document.fonts.check('700 42px "IBM Plex Mono"')
    || ![...document.fonts].some((font) => font.family.includes('IBM Plex Mono') && font.weight === '700' && font.status === 'loaded')) errors.push('heading web font is not loaded');
  for (const target of targets) {
    if (!headings.some((heading) => heading.textContent.includes(target))) errors.push(`missing heading: ${target}`);
  }
  for (const heading of headings.filter(visible)) {
    const style = getComputedStyle(heading);
    const label = heading.textContent.trim();
    if (style.wordBreak !== 'normal' || style.overflowWrap !== 'normal' || style.hyphens !== 'auto') errors.push(`${label}: incorrect wrapping semantics`);
    if (['hidden', 'clip'].includes(style.overflowX) || style.textOverflow === 'ellipsis') errors.push(`${label}: clipped heading`);
    within(heading.getBoundingClientRect(), box(heading.parentElement), label);
    const nodes = textNodes(heading);
    for (const node of nodes) {
      for (const rect of range(node).getClientRects()) within(rect, box(heading), label);
      for (const match of node.textContent.matchAll(/\p{L}{4,}/gu)) {
        const rects = [...range(node, match.index, match.index + match[0].length).getClientRects()];
        const lines = new Set(rects.map((rect) => Math.round(rect.top)));
        if (lines.size > 1) splitWords.push({ heading: label, word: match[0], hyphens: getComputedStyle(node.parentElement).hyphens });
      }
      for (const match of node.textContent.matchAll(/L_EX,8h/g)) {
        const rects = [...range(node, match.index, match.index + match[0].length).getClientRects()];
        if (new Set(rects.map((rect) => Math.round(rect.top))).size > 1) errors.push('L_EX,8h: internal line break');
      }
    }
    const last = nodes.at(-1);
    const end = last?.textContent.trimEnd().length ?? 0;
    if (end > 1 && last.textContent[end - 1] === '.') {
      const period = range(last, end - 1, end).getBoundingClientRect();
      const previous = range(last, end - 2, end - 1).getBoundingClientRect();
      if (Math.abs(period.top - previous.top) > 2) errors.push(`${label}: stranded final period`);
    }
  }
  for (const word of splitWords) {
    if (word.hyphens !== 'auto') errors.push(`${word.word}: unhyphenated intra-word break`);
  }
  for (const paragraph of document.querySelectorAll('.page-head p, .editorial-head p, .tool-card p, .prose p, .prose li')) {
    if (!visible(paragraph)) continue;
    for (const node of textNodes(paragraph)) {
      for (const rect of range(node).getClientRects()) within(rect, box(paragraph), 'prose');
    }
  }
  for (const container of document.querySelectorAll('.result-panel, .reference-grid, .reference-grid > section')) {
    if (!visible(container)) continue;
    const bounds = box(container);
    boxes.push({ className: container.className, width: bounds.right - bounds.left, scrollWidth: container.scrollWidth, clientWidth: container.clientWidth });
    for (const child of container.children) {
      if (visible(child)) within(child.getBoundingClientRect(), bounds, `${container.className || 'help card'} > ${child.tagName}`);
    }
  }
  const links = [...document.querySelectorAll('.prose a')];
  for (const link of links) {
    const raw = link.textContent === link.getAttribute('href') && /^https?:\/\//i.test(link.textContent);
    const style = getComputedStyle(link);
    if (link.hasAttribute('data-raw-url') !== raw) errors.push(`incorrect URL annotation: ${link.textContent}`);
    if (style.overflowWrap !== (raw ? 'anywhere' : 'normal')) errors.push(`incorrect link wrapping: ${link.textContent}`);
    if (raw && style.hyphens !== 'none') errors.push(`URL uses language hyphenation: ${link.textContent}`);
    if (raw) {
      const parent = link.closest('p, li');
      for (const node of textNodes(link)) for (const rect of range(node).getClientRects()) within(rect, box(parent), 'raw URL');
    }
  }
  for (const element of document.querySelectorAll('.prose table, .prose .katex-display')) {
    if (getComputedStyle(element).overflowX !== 'auto') errors.push('table/formula lost local scrolling');
    within(element.getBoundingClientRect(), box(element.parentElement), 'table/formula');
  }
  for (const element of document.querySelectorAll('code, kbd, samp, var, .katex')) {
    if (getComputedStyle(element).hyphens !== 'none') errors.push('technical text inherits language hyphenation');
  }
  for (const element of document.querySelectorAll('.hit-desc, .mobile-sound-name')) {
    if (!visible(element)) continue;
    const style = getComputedStyle(element);
    if (style.textOverflow !== 'ellipsis' || style.whiteSpace !== 'nowrap' || style.overflowX !== 'hidden') errors.push('intentional ellipsis changed');
  }
  return { route: location.pathname, width: innerWidth, lang: document.documentElement.lang, errors, splitWords, boxes, headings: headings.length, rawUrls: links.filter((link) => link.hasAttribute('data-raw-url')).length, ordinaryLinks: links.filter((link) => !link.hasAttribute('data-raw-url')).length };
}

async function run() {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const windowsBrowsers = ['Google/Chrome/Application/chrome.exe', 'Microsoft/Edge/Application/msedge.exe', 'BraveSoftware/Brave-Browser/Application/brave.exe'];
  const candidates = process.env.CHROME_BIN ? [resolve(process.env.CHROME_BIN)] : [
    ...[process.env.ProgramFiles, process.env['ProgramFiles(x86)']].filter(Boolean).flatMap((dir) => windowsBrowsers.map((path) => join(dir, path))),
    ...(process.env.PATH ?? '').split(delimiter).filter(Boolean).flatMap((dir) => ['google-chrome', 'chromium', 'chromium-browser', 'chrome.exe'].map((name) => join(dir, name))),
  ];
  const executable = candidates.find(existsSync);
  assert.ok(executable, 'No Chrome/Chromium executable found. Set CHROME_BIN to an installed browser executable. No browser is downloaded.');
  assert.ok(existsSync(join(root, 'dist/index.html')), 'Run npm run build before npm run test:text-wrapping.');
  const { parse } = await import('parse5');
  const routes = [];
  for (const path of (await readdir(join(root, 'dist'), { recursive: true })).filter((path) => path.endsWith('.html')).sort()) {
    const nodes = [parse(await readFile(join(root, 'dist', path), 'utf8'))];
    let redirect = false;
    while (nodes.length) {
      const node = nodes.pop();
      if (node.nodeName === 'meta' && node.attrs.some(({ name, value }) => name === 'http-equiv' && value.toLowerCase() === 'refresh')) redirect = true;
      nodes.push(...(node.childNodes ?? []));
    }
    if (!redirect) routes.push(`/${path.split(sep).join('/').replace(/index\.html$/, '')}`);
  }
  assert.equal(routes.length, 57, 'Expected all 57 built pages, excluding redirect documents. Check the build before updating this baseline.');
  const temporaryRoot = await realpath(tmpdir());
  const profile = await mkdtemp(join(temporaryRoot, 'dbcheck-text-wrapping-'));
  const abort = new AbortController();
  const interrupt = () => abort.abort(new Error('Browser checks interrupted.'));
  process.once('SIGINT', interrupt);
  process.once('SIGTERM', interrupt);
  let server, child, socket, send;
  let browserError;
  let browserLog = '';
  const pending = new Map();
  const until = async (check, label, timeout = 30000) => {
    const deadline = Date.now() + timeout;
    do {
      abort.signal.throwIfAborted();
      if (browserError) throw browserError;
      const value = await check();
      if (value) return value;
      await delay(50, undefined, { signal: abort.signal });
    } while (Date.now() < deadline);
    throw new Error(`Timed out waiting for ${label}. ${browserLog.slice(-1000)}`);
  };
  try {
    const { preview } = await import('astro');
    server = await preview({ root, logLevel: 'error', server: { host: '127.0.0.1', port: 0, open: false } });
    const origin = `http://127.0.0.1:${server.port}`;
    assert.ok((await fetch(origin, { signal: AbortSignal.timeout(10000) })).ok, 'Preview did not become ready.');
    child = spawn(executable, [
      '--headless', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0',
      // Let the fresh profile fetch its signed dictionaries promptly, without background downloads.
      '--component-updater=fast-update,initial-delay=0.1,disable-background-downloads',
      `--user-data-dir=${profile}`, 'about:blank',
    ], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
    child.on('error', (error) => { browserError = error; });
    child.stderr.on('data', (chunk) => { browserLog = (browserLog + chunk).slice(-4000); });
    child.on('exit', (code) => { browserError ??= new Error(`Test browser exited (${code}). ${browserLog.slice(-1000)}`); });
    const endpoint = await until(async () => {
      try {
        const [port, path] = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).trim().split(/\r?\n/);
        return port && path ? `ws://127.0.0.1:${port}${path}` : false;
      } catch (error) {
        if (error.code === 'ENOENT') return false;
        throw error;
      }
    }, 'the isolated browser');
    socket = new WebSocket(endpoint);
    await once(socket, 'open', { signal: AbortSignal.timeout(10000) });
    let nextId = 0;
    socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id);
      clearTimeout(request.timer);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
    });
    socket.addEventListener('close', () => {
      for (const request of pending.values()) {
        clearTimeout(request.timer);
        request.reject(new Error('Test browser connection closed.'));
      }
      pending.clear();
    });
    send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
      if (socket.readyState !== WebSocket.OPEN) return reject(new Error('Test browser connection is not open.'));
      const id = ++nextId;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 30000);
      pending.set(id, { resolve, reject, timer });
      socket.send(JSON.stringify({ id, method, params, sessionId }));
    });
    const version = await send('Browser.getVersion');
    console.log(`Browser: ${version.product}. Fonts/dictionaries require network access; CHROME_BIN selects another installed Chromium browser.`);
    // Probe in disposable pages: a renderer can cache a missing dictionary.
    await until(async () => {
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      try {
        const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
        const probe = () => ['de', 'en'].every((lang) => {
          const element = document.createElement('div');
          element.lang = lang;
          element.textContent = lang === 'de' ? 'Arbeitsabschnitte' : 'calculations';
          element.style.cssText = 'width:100px;font:20px/24px monospace;word-break:normal;overflow-wrap:normal;hyphens:auto';
          document.body.append(element);
          const range = document.createRange();
          range.selectNodeContents(element);
          const rects = [...range.getClientRects()];
          const ready = rects.length > 1 && rects.every((rect) => rect.right <= element.getBoundingClientRect().right + 1);
          element.remove();
          return ready;
        });
        const result = await send('Runtime.evaluate', { expression: `(${probe.toString()})()`, returnByValue: true }, sessionId);
        if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
        if (result.result.value) return true;
      } finally {
        await send('Target.closeTarget', { targetId });
      }
      await delay(1000, undefined, { signal: abort.signal });
      return false;
    }, 'en/de automatic hyphenation support (browser dictionaries must be available)', 120000);
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const page = (method, params) => send(method, params, sessionId);
    await page('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    const evaluate = async (fn, args) => {
      abort.signal.throwIfAborted();
      const result = await page('Runtime.evaluate', { expression: `(${fn.toString()})(${JSON.stringify(args) ?? ''})`, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
      return result.result.value;
    };
    let currentRoute, currentWidth;
    const adapter = {
      async navigate(route) {
        currentRoute = route;
        const result = await page('Page.navigate', { url: new URL(route, origin).href });
        assert.ok(!result.errorText, result.errorText);
        await until(async () => {
          try { return await evaluate((path) => location.pathname === path && document.readyState === 'complete', route); }
          catch (error) {
            if (/execution context|Cannot find context/i.test(error.message)) return false;
            throw error;
          }
        }, route);
      },
      async resize(width) {
        currentWidth = width;
        await page('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width <= 412 });
        await evaluate(async () => { await document.fonts.ready; await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))); });
      },
      async evaluate(fn, args) {
        const result = await evaluate(fn, args);
        assert.equal(result.route, currentRoute, 'Wrong page measured.');
        assert.equal(result.width, currentWidth, `${currentRoute}: wrong viewport measured; ${result.errors.join('; ')}`);
        assert.equal(result.lang, currentRoute.startsWith('/de/') ? 'de' : 'en', 'Wrong document language.');
        assert.ok(result.headings > 0, 'No headings measured.');
        assert.deepEqual(result.errors, [], `${currentRoute} at ${currentWidth}px`);
        return result;
      },
    };
    const focused = await verifyTextWrapping(adapter);
    assert.equal(focused.length, 22, 'Focused cases were skipped.');
    console.log(`Focused: ${focused.length}/22 passed.`);
    const widths = [320, 360, 375, 393, 412, 768, 1440];
    let combinations = 0, headings = 0, rawUrls = 0, ordinaryLinks = 0;
    for (const route of routes) {
      await adapter.navigate(route);
      for (const width of widths) {
        await adapter.resize(width);
        const result = await adapter.evaluate(inspectTextWrapping);
        combinations += 1;
        headings += result.headings;
        rawUrls += result.rawUrls;
        ordinaryLinks += result.ordinaryLinks;
      }
    }
    assert.equal(combinations, 399, 'Full sweep was incomplete.');
    assert.ok(rawUrls > 0 && ordinaryLinks > 0, 'Both link policies must be exercised.');
    console.log(`Sweep: ${routes.length} pages × ${widths.length} widths = ${combinations}/399 passed (en, de).`);
    console.log(`Measured ${headings} headings, ${rawUrls} raw URLs and ${ordinaryLinks} ordinary links. No wrapping or containment errors.`);
    let searchCases = 0;
    for (const route of ['/tools/', '/de/werkzeuge/']) {
      await adapter.navigate(route);
      for (const width of [320, 768, 1440]) {
        await adapter.resize(width);
        await evaluate(() => {
          const toggle = document.querySelector('#menu-toggle');
          if (getComputedStyle(toggle).display !== 'none') {
            toggle.click();
            const links = document.querySelector('#primary-links');
            if (toggle.getAttribute('aria-expanded') !== 'true' || links.getBoundingClientRect().right > innerWidth) throw new Error('Mobile navigation failed.');
            toggle.click();
          }
          document.querySelector('#search-open').click();
          const input = document.querySelector('#search-input');
          input.value = document.documentElement.lang === 'de' ? 'Lärm' : 'noise';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await until(() => evaluate(() => document.querySelector('#search-overlay').open && document.querySelectorAll('.hit-desc').length > 0), 'visible search results');
        await adapter.evaluate(inspectTextWrapping);
        await evaluate(() => document.querySelector('#search-close').click());
        await until(() => evaluate(() => document.querySelector('#search-overlay').hidden), 'search close');
        searchCases += 1;
      }
    }
    console.log(`Navigation/search: ${searchCases}/6 states passed, including visible result ellipsis.`);
  } finally {
    // Only this invocation's isolated browser, preview and profile are owned here.
    try {
      if (send && socket.readyState === WebSocket.OPEN) await send('Browser.close').catch(() => {});
      socket?.close();
      if (child?.pid && child.exitCode === null && child.signalCode === null) {
        const stopped = once(child, 'exit');
        if (await Promise.race([stopped.then(() => true), delay(3000).then(() => false)]) === false) {
          if (process.platform === 'win32') await promisify(execFile)('taskkill', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true });
          else child.kill('SIGKILL');
          await stopped;
        }
      }
    } finally {
      await server?.stop();
      process.removeListener('SIGINT', interrupt);
      process.removeListener('SIGTERM', interrupt);
      assert.equal(dirname(await realpath(profile)), temporaryRoot, 'Refusing to remove a profile outside the owned temporary directory.');
      assert.ok(basename(profile).startsWith('dbcheck-text-wrapping-'));
      await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    }
    console.log('Cleanup: test browser, preview and temporary profile stopped/removed.');
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await run().catch((error) => {
    console.error(`Text wrapping checks failed: ${error.message}`);
    process.exitCode = 1;
  });
}
