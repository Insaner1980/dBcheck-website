import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';
import rehypeRawUrls from '../src/lib/rehype-raw-urls.mjs';
import { scalePercent } from '../src/lib/display-scale.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
const base = readFileSync(join(root, 'src', 'layouts', 'Base.astro'), 'utf8');
const calculatorPage = readFileSync(join(root, 'src', 'components', 'CalculatorPage.astro'), 'utf8');
const soundExplorer = readFileSync(join(root, 'src', 'components', 'SoundExplorer.astro'), 'utf8');
const soundIndexPage = readFileSync(join(root, 'src', 'components', 'SoundIndexPage.astro'), 'utf8');
const editorialPage = readFileSync(join(root, 'src', 'components', 'EditorialPage.astro'), 'utf8');
const exposureCalculator = readFileSync(join(root, 'src', 'components', 'ExposureCalculator.astro'), 'utf8');
const exposureRail = readFileSync(join(root, 'src', 'components', 'ExposureRail.astro'), 'utf8');
const homepage = readFileSync(join(root, 'src', 'pages', 'index.astro'), 'utf8');
const motion = readFileSync(join(root, 'src', 'scripts', 'motion.ts'), 'utf8');
const uiSource = readFileSync(join(root, 'src', 'i18n', 'ui.ts'), 'utf8');
const localizedPrice = readFileSync(join(root, 'src', 'scripts', 'localized-price.ts'), 'utf8');
const property = (name) => base.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1];
const luminance = (hex) => {
  const channels = hex.slice(1).match(/../g).map((part) => Number.parseInt(part, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};
const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

test('source design tokens calculate to normal-text contrast on their dark surfaces', () => {
  const muted = property('--muted-text');
  assert.ok(muted, 'missing --muted-text');
  for (const surface of ['--bg', '--surface', '--surface-c', '--surface-ch']) {
    const background = property(surface);
    assert.ok(background, `missing ${surface}`);
    assert.ok(contrast(muted, background) >= 4.5, `${muted} on ${background}`);
  }
  assert.match(homepage, /\.instrument-note\s*\{[^}]*color:\s*var\(--muted-text\);\s*background:\s*var\(--bg\)/);
});

test('source CSS retains a visible focus treatment for the search input', () => {
  const inputRule = base.match(/#search-input\s*\{([^}]*)\}/)?.[1] ?? '';
  assert.doesNotMatch(inputRule, /outline:\s*none/);
  assert.match(base, /:where\(a, button, input, summary\):focus-visible\s*\{[^}]*outline:\s*2px solid var\(--on-surface\)/);
});

test('source CSS gives the focusable Pro tabpanel a visible in-bounds focus treatment', () => {
  assert.match(homepage, /\.pro-feature-panel:focus-visible \{\s*outline: 2px solid var\(--on-surface\);\s*outline-offset: -2px;/);
});

test('source CSS offsets homepage fragment sections from the sticky header', () => {
  assert.match(homepage, /section\[id\]\s*\{\s*scroll-margin-top:\s*84px/);
  assert.doesNotMatch(homepage, /\.sounds-preview\s*\{\s*scroll-margin-top/);
});

test('source contract assigns card heading view-transition names only after navigation checks', () => {
  const transition = base.match(/\/\/ ---- Shared heading transition ----[\s\S]*?\/\/ ---- Search overlay ----/)?.[0] ?? '';

  assert.match(transition, /pendingHeadingTransition = null;\s*if \(!\(event instanceof MouseEvent\) \|\| event\.defaultPrevented/);
  assert.match(transition, /link\.hasAttribute\('download'\)[\s\S]*link\.target !== '_self'/);
  assert.doesNotMatch(transition.match(/document\.addEventListener\('click'[\s\S]*?\n    \}\);/)?.[0] ?? '', /view-transition-name/);
  assert.match(transition, /window\.addEventListener\('pageswap'/);
  assert.match(transition, /pageSwap\.activation\?\.entry\?\.url !== pending\.destination \|\| !pageSwap\.viewTransition/);
  assert.match(transition, /pageSwap\.viewTransition\.finished\.then\(clearNames, clearNames\)/);
  assert.match(transition, /removeProperty\('view-transition-name'\)/);
});

test('source CSS keeps the live recording status without pulsing under reduced motion', () => {
  assert.match(homepage, /\.rec-dot\.live\s*\{\s*background:\s*var\(--error\);\s*animation:\s*pulse/);
  assert.match(homepage, /@media \(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\.rec-dot\.live\s*\{\s*animation:\s*none;\s*\}/);
});

test('source contract handles runtime reduced-motion changes by finishing optional motion', () => {
  assert.match(base, /const prefersReduced = \(\) => matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/);
  assert.match(base, /if \(prefersReduced\(\) \|\| !panel\) \{\s*finish\(\)/);
  assert.match(base, /addEventListener\('animationcancel', onAnimationFinish/);
  assert.match(base, /fallbackTimer = setTimeout\(finish, 240\)/);
  assert.match(homepage, /const reducedMotionQuery = matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(homepage, /reducedMotionQuery\.addEventListener\('change', \(\{ matches \}\) => \{[\s\S]*if \(!matches\) return;[\s\S]*if \(booting\) setListening\(false\);[\s\S]*ctaObserver\?\.disconnect\(\);[\s\S]*ctaTimeline\?\.complete\(\);[\s\S]*settleCta\(\)/);
  assert.match(homepage, /if \(reducedMotionQuery\.matches\) \{\s*settleCta\(\);\s*return;/);
  assert.match(exposureRail, /reducedMotionQuery\.addEventListener\('change', \(\{ matches \}\) => matches \? stop\(\) : start\(\)\)/);
  assert.match(motion, /reducedMotionQuery\.addEventListener\('change',[\s\S]*for \(const \[element, active\] of activeScrambles\) finishScramble\(element, active\)/);
});

test('source CSS removes disclosure and Pro detail transitions under reduced motion', () => {
  assert.match(homepage, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.why-card summary::before \{ transition: none; \}/);
  assert.match(homepage, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.pro-feature-panel\.is-active \.pro-feature-detail\.is-changing \{ animation: none; \}/);
  assert.match(soundExplorer, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.mobile-disclosure \{ transition: none; \}/);
});

test('editorial inline code wraps long tokens without becoming a nested scroller', () => {
  const inlineCodeRule = editorialPage.match(/\.prose :global\(:not\(pre\) > code\) \{[^}]+\}/)?.[0] ?? '';

  assert.match(inlineCodeRule, /overflow-wrap:\s*anywhere/);
  assert.match(inlineCodeRule, /word-break:\s*normal/);
  assert.match(inlineCodeRule, /hyphens:\s*none/);
  assert.doesNotMatch(inlineCodeRule, /overflow-x:\s*auto|white-space:\s*nowrap/);
});

test('ExposureRail source uses direct scroll sync and tears down runtime motion', () => {
  assert.match(exposureRail, /sync:\s*1,/);
  assert.match(exposureRail, /onUpdate:\s*\(observer\)\s*=>\s*observer\.container\.dataTimer\.pause\(\)/);
  assert.match(exposureRail, /const stop = \(\) => \{\s*railAnimation\?\.revert\(\);[\s\S]*railObserver\?\.revert\(\);[\s\S]*reading\.db = 0;\s*render\(\);/);
  assert.match(exposureRail, /const start = \(\) => \{\s*if \(reducedMotionQuery\.matches \|\| railObserver\) return;/);
});

test('source contract keeps the final scramble value in the accessibility tree', () => {
  const reading = motion.match(/export function scrambleReading[\s\S]*?\n\}/)?.[0] ?? '';

  assert.match(motion, /ghost = element\.cloneNode\(false\)[\s\S]*ghost\.removeAttribute\('id'\)[\s\S]*ghost\.setAttribute\('aria-hidden', 'true'\)/);
  assert.match(reading, /element\.textContent = text/);
  assert.match(reading, /const previousOpacity = element\.style\.opacity;\s*readingOpacity\.set\(element, previousOpacity\);\s*element\.style\.opacity = '0'/);
  assert.match(reading, /ghost\.hidden = true;\s*element\.style\.opacity = readingOpacity\.get\(element\) \?\? previousOpacity/);
  assert.doesNotMatch(reading, /visibility\s*=/);
});

test('source contract version-guards scramble animation and reading restoration', () => {
  const reading = motion.match(/export function scrambleReading[\s\S]*?\n\}/)?.[0] ?? '';
  const runner = motion.match(/function scramble\([\s\S]*?\n\}/)?.[0] ?? '';

  assert.match(motion, /const requested = new WeakMap<HTMLElement, symbol>\(\)/);
  assert.match(motion, /export function cancelScramble[\s\S]*requested\.set\(element, Symbol\(\)\)[\s\S]*loadedEngine\?\.stopScramble\(element\)/);
  assert.match(runner, /const request = Symbol\(\)[\s\S]*requested\.get\(element\) !== request/);
  assert.equal((runner.match(/requested\.get\(element\) !== request/g) ?? []).length, 2, 'success and failure paths both need a version guard');
  assert.match(motion, /function resetReading[\s\S]*const version = \(readingVersions\.get\(element\) \?\? 0\) \+ 1[\s\S]*cancelScramble\(activeGhost\)[\s\S]*element\.style\.opacity = activeOpacity/);
  assert.match(motion, /export function setReadingValue[\s\S]*resetReading\(element\);\s*element\.textContent = text/);
  assert.match(reading, /if \(readingVersions\.get\(element\) !== version\) return/);
  assert.match(homepage, /function setListening\(on: boolean\) \{\s*cancelScramble\(dbValue\);\s*cancelScramble\(pill\)/);
});

test('source contract claims Listen playback only after play resolves', () => {
  const start = homepage.indexOf("listenBtn.addEventListener('click'");
  const end = homepage.indexOf('// ================= CTA:', start);
  const handler = homepage.slice(start, end);
  const fallback = handler.slice(handler.indexOf('} catch {'));

  assert.ok(start >= 0 && end > start, 'missing Listen click handler');
  assert.doesNotMatch(handler, /await video\.play\(\)\.catch/);
  assert.match(handler, /await video\.play\(\);[\s\S]*?setListening\(true\);/);
  assert.match(fallback, /setListening\(false\);\s*if \(!unmute\) return;[\s\S]*?try \{\s*await video\.play\(\);\s*if \(revision !== controlRevision\) \{\s*teardownIfLifecycleStale\(clickLifecycleRevision\);\s*return;\s*\}\s*syncListenControl\(\);/);
  assert.match(fallback, /catch \{\s*if \(revision !== controlRevision\) return;\s*if \(video\.error\) disableUnavailableMedia\(\);\s*else \{\s*setListening\(false\);\s*suspendAudioContext\(\);\s*\}\s*\}/);
});

test('source contract derives the Listen pressed state from media audibility checks', () => {
  const sync = homepage.match(/function mediaIsAudible\(\)[\s\S]*?function disableUnavailableMedia/)?.[0] ?? '';
  const listeningState = homepage.match(/function setListening\(on: boolean\)[\s\S]*?listenBtn\.addEventListener/)?.[0] ?? '';
  const clickHandler = homepage.match(/listenBtn\.addEventListener\('click'[\s\S]*?\/\/ ================= CTA:/)?.[0] ?? '';

  assert.match(homepage, /id="listen-btn" aria-pressed="false"/);
  assert.match(sync, /if \(video\.error\) \{\s*listenBtn\.setAttribute\('aria-pressed', 'false'\);\s*return;/);
  assert.match(sync, /const audioGraphRunning = !audioRoutedThroughContext \|\| audioCtx\?\.state === 'running';\s*return audioGraphRunning && !video\.paused && !video\.muted && video\.volume > 0 && !video\.ended;/);
  assert.match(sync, /const audible = mediaIsAudible\(\);/);
  assert.match(sync, /if \(!audible && listening\) \{\s*setListening\(false\);\s*suspendAudioContext\(\);\s*return;/);
  assert.match(sync, /listenBtn\.setAttribute\('aria-pressed', String\(audible\)\);/);
  assert.match(homepage, /\['pause', 'ended', 'volumechange', 'playing'\][\s\S]*video\.addEventListener\(event, syncListenControl\)/);
  assert.match(homepage, /document\.addEventListener\('visibilitychange', syncListenControl\)/);
  assert.match(listeningState, /video\.muted = !on;[\s\S]*statusEl\.textContent = on \? 'Measuring' : 'Standby';[\s\S]*?syncListenControl\(\);/);
  assert.match(clickHandler, /const muteRequested = listenBtn\.getAttribute\('aria-pressed'\) === 'true';[\s\S]*ensureVideoSource\(\);\s*if \(muteRequested\) \{\s*setListening\(false\);\s*suspendAudioContext\(\);\s*return;/);
});

test('source contract preserves active hero media state across the 700px source change', () => {
  const sourceChange = homepage.match(/function ensureVideoSource\(\)[\s\S]*?function mediaIsAudible/)?.[0] ?? '';

  assert.match(homepage, /const mobileVideoQuery = matchMedia\('\(max-width: 700px\)'\);/);
  assert.match(sourceChange, /const source = mobileVideoQuery\.matches \? video\.dataset\.mobileSrc : video\.dataset\.desktopSrc;/);
  assert.match(sourceChange, /const previousTime = video\.currentTime;\s*const wasMuted = video\.muted;\s*const shouldResume = !video\.paused/);
  assert.match(sourceChange, /video\.addEventListener\('loadedmetadata',[\s\S]*video\.currentTime = Math\.min\(previousTime,[\s\S]*video\.muted = wasMuted;[\s\S]*await video\.play\(\)/);
  assert.match(sourceChange, /const controlStateRevision = controlRevision;[\s\S]*controlStateRevision !== controlRevision/);
  assert.match(sourceChange, /const lifecycleStateRevision = lifecycleRevision;[\s\S]*teardownIfLifecycleStale\(lifecycleStateRevision\)/);
  assert.match(homepage, /if \(videoSourceChanging\) return;/);
  assert.match(homepage, /mobileVideoQuery\.addEventListener\('change', \(\) => \{\s*if \(video\.hasAttribute\('src'\)\) ensureVideoSource\(\);/);
});

test('source contract gates measured playback claims on AudioContext state', () => {
  const contextState = homepage.match(/function syncAudioContextState\(\)[\s\S]*?function setupAudio/)?.[0] ?? '';
  const setup = homepage.match(/function setupAudio\(\)[\s\S]*?\/\*\*/)?.[0] ?? '';
  const clickHandler = homepage.match(/listenBtn\.addEventListener\('click'[\s\S]*?\/\/ ================= CTA:/)?.[0] ?? '';

  assert.match(contextState, /if \(!audioCtx \|\| !audioRoutedThroughContext\) return;/);
  assert.match(contextState, /audioCtx\.state === 'closed'[\s\S]*disableUnavailableMedia\(\);/);
  assert.match(contextState, /audioCtx\.state !== 'running'[\s\S]*setListening\(false\);/);
  assert.match(setup, /audioRoutedThroughContext = true;\s*nextAudioCtx\.addEventListener\('statechange', syncAudioContextState\);/);
  assert.match(clickHandler, /audioCtx\.state === 'closed'[\s\S]*disableUnavailableMedia\(\);\s*return;/);
  assert.match(clickHandler, /audioCtx\.state !== 'running'\) await audioCtx\.resume\(\);/);
  assert.match(clickHandler, /audioCtx\.state !== 'running'\) \{\s*setListening\(false\);\s*return;/);
  assert.match(clickHandler, /if \(audioRoutedThroughContext && audioCtx\?\.state !== 'running'\) \{\s*setListening\(false\);\s*return;/);
});

test('source contract keeps one hero audio output route and handles analyser failures', () => {
  const setup = homepage.match(/function setupAudio\(\)[\s\S]*?\/\*\*/)?.[0] ?? '';
  const frame = homepage.match(/function frame\(\)[\s\S]*?function startFrames/)?.[0] ?? '';
  const clickHandler = homepage.match(/listenBtn\.addEventListener\('click'[\s\S]*?\/\/ ================= CTA:/)?.[0] ?? '';

  assert.match(homepage, /let audioSetupAttempted = false;\s*let audioRoutedThroughContext = false;/);
  assert.match(setup, /source = nextAudioCtx\.createMediaElementSource\(video\);[\s\S]*?void nextAudioCtx\.close\(\)\.catch\(\(\) => \{\}\);[\s\S]*?audioCtx = null;[\s\S]*?throw error;/);
  assert.equal((setup.match(/source\.connect\(nextAudioCtx\.destination\)/g) ?? []).length, 1);
  assert.match(setup, /source\.connect\(nextAudioCtx\.destination\);\s*\} catch \{\s*void nextAudioCtx\.close\(\)\.catch\(\(\) => \{\}\);\s*disableUnavailableMedia\(\);\s*return false;/);
  assert.match(setup, /source\.connect\(nextAnalyser\);\s*analyser = nextAnalyser;\s*\} catch \{\s*analyser = null;/);
  assert.doesNotMatch(setup, /nextAnalyser\.connect\(/);
  assert.match(clickHandler, /if \(!audioSetupAttempted\) \{\s*audioSetupAttempted = true;\s*if \(!setupAudio\(\)\) return;\s*\}/);
  assert.match(clickHandler, /if \(audioCtx\) \{[\s\S]*?audioCtx\.state !== 'running'[\s\S]*?await audioCtx\.resume\(\)/);
  assert.match(clickHandler, /await video\.play\(\);\s*if \(revision !== controlRevision\) \{\s*teardownIfLifecycleStale\(clickLifecycleRevision\);\s*return;\s*\}\s*if \(!analyser\) \{\s*setListening\(false\);\s*video\.muted = false;\s*syncListenControl\(\);\s*return;/);
  assert.match(frame, /try \{[\s\S]*?readAudio\(\);[\s\S]*?drawSpectrum\(\);\s*\} catch \{\s*const keepAudio = mediaIsAudible\(\);\s*frameId = 0;\s*analyser = null;\s*minDb = Infinity; maxDb = -Infinity; energySum = 0; sampleCount = 0;\s*statMin\.textContent = statAvg\.textContent = statMax\.textContent = '–';\s*setListening\(false\);\s*video\.muted = !keepAudio;[\s\S]*?meter\.db\(0, 0\);[\s\S]*?drawSpectrum\(\);\s*syncListenControl\(\);\s*return;/);
});

test('source contract filters non-finite analyser samples from the hero RMS calculation', () => {
  const readAudio = homepage.match(/function readAudio\(\)[\s\S]*?function meterAtRest/)?.[0] ?? '';

  assert.match(readAudio, /let sq = 0, finiteSamples = 0;/);
  assert.match(readAudio, /const sample = timeData\[i\];\s*if \(!Number\.isFinite\(sample\)\) continue;\s*sq \+= sample \* sample;\s*finiteSamples\+\+;/);
  assert.match(readAudio, /const rms = finiteSamples > 0 \? Math\.sqrt\(sq \/ finiteSamples\) : 0;/);
  assert.match(readAudio, /Math\.log10\(Math\.max\(rms, 1e-7\)\)/);
  assert.match(readAudio, /Math\.min\(DISPLAY_MAX_DB, Math\.max\(0, dbfs \+ 90\)\)/);
});

test('source contract derives hero meter values and level classes from the shared scale', () => {
  const renderMeter = homepage.match(/function renderMeter\(\)[\s\S]*?function syncAudioContextState/)?.[0] ?? '';

  assert.match(homepage, /import \{ DISPLAY_MAX_DB, levelForDb, scalePercent \} from '\.\.\/lib\/display-scale';/);
  assert.match(renderMeter, /const position = scalePercent\(db\);/);
  assert.match(renderMeter, /const displayDb = Math\.floor\(\(position \/ 100\) \* DISPLAY_MAX_DB\);/);
  assert.match(renderMeter, /setProperty\('--sweep', String\(\(position \/ 100\) \* ARC_SWEEP\)\)/);
  assert.match(renderMeter, /dbValue\.textContent = String\(displayDb\);/);
  assert.match(renderMeter, /const level = levelForDb\(displayDb\);/);
});

test('source markup guards an empty Sound Explorer list with a localized status', () => {
  assert.match(soundExplorer, /const initialBand = initial \? bandFor\(initial\) : \{ start: 0, span: 0 \};/);
  assert.match(soundExplorer, /\{initial \? \([\s\S]*\) : \(/);
  assert.match(soundExplorer, /No sound examples are currently available\./);
  assert.match(soundExplorer, /Derzeit sind keine Geräuschbeispiele verfügbar\./);
  assert.match(soundExplorer, /<p class="sound-disclaimer" role="status">/);
});

test('scale execution and source CSS keep Sound Explorer boundary ranges inside the shared geometry', () => {
  for (const [minimum, maximum] of [[0, 0], [130, 130], [0, 130], [129.5, 130]]) {
    const start = scalePercent(minimum);
    const end = scalePercent(maximum);
    const span = end - start;
    const midpoint = scalePercent((minimum + maximum) / 2);
    assert.ok(start >= 0 && span >= 0 && start + span <= 100, `${minimum}–${maximum}`);
    assert.ok(midpoint >= start && midpoint <= end, `${minimum}–${maximum} midpoint`);
  }
  assert.match(soundExplorer, /width: calc\(var\(--band-span\) \* 1%\);/);
  assert.doesNotMatch(soundExplorer, /width: max\(6px, calc\(var\(--band-span\)/);
  assert.match(soundExplorer, /'is-point': sound\.typicalMinDb === sound\.typicalMaxDb/);
  assert.match(soundExplorer, /\.mobile-range-fill\.is-point \{\s*left: clamp\(0px, calc\(var\(--range-start\) - 2\.5px\), calc\(100% - 5px\)\); width: 5px;/);
  assert.doesNotMatch(soundExplorer, /\.mobile-range-fill \{[\s\S]*?min-width: 5px/);
});

test('source contract cancels stale Sound Explorer marker feedback on selection paths', () => {
  const select = soundExplorer.match(/const select = \(marker: HTMLButtonElement[\s\S]*?markers\.forEach\(\(marker\) =>/)?.[0] ?? '';
  assert.match(soundExplorer, /let selectionRevision = 0;/);
  assert.match(select, /const revision = \+\+selectionRevision;/);
  assert.match(select, /item\.classList\.remove\('is-pulsing'\);[\s\S]*scale\?\.classList\.remove\('is-scanning'\);/);
  assert.match(select, /requestAnimationFrame\(\(\) => \{\s*if \(revision !== selectionRevision\) return;/);
});

test('source contract announces committed Sound Explorer selections but not hover previews', () => {
  const select = soundExplorer.match(/const select = \(marker: HTMLButtonElement[\s\S]*?markers\.forEach\(\(marker\) =>/)?.[0] ?? '';
  assert.doesNotMatch(soundExplorer, /<article class="sound-detail"[^>]*aria-live/);
  assert.match(soundExplorer, /data-sound-announcement aria-live="polite" aria-atomic="true"/);
  assert.match(select, /if \(animate && announcement\) \{[\s\S]*const message = `\$\{marker\.dataset\.name \?\? ''\}: \$\{marker\.dataset\.range \?\? ''\}`;[\s\S]*if \(announcement\.textContent !== message\) announcement\.textContent = message;/);
});

test('source CSS exposes only the active responsive Sound Explorer content', () => {
  assert.match(soundExplorer, /\.sound-explorer:not\(\.compact\) \.sound-announcement \{ display: none; \}/);
  assert.match(soundExplorer, /\.mobile-sound-detail \{ display: none;/);
  assert.match(soundExplorer, /\.mobile-sound-list details\[open\] > \.mobile-sound-detail \{\s*display: grid;/);
});

test('source contract maps Sound Explorer focus targets across its 700px swap', () => {
  assert.match(soundExplorer, /data-sound-index=\{index\}/);
  assert.match(soundExplorer, /<details name=\{`\$\{id\}-mobile-sounds`\} data-sound-index=\{index\}>/);
  assert.match(soundIndexPage, /<a class="sound-row" data-sound-index=\{index\}/);
  assert.match(soundExplorer, /const focusContext = \(target: EventTarget \| null\)[\s\S]*target\.closest<HTMLElement>\('\[data-sound-index\]'\)/);
  assert.match(soundExplorer, /mobileQuery\.addEventListener\('change',[\s\S]*summaries\[context\.index\][\s\S]*desktopArticle \?\? markers\[context\.index\][\s\S]*revision === responsiveFocusRevision/);
  assert.match(soundExplorer, /if \(!indexed \|\| \(!explorer\.contains\(indexed\) && !libraryLinks\.includes\(indexed as HTMLAnchorElement\)\)\) return null;/);
});

test('source CSS allows mobile navigation scrolling and sound-name wrapping', () => {
  assert.match(base, /\.nav-links \{[\s\S]*max-height: calc\(100dvh - 68px\); overflow-y: auto;/);
  const mobileNameRule = soundExplorer.match(/\.mobile-sound-name \{([^}]*)\}/)?.[1] ?? '';
  assert.match(mobileNameRule, /overflow-wrap: break-word/);
  assert.doesNotMatch(mobileNameRule, /text-overflow: ellipsis|white-space: nowrap|overflow: hidden/);
});

test('source component contract requires a Sound Explorer instance identity', () => {
  assert.match(soundExplorer, /interface Props \{[\s\S]*sounds: CommonSound\[\];\s*id: string;/);
  assert.doesNotMatch(soundExplorer, /id\?: string|id = 'sound-explorer'/);
  assert.match(homepage, /<SoundExplorer sounds=\{commonSounds\} id="home-sound-explorer" compact \/>/);
  assert.match(soundIndexPage, /<SoundExplorer sounds=\{sounds\} id=\{soundExplorerId\}/);
});

test('source contract clears measured-session values before sampling', () => {
  const listeningState = homepage.match(/function setListening\(on: boolean\)[\s\S]*?listenBtn\.addEventListener/)?.[0] ?? '';
  const clickHandler = homepage.match(/listenBtn\.addEventListener\('click'[\s\S]*?\/\/ ================= CTA:/)?.[0] ?? '';

  assert.match(listeningState, /if \(on\) \{\s*renderMeter\(\);\s*startFrames\(\);/);
  assert.match(listeningState, /dbValue\.textContent = '--';\s*pill\.textContent = 'STANDBY';/);
  assert.doesNotMatch(listeningState, /scrambleValue\(dbValue, '--'\)|scrambleValue\(pill, 'STANDBY'/);
  assert.match(clickHandler, /minDb = Infinity; maxDb = -Infinity; energySum = 0; sampleCount = 0;\s*statMin\.textContent = statAvg\.textContent = statMax\.textContent = '–';\s*meter\.db\(0, 0\);\s*drawSpectrum\(\);\s*setListening\(true\);/);
});

test('source contract labels retained standby values as previous demo session statistics', () => {
  const listeningState = homepage.match(/function setListening\(on: boolean\)[\s\S]*?listenBtn\.addEventListener/)?.[0] ?? '';
  const frame = homepage.match(/function frame\(\)[\s\S]*?function startFrames/)?.[0] ?? '';

  assert.match(homepage, /id="session-stats" role="group" aria-label="Demo session statistics"/);
  for (const stat of ['min', 'avg', 'max']) assert.match(homepage, new RegExp(`id="stat-${stat}-label">${stat}<`));
  assert.match(listeningState, /const previousSession = !on && sampleCount > 0;/);
  assert.match(listeningState, /on \? 'Current demo session statistics' : previousSession \? 'Previous demo session statistics' : 'Demo session statistics'/);
  for (const stat of ['Min', 'Avg', 'Max']) assert.match(listeningState, new RegExp(`stat${stat}Label\\.textContent = previousSession \\? 'last ${stat.toLowerCase()}' : '${stat.toLowerCase()}'`));
  assert.ok(frame.indexOf('sampleCount = 0') < frame.indexOf('setListening(false)'), 'analyser failure must clear history before rendering standby');
});

test('source contract bounds spectrum bins by Nyquist without a duplicate fallback bin', () => {
  const spectrum = homepage.match(/function drawSpectrum\(\)[\s\S]*?function readAudio/)?.[0] ?? '';

  assert.match(spectrum, /const binHz = live \? nyquist \/ freqData\.length : 0;/);
  assert.match(spectrum, /if \(f0 < nyquist\) \{/);
  assert.match(spectrum, /const b0 = Math\.min\(freqData\.length, Math\.ceil\(f0 \/ binHz\)\);/);
  assert.match(spectrum, /const b1 = Math\.min\(freqData\.length, Math\.ceil\(Math\.min\(f1, nyquist\) \/ binHz\)\);/);
  assert.match(spectrum, /if \(b1 > b0\) \{[\s\S]*for \(let b = b0; b < b1; b\+\+\) sum \+= freqData\[b\];/);
  assert.doesNotMatch(spectrum, /Math\.max\(b0 \+ 1|Math\.round\(\(f[01] \/ nyquist\)/);
});

test('source contract version-guards asynchronous Listen state changes', () => {
  const clickHandler = homepage.match(/listenBtn\.addEventListener\('click'[\s\S]*?\/\/ ================= CTA:/)?.[0] ?? '';

  assert.match(homepage, /let controlRevision = 0;/);
  assert.match(homepage, /let lifecycleRevision = 0;\s*let lifecycleExitControlRevision = -1;/);
  assert.match(clickHandler, /const revision = \+\+controlRevision;/);
  assert.match(clickHandler, /const clickLifecycleRevision = lifecycleRevision;/);
  assert.match(clickHandler, /await audioCtx\.resume\(\);\s*if \(revision !== controlRevision\) \{\s*teardownIfLifecycleStale\(clickLifecycleRevision\);\s*return;/);
  assert.match(clickHandler, /await video\.play\(\);\s*if \(revision !== controlRevision\) \{\s*teardownIfLifecycleStale\(clickLifecycleRevision\);\s*return;\s*\}\s*if \(!analyser\)/);
  assert.match(clickHandler, /\} catch \{\s*if \(revision !== controlRevision\) return;/);
  assert.match(clickHandler, /try \{\s*await video\.play\(\);\s*if \(revision !== controlRevision\) \{\s*teardownIfLifecycleStale\(clickLifecycleRevision\);\s*return;\s*\}\s*syncListenControl\(\);\s*\} catch \{\s*if \(revision !== controlRevision\) return;/);
  assert.match(homepage, /function teardownIfLifecycleStale\(startRevision: number\)[\s\S]*controlRevision === lifecycleExitControlRevision[\s\S]*teardownMedia\(\)/);
});

test('source contract disables and explains Listen on permanent hero media errors', () => {
  const failureSetup = homepage.match(/function disableUnavailableMedia\(\)[\s\S]*?if \(!reducedMotionQuery\.matches && !saveData\)/)?.[0] ?? '';
  const clickStart = homepage.indexOf("listenBtn.addEventListener('click'");
  const clickEnd = homepage.indexOf('// ================= CTA:', clickStart);
  const clickHandler = homepage.slice(clickStart, clickEnd);

  assert.match(failureSetup, /setListening\(false\);\s*suspendAudioContext\(\);\s*listenText\.textContent = 'Film audio unavailable';\s*listenBtn\.disabled = true;/);
  assert.match(failureSetup, /listenBtn\.setAttribute\('aria-pressed', 'false'\)/);
  assert.match(failureSetup, /video\.addEventListener\('error', \(\) => \{\s*if \(video\.error\) \{\s*videoSourceChanging = false;\s*disableUnavailableMedia\(\);/);
  assert.match(homepage, /if \(!reducedMotionQuery\.matches && !saveData\) \{[\s\S]*?const autoplayLifecycleRevision = lifecycleRevision;[\s\S]*?void video\.play\(\)\.then\(\(\) => \{\s*teardownIfLifecycleStale\(autoplayLifecycleRevision\);\s*\}\)\.catch\(\(\) => \{\}\);/);
  assert.match(clickHandler, /catch \{\s*if \(revision !== controlRevision\) return;\s*if \(video\.error\) \{\s*disableUnavailableMedia\(\);\s*return;/);
  assert.match(clickHandler, /catch \{\s*if \(revision !== controlRevision\) return;\s*if \(video\.error\) disableUnavailableMedia\(\);\s*else \{\s*setListening\(false\);\s*suspendAudioContext\(\);/);
  assert.match(failureSetup, /window\.addEventListener\('pagehide', \(event\) => \{\s*if \(event\.persisted\) return;\s*lifecycleRevision \+= 1;\s*controlRevision \+= 1;\s*lifecycleExitControlRevision = controlRevision;\s*teardownMedia\(\);/);
  assert.match(homepage, /function teardownMedia\(\) \{\s*videoSourceChanging = false;\s*video\.pause\(\);\s*setListening\(false\);\s*suspendAudioContext\(\);\s*if \(frameId\) cancelAnimationFrame\(frameId\);\s*frameId = 0;\s*meter\.db\(0, 0\);\s*renderMeter\(\);\s*drawSpectrum\(\);/);
});

test('source contract updates localized prices only after validating both cards', () => {
  const localize = localizedPrice;
  assert.match(localizedPrice, /\['prefix', 'amount', 'suffix'\]\.every\(\(part\) => element\.querySelector\(`\[data-price-\$\{part\}\]`\)\)/);
  assert.match(localize, /const countryCode = parseCloudflareTraceCountry\(await response\.text\(\)\);[\s\S]*if \(!hasPriceTargets\(freePriceElement\) \|\| !hasPriceTargets\(proPriceElement\)\) return;/);
  assert.ok(localize.indexOf('hasPriceTargets(freePriceElement)') < localize.indexOf('renderPrice(freePriceElement,'), 'validate both cards before rendering either one');
});

test('source contract excludes composition, modifiers, and text-entry paths from the search shortcut', () => {
  const shortcut = base.match(/const isSearchTextEntry[\s\S]*?document\.addEventListener\('keydown',[\s\S]*?\n    }\);/)?.[0] ?? '';
  assert.match(shortcut, /HTMLInputElement \|\| target instanceof HTMLTextAreaElement \|\| target instanceof HTMLSelectElement/);
  assert.match(shortcut, /target\.isContentEditable/);
  assert.match(shortcut, /\['textbox', 'searchbox', 'combobox'\]/);
  assert.match(shortcut, /keyCode: number \}\)\.keyCode === 229/);
  assert.match(shortcut, /e\.defaultPrevented \|\| e\.isComposing \|\| isLegacyImeKey\(e\)/);
  assert.match(shortcut, /e\.ctrlKey \|\| e\.metaKey \|\| e\.altKey \|\| e\.getModifierState\('AltGraph'\)/);
  assert.match(shortcut, /e\.composedPath\(\)\.some\(isSearchTextEntry\)/);
  assert.doesNotMatch(shortcut, /shiftKey/);
});

test('source contract handles Escape before native search-input clearing', () => {
  const escapeHandler = base.match(/input\?\.addEventListener\('keydown', \(event\) => \{[\s\S]*?\n    \}\);/)?.[0] ?? '';
  assert.match(escapeHandler, /event\.key !== 'Escape' \|\| event\.isComposing \|\| isLegacyImeKey\(event\) \|\| !overlay\?\.open/);
  assert.match(escapeHandler, /event\.preventDefault\(\);[\s\S]*closeSearch\(\);/);
  assert.doesNotMatch(escapeHandler, /input\.value\s*=|resultsEl\.replaceChildren/);
});

test('source contract restores page state when the search dialog cannot open', () => {
  const openSearch = base.match(/function openSearch\(\) \{[\s\S]*?function closeSearch/)?.[0] ?? '';
  assert.match(openSearch, /typeof overlay\.showModal !== 'function'\) return false/);
  assert.match(openSearch, /const wasHidden = overlay\.hidden/);
  assert.match(openSearch, /const wasClosing = overlay\.classList\.contains\('is-closing'\)/);
  assert.match(openSearch, /const bodyWasSearchOpen = document\.body\.classList\.contains\('search-open'\)/);
  assert.match(openSearch, /catch \{[\s\S]*restoreFailedOpen\(\);[\s\S]*return false;/);
  assert.match(openSearch, /overlay\.hidden = wasHidden/);
  assert.match(openSearch, /document\.body\.classList\.toggle\('search-open', bodyWasSearchOpen\)/);
  assert.match(openSearch, /overlay\.showModal\(\);[\s\S]*?searchTrigger = focusedBeforeOpening/);
  assert.match(base, /if \(openSearch\(\)\) e\.preventDefault\(\);/);
});

test('source contract defines a search focus cycle and visible-trigger restoration', () => {
  const focusHandling = base.match(/overlay\?\.addEventListener\('keydown',[\s\S]*?searchTrigger = null;/)?.[0] ?? '';

  assert.match(focusHandling, /event\.key !== 'Tab'/);
  assert.match(focusHandling, /querySelectorAll<HTMLElement>[\s\S]*button:not\(\[disabled\]\)[\s\S]*input:not\(\[disabled\]\)/);
  assert.match(focusHandling, /event\.shiftKey && document\.activeElement === first[\s\S]*last\.focus\(\)/);
  assert.match(focusHandling, /!event\.shiftKey && document\.activeElement === last[\s\S]*first\.focus\(\)/);
  assert.match(focusHandling, /element\?\.isConnected[\s\S]*element\.matches\('[^']*button:not\(\[disabled\]\)[^']*'\)[\s\S]*element\.getClientRects\(\)\.length > 0/);
  assert.match(focusHandling, /const restoreTarget = isVisibleFocusTarget\(searchTrigger\) \? searchTrigger : defaultTrigger;/);
});

test('source contract defines localized retry handling for search-index failures', () => {
  const searchLoading = base.match(/const showSearchError[\s\S]*?function openSearch/)?.[0] ?? '';
  assert.match(base, /id="search-error"[^>]*>\s*<span>\{copy\.searchError\}\{' '\}<\/span>[\s\S]*id="search-retry"[^>]*>\{copy\.retrySearch\}/);
  assert.match(base, /data-search-announcement[\s\S]*data-error=\{copy\.searchError\}[\s\S]*role="status"[\s\S]*aria-live="polite"/);
  assert.match(searchLoading, /if \(!res\.ok\) throw new Error/);
  assert.match(searchLoading, /const loadedIndex = await res\.json\(\)/);
  assert.match(searchLoading, /catch\(\(error\) => \{[\s\S]*index = null;[\s\S]*return null;/);
  assert.match(searchLoading, /errorEl\?\.setAttribute\('hidden', ''\)/);
  assert.match(base, /getElementById\('search-retry'\)\?\.addEventListener\('click', \(\) => void searchCurrentQuery\(\)\)/);
  assert.match(base, /input\?\.addEventListener\('input', \(\) => void searchCurrentQuery\(\)\)/);
  for (const locale of ['en', 'de']) assert.match(uiSource, new RegExp(`${locale} = \\{[\\s\\S]*?searchError: '[^']+', retrySearch: '[^']+'`));
});

test('source contract defines one debounced localized search-result announcement', () => {
  const announcement = base.match(/let searchAnnouncementTimer[\s\S]*?const isCurrentSearch/)?.[0] ?? '';
  assert.match(announcement, /searchAnnouncement\.textContent = '';/);
  assert.match(announcement, /setTimeout\(\(\) => \{\s*if \(overlay\?\.open\) searchAnnouncement\.textContent = message;/);
  assert.match(announcement, /hits\.length === 0[\s\S]*dataset\.noResults[\s\S]*hits\.length === 1[\s\S]*dataset\.resultOne[\s\S]*hits\.length/);
  assert.doesNotMatch(base, /id="search-results"[^>]*(?:role="status"|aria-live)|id="search-empty"[^>]*(?:role="status"|aria-live)/);
  for (const locale of ['en', 'de']) assert.match(uiSource, new RegExp(`${locale} = \\{[\\s\\S]*?searchResult: '[^']+', searchResults: '[^']+'`));
});

test('source markup gives the exposure slider one polite announcement target', () => {
  assert.match(exposureCalculator, /<output for=\{`\$\{id\}-slider`\} data-db-output aria-live="off">/);
  assert.equal((exposureCalculator.match(/aria-live="polite"/g) ?? []).length, 1);
  assert.match(exposureCalculator, /data-exposure-announcement aria-live="polite" aria-atomic="true"/);
});

test('source contract shares search loading work and version-guards session updates', () => {
  const searchState = base.match(/let indexLoad[\s\S]*?\/\/ ---- Scroll reveal ----/)?.[0] ?? '';
  assert.match(searchState, /if \(indexLoad\) return indexLoad/);
  assert.match(searchState, /\.finally\(\(\) => \{ indexLoad = null; \}\)/);
  assert.match(searchState, /const generation = \+\+searchGeneration/);
  assert.match(searchState, /overlay\?\.open && session === searchSession && generation === searchGeneration/);
  assert.match(searchState, /if \(!isCurrentSearch\(session, generation\)\) return/);
  assert.match(searchState, /const session = \+\+searchSession/);
  assert.match(searchState, /requestAnimationFrame\(\(\) => \{[\s\S]*overlay\.open && session === searchSession/);
  assert.match(searchState, /if \(!overlay\?\.open \|\| overlay\.classList\.contains\('is-closing'\)\) return;[\s\S]*searchSession \+= 1/);
  assert.match(searchState, /overlay\?\.addEventListener\('close', \(\) => \{[\s\S]*if \(overlay\.open\) return/);
});

test('extracted search helper accepts only same-origin HTTP(S) destinations', () => {
  const helper = base.match(/const internalSearchHref = \(value: string\) => \{[\s\S]*?\n    \};/)?.[0] ?? '';
  const internalSearchHref = new Function('window', `${helper.replace(': string', '')}; return internalSearchHref;`)({ location: { origin: 'https://dbcheck.app' } });

  assert.equal(internalSearchHref('/tools/?source=search#calculator'), '/tools/?source=search#calculator');
  assert.equal(internalSearchHref('https://dbcheck.app/articles/'), '/articles/');
  for (const unsafe of ['https://example.com/', 'javascript:alert(1)', 'data:text/html,test', '//dbcheck.app/tools/', 'http://[::1']) {
    assert.equal(internalSearchHref(unsafe), null, unsafe);
  }
  assert.match(base, /map\(\(hit\) => \(\{ hit, href: internalSearchHref\(hit\.url\) \}\)\)\.filter\(\(entry\): entry is \{ hit: SearchEntry; href: string \} => entry\.href !== null\)/);
  assert.match(base, /for \(const \[hitIndex, \{ hit, href \}\] of hits\.entries\(\)\)[\s\S]*a\.href = href/);
});

test('extracted search helper normalizes German sharp s and source applies it to indexed text', () => {
  const helper = base.match(/const normalizeSearchText = \(value: string\) => [^;]+;/)?.[0] ?? '';
  const normalizeSearchText = new Function('document', `${helper.replace(': string', '')}; return normalizeSearchText;`)({ documentElement: { lang: 'de' } });

  assert.equal(normalizeSearchText(' STARKER STRASSENVERKEHR '), 'starker strassenverkehr');
  assert.equal(normalizeSearchText('Starker Straßenverkehr'), 'starker strassenverkehr');
  assert.match(base, /const normalizedQuery = normalizeSearchText\(query\)/);
  assert.match(base, /normalizeSearchText\(d\.title\)\.includes\(normalizedQuery\)/);
  assert.match(base, /normalizeSearchText\(d\.description\)\.includes\(normalizedQuery\)/);
  assert.match(base, /d\.tags\.some\(\(t\) => normalizeSearchText\(t\)\.includes\(normalizedQuery\)\)/);
});

test('source CSS allows shared narrow-layout grid and flex children to shrink', () => {
  assert.match(base, /\.page-head,[\s\S]*\.editorial-head,[\s\S]*\.tool-card,[\s\S]*min-width:\s*0/);
  assert.match(calculatorPage, /:global\(\.tool-calculator > \*\), :global\(\.entry-row\)\s*\{\s*min-width:\s*0/);
});

test('raw URL annotation preserves labels, destinations and existing link attributes', () => {
  const href = 'https://example.com/long-path?first=1&second=2#section';
  const link = (value) => ({ type: 'element', tagName: 'a', properties: { href, className: ['source'] }, children: [{ type: 'text', value }] });
  const raw = link(href);
  const ordinary = link('Read the measurement guidance');
  const tree = { type: 'root', children: [raw, ordinary] };
  const before = structuredClone(tree);
  rehypeRawUrls()(tree);
  assert.equal(raw.properties['data-raw-url'], true);
  delete raw.properties['data-raw-url'];
  assert.deepEqual(tree, before, 'annotation must not rewrite content or mark a human-readable label');
});

test('raw URL annotation recognizes transparent nested formatting only', () => {
  const href = 'https://example.com/very-long-path';
  const formatted = {
    type: 'element',
    tagName: 'a',
    properties: { href, className: ['source'] },
    children: [
      { type: 'text', value: 'https://' },
      { type: 'element', tagName: 'strong', properties: {}, children: [{ type: 'text', value: 'example.com' }] },
      { type: 'text', value: '/very-long-path' },
    ],
  };
  const nonTextual = {
    type: 'element',
    tagName: 'a',
    properties: { href },
    children: [{ type: 'element', tagName: 'img', properties: { src: '/icon.svg', alt: href }, children: [] }],
  };
  const tree = { type: 'root', children: [formatted, nonTextual] };
  rehypeRawUrls()(tree);
  assert.equal(formatted.properties['data-raw-url'], true);
  assert.equal(Object.hasOwn(nonTextual.properties, 'data-raw-url'), false);
  assert.deepEqual(formatted.properties.className, ['source']);
});

test('built article links distinguish raw URLs from ordinary anchor text', () => {
  const dist = join(root, 'dist');
  let rawCount = 0;
  let ordinaryCount = 0;
  const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
  const visit = (node, inProse = false) => {
    const attrs = Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
    inProse ||= (attrs.class ?? '').split(/\s+/).includes('prose');
    if (inProse && node.nodeName === 'a') {
      const isRaw = /^https?:\/\//i.test(attrs.href ?? '') && text(node) === attrs.href;
      assert.equal(Object.hasOwn(attrs, 'data-raw-url'), isRaw, text(node));
      if (isRaw) rawCount += 1;
      else ordinaryCount += 1;
    }
    for (const child of node.childNodes ?? []) visit(child, inProse);
  };
  for (const path of readdirSync(dist, { recursive: true }).filter((path) => path.endsWith('.html'))) {
    visit(parse(readFileSync(join(dist, path), 'utf8')));
  }
  assert.ok(rawCount > 0 && ordinaryCount > 0, 'exercise both kinds of published link');
});
