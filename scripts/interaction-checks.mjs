import assert from 'node:assert/strict';

/**
 * Minimal browser-harness contract used by runInteractionChecks:
 *
 * - navigate(path): navigate to a same-origin path and wait for DOMContentLoaded.
 * - resize(width, height): set the CSS viewport and wait for the resize event.
 * - setReducedMotion(reduce): update the emulated media preference and wait for
 *   its change handlers to settle.
 * - addInitScript(pageFunction): run a function before the next document's page
 *   scripts and return a function that unregisters it.
 * - evaluate(pageFunction, argument?, options?): run a serializable function in
 *   the page and return its serializable result. When options.userGesture is
 *   true, a raw-CDP harness should use Runtime.evaluate's userGesture flag.
 * - until(pagePredicate, options?): repeatedly evaluate a zero-argument page
 *   predicate until it returns a truthy value. Options contain timeoutMs,
 *   intervalMs and a diagnostic message.
 *
 * @typedef {object} InteractionAdapter
 * @property {(path: string) => Promise<void>} navigate
 * @property {(width: number, height: number) => Promise<void>} resize
 * @property {(reduce: boolean) => Promise<void>} setReducedMotion
 * @property {(pageFunction: (...args: any[]) => unknown, argument?: any) => Promise<() => Promise<void>>} addInitScript
 * @property {<T>(pageFunction: (...args: any[]) => T | Promise<T>, argument?: any, options?: { userGesture?: boolean }) => Promise<T>} evaluate
 * @property {(pagePredicate: () => unknown, options?: { timeoutMs?: number, intervalMs?: number, message?: string }) => Promise<unknown>} until
 */

const waitOptions = (message) => ({ timeoutMs: 5_000, intervalMs: 25, message });

function installHeroLifecycleMocks(mode) {
  const video = document.querySelector('#hero-video');
  if (!(video instanceof HTMLVideoElement)) throw new Error('hero video not found');

  const state = {
    context: null,
    pauseCalls: 0,
    playCalls: 0,
    resumeCalls: 0,
    suspendCalls: 0,
    resolvePlay: undefined,
    resolveResume: undefined,
  };
  window.__interactionLifecycle = state;

  class InteractionAudioContext extends EventTarget {
    constructor() {
      super();
      this.state = 'suspended';
      this.sampleRate = 48_000;
      this.destination = {};
      state.context = this;
    }

    createMediaElementSource() {
      return { connect() {} };
    }

    createAnalyser() {
      return {
        fftSize: 4096,
        smoothingTimeConstant: 0,
        get frequencyBinCount() { return this.fftSize / 2; },
        getByteFrequencyData(values) { values.fill(0); },
        getFloatTimeDomainData(values) { values.fill(0); },
      };
    }

    resume() {
      state.resumeCalls += 1;
      if (mode === 'resume') {
        return new Promise((resolve) => {
          state.resolveResume = () => {
            this.state = 'running';
            this.dispatchEvent(new Event('statechange'));
            resolve();
          };
        });
      }
      this.state = 'running';
      this.dispatchEvent(new Event('statechange'));
      return Promise.resolve();
    }

    suspend() {
      state.suspendCalls += 1;
      this.state = 'suspended';
      this.dispatchEvent(new Event('statechange'));
      return Promise.resolve();
    }

    close() {
      this.state = 'closed';
      this.dispatchEvent(new Event('statechange'));
      return Promise.resolve();
    }
  }

  Object.defineProperty(window, 'AudioContext', { configurable: true, value: InteractionAudioContext });
  const nativePause = video.pause.bind(video);
  Object.defineProperty(video, 'pause', {
    configurable: true,
    value: () => {
      state.pauseCalls += 1;
      nativePause();
    },
  });
  Object.defineProperty(video, 'play', {
    configurable: true,
    value: () => {
      state.playCalls += 1;
      if (mode !== 'play') return Promise.resolve();
      return new Promise((resolve) => { state.resolvePlay = resolve; });
    },
  });
  document.querySelector('#listen-btn')?.click();
}

function installPendingAutoplayMock() {
  const state = {
    pauseCalls: 0,
    playCalls: 0,
    paused: true,
    resolvePlay: undefined,
  };
  window.__interactionAutoplay = state;

  Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
    configurable: true,
    get: () => state.paused,
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value() {
      state.pauseCalls += 1;
      state.paused = true;
      this.dispatchEvent(new Event('pause'));
    },
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value() {
      state.playCalls += 1;
      return new Promise((resolve) => {
        state.resolvePlay = () => {
          state.paused = false;
          this.dispatchEvent(new Event('playing'));
          resolve();
        };
      });
    },
  });
}

/**
 * Run compact interaction coverage against an already-running same-origin
 * preview. The caller owns browser startup, CDP connection and cleanup.
 *
 * @param {InteractionAdapter} adapter
 */
export async function runInteractionChecks(adapter) {
  for (const method of ['navigate', 'resize', 'setReducedMotion', 'addInitScript', 'evaluate', 'until']) {
    assert.equal(typeof adapter?.[method], 'function', `interaction adapter is missing ${method}()`);
  }

  const results = {};
  await adapter.setReducedMotion(false);

  await adapter.resize(1100, 800);
  await adapter.navigate('/articles/what-is-a-decibel/');
  await adapter.until(
    () => document.querySelector('[data-language-switcher]')?.classList.contains('is-enhanced'),
    waitOptions('language switcher enhancement'),
  );
  const language = await adapter.evaluate(() => {
    const trigger = document.querySelector('[data-language-trigger]');
    const menu = document.querySelector('[data-language-menu]');
    if (!(trigger instanceof HTMLElement) || !(menu instanceof HTMLElement)) throw new Error('language switcher not found');
    const press = (target, key) => target.dispatchEvent(new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    }));

    trigger.focus();
    press(trigger, 'ArrowDown');
    const items = [...menu.querySelectorAll('[role="menuitem"]')];
    const firstFocused = document.activeElement === items[0];
    press(items[0], 'ArrowDown');
    const secondFocused = document.activeElement === items[1];
    press(items[1], 'ArrowUp');
    const wrappedBack = document.activeElement === items[0];
    press(items[0], 'Escape');
    const closedAfterEscape = menu.hidden && trigger.getAttribute('aria-expanded') === 'false';
    const focusRestoredAfterEscape = document.activeElement === trigger;
    press(trigger, 'ArrowDown');
    const last = items.at(-1);
    if (!(last instanceof HTMLElement)) throw new Error('last language item not found');
    last.focus();
    press(last, 'Tab');
    const openDuringTab = !menu.hidden;
    document.querySelector('#search-open')?.focus();
    const closedAfterFocusLeaves = menu.hidden;

    return {
      firstFocused,
      secondFocused,
      wrappedBack,
      itemCount: items.length,
      closedAfterEscape,
      focusRestoredAfterEscape,
      openDuringTab,
      closedAfterFocusLeaves,
    };
  });
  assert.ok(language.itemCount >= 2, 'language menu must contain both locale choices');
  assert.equal(language.firstFocused, true, 'ArrowDown must open the language menu at its first item');
  assert.equal(language.secondFocused, true, 'ArrowDown must rove to the next language item');
  assert.equal(language.wrappedBack, true, 'ArrowUp must rove back to the previous language item');
  assert.equal(language.closedAfterEscape, true, 'Escape must close the language menu');
  assert.equal(language.focusRestoredAfterEscape, true, 'Escape must restore focus to the language trigger');
  assert.equal(language.openDuringTab, true, 'Tab must leave the menu open until the browser resolves the next focus target');
  assert.equal(language.closedAfterFocusLeaves, true, 'focusout must close the language menu after Tab leaves the switcher');
  results.languageSwitcher = language;

  await adapter.navigate('/articles/what-is-a-decibel/');
  await adapter.until(() => Boolean(document.querySelector('#search-open')), waitOptions('search trigger'));
  await adapter.evaluate(() => {
    const realFetch = window.fetch.bind(window);
    let searchCalls = 0;
    window.fetch = (input, init) => {
      const url = String(input instanceof Request ? input.url : input);
      if (!url.includes('search.json')) return realFetch(input, init);
      searchCalls += 1;
      window.__interactionSearchCalls = searchCalls;
      if (searchCalls === 1) return Promise.resolve(new Response('', { status: 503 }));
      return Promise.resolve(new Response(JSON.stringify([{
        title: 'Meter guide',
        description: 'A deterministic interaction-check result.',
        tags: ['meter'],
        url: '/articles/what-is-a-decibel/',
        kind: 'Article',
      }]), { status: 200, headers: { 'content-type': 'application/json' } }));
    };
    const trigger = document.querySelector('#search-open');
    if (!(trigger instanceof HTMLElement)) throw new Error('search trigger not found');
    trigger.focus();
    trigger.click();
  });
  await adapter.until(
    () => document.querySelector('#search-overlay')?.hasAttribute('open')
      && !document.querySelector('#search-error')?.hasAttribute('hidden'),
    waitOptions('failed search request'),
  );
  const searchTrap = await adapter.evaluate(() => {
    const overlay = document.querySelector('#search-overlay');
    if (!(overlay instanceof HTMLElement)) throw new Error('search dialog not found');
    const focusable = [...overlay.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )].filter((element) => element instanceof HTMLElement
      && element.getClientRects().length > 0
      && !element.closest('[hidden], [inert]'));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!(first instanceof HTMLElement) || !(last instanceof HTMLElement)) throw new Error('search focus endpoints not found');
    const tab = (target, shiftKey = false) => target.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey,
      bubbles: true,
      cancelable: true,
    }));
    last.focus();
    tab(last);
    const forwardWrap = document.activeElement === first;
    first.focus();
    tab(first, true);
    const backwardWrap = document.activeElement === last;
    const input = document.querySelector('#search-input');
    if (!(input instanceof HTMLInputElement)) throw new Error('search input not found');
    input.value = 'meter';
    const retry = document.querySelector('#search-retry');
    if (!(retry instanceof HTMLElement)) throw new Error('search retry control not found');
    retry.focus();
    retry.click();
    return {
      forwardWrap,
      backwardWrap,
      firstId: first.id,
      lastId: last.id,
      closing: overlay.classList.contains('is-closing'),
    };
  });
  assert.equal(searchTrap.forwardWrap, true, 'Tab must wrap from the last search control to the first');
  assert.equal(searchTrap.backwardWrap, true, 'Shift+Tab must wrap from the first search control to the last');
  assert.equal(searchTrap.closing, false, 'keyboard retry must not be mistaken for a backdrop click');
  await adapter.until(
    () => document.querySelectorAll('#search-results a').length === 1
      && document.querySelector('#search-error')?.hasAttribute('hidden'),
    waitOptions('successful search retry'),
  );
  const searchRetry = await adapter.evaluate(() => ({
    calls: window.__interactionSearchCalls,
    title: document.querySelector('#search-results .hit-title')?.textContent,
    href: document.querySelector('#search-results a')?.getAttribute('href'),
  }));
  assert.equal(searchRetry.calls, 2, 'retry must issue one new index request after the failure');
  assert.equal(searchRetry.title, 'Meter guide');
  assert.equal(searchRetry.href, '/articles/what-is-a-decibel/');

  const searchEnterPrecondition = await adapter.evaluate(async () => {
    const panel = document.querySelector('#search-overlay .search-panel');
    if (!(panel instanceof HTMLElement)) throw new Error('search panel not found');
    await Promise.all(panel.getAnimations().map((animation) => animation.finished.catch(() => {})));
    return panel.getAnimations().filter(
      (animation) => animation.animationName === 'search-panel-enter'
        && ['pending', 'running'].includes(animation.playState),
    ).length;
  });
  assert.equal(searchEnterPrecondition, 0, 'the search enter animation must be settled before close starts');
  await adapter.evaluate(() => {
    const panel = document.querySelector('#search-overlay .search-panel');
    if (!(panel instanceof HTMLElement)) throw new Error('search panel not found');
    const exitStyle = document.createElement('style');
    exitStyle.id = 'interaction-search-exit-style';
    exitStyle.textContent = '#search-overlay.is-closing .search-panel { animation-duration: 30s !important; }';
    document.head.append(exitStyle);
    const nativeSetTimeout = window.setTimeout;
    window.__interactionSearchFallbackDelay = undefined;
    window.setTimeout = (handler, delay, ...args) => {
      if (delay === 240) window.__interactionSearchFallbackDelay = delay;
      return nativeSetTimeout(handler, delay, ...args);
    };
    try {
      document.querySelector('#search-close')?.click();
    } finally {
      window.setTimeout = nativeSetTimeout;
    }
  });
  await adapter.until(
    () => document.querySelector('#search-overlay')?.hasAttribute('open')
      && document.querySelector('#search-overlay')?.classList.contains('is-closing'),
    waitOptions('active search close animation'),
  );
  const searchClosePrecondition = await adapter.evaluate(() => ({
    open: document.querySelector('#search-overlay')?.hasAttribute('open'),
    closing: document.querySelector('#search-overlay')?.classList.contains('is-closing'),
    duration: getComputedStyle(document.querySelector('#search-overlay .search-panel')).animationDuration,
    fallbackDelay: window.__interactionSearchFallbackDelay,
  }));
  assert.equal(searchClosePrecondition.open, true, 'the search dialog must still be open before reduced motion cancels its exit');
  assert.equal(searchClosePrecondition.closing, true, 'the search exit animation must be active before reduced motion cancels it');
  assert.equal(searchClosePrecondition.duration, '30s');
  assert.equal(searchClosePrecondition.fallbackDelay, 240);
  await adapter.setReducedMotion(true);
  await adapter.until(
    () => !document.querySelector('#search-overlay')?.hasAttribute('open')
      && document.querySelector('#search-overlay')?.hasAttribute('hidden')
      && document.activeElement === document.querySelector('#search-open'),
    waitOptions('search dialog close after a runtime reduced-motion change'),
  );
  const reducedMotionClose = await adapter.evaluate(() => ({
    open: document.querySelector('#search-overlay')?.hasAttribute('open'),
    hidden: document.querySelector('#search-overlay')?.hasAttribute('hidden'),
    closing: document.querySelector('#search-overlay')?.classList.contains('is-closing'),
    focusRestored: document.activeElement === document.querySelector('#search-open'),
  }));
  assert.equal(reducedMotionClose.open, false);
  assert.equal(reducedMotionClose.hidden, true);
  assert.equal(reducedMotionClose.closing, false);
  assert.equal(reducedMotionClose.focusRestored, true);
  await adapter.evaluate(() => {
    document.getElementById('interaction-search-exit-style')?.remove();
    delete window.__interactionSearchFallbackDelay;
  });
  await adapter.setReducedMotion(false);

  await adapter.navigate('/articles/what-is-a-decibel/');
  await adapter.until(() => Boolean(document.querySelector('#search-open')), waitOptions('malformed-index search trigger'));
  await adapter.evaluate(() => {
    const realFetch = window.fetch.bind(window);
    window.__interactionMalformedSearchLoaded = false;
    window.fetch = (input, init) => {
      const url = String(input instanceof Request ? input.url : input);
      if (!url.includes('search.json')) return realFetch(input, init);
      window.__interactionMalformedSearchLoaded = true;
      return Promise.resolve(new Response(JSON.stringify([{
        title: 'Broken entry',
        description: 'This entry has no valid tags array.',
        tags: null,
        url: '/articles/what-is-a-decibel/',
        kind: 'Article',
      }]), { status: 200, headers: { 'content-type': 'application/json' } }));
    };
    document.querySelector('#search-open')?.click();
  });
  await adapter.until(
    () => document.querySelector('#search-overlay')?.hasAttribute('open')
      && window.__interactionMalformedSearchLoaded === true,
    waitOptions('malformed search index response'),
  );
  await adapter.evaluate(() => {
    const input = document.querySelector('#search-input');
    if (!(input instanceof HTMLInputElement)) throw new Error('search input not found');
    input.value = 'broken';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await adapter.until(
    () => !document.querySelector('#search-error')?.hasAttribute('hidden'),
    waitOptions('malformed search index error state'),
  );
  const malformedIndex = await adapter.evaluate(() => ({
    open: document.querySelector('#search-overlay')?.hasAttribute('open'),
    errorVisible: !document.querySelector('#search-error')?.hasAttribute('hidden'),
    resultCount: document.querySelectorAll('#search-results a').length,
  }));
  assert.equal(malformedIndex.open, true);
  assert.equal(malformedIndex.errorVisible, true);
  assert.equal(malformedIndex.resultCount, 0);

  await adapter.navigate('/articles/what-is-a-decibel/');
  await adapter.until(() => Boolean(document.querySelector('#search-open')), waitOptions('timed search trigger'));
  await adapter.evaluate(() => {
    const realFetch = window.fetch.bind(window);
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.__interactionNativeSetTimeout = nativeSetTimeout;
    window.__interactionSearchTimeoutDelay = undefined;
    window.__interactionSearchTimeoutSignal = false;
    window.setTimeout = (handler, delay, ...args) => {
      if (delay === 8000) {
        window.__interactionSearchTimeoutDelay = delay;
        return nativeSetTimeout(handler, 0, ...args);
      }
      return nativeSetTimeout(handler, delay, ...args);
    };
    window.fetch = (input, init) => {
      const url = String(input instanceof Request ? input.url : input);
      if (!url.includes('search.json')) return realFetch(input, init);
      const signal = init?.signal;
      window.__interactionSearchTimeoutSignal = signal instanceof AbortSignal;
      if (!(signal instanceof AbortSignal)) return Promise.reject(new Error('Search request has no timeout signal'));
      return new Promise((_resolve, reject) => {
        const rejectAbort = () => reject(signal.reason ?? new DOMException('Search timed out', 'AbortError'));
        if (signal.aborted) rejectAbort();
        else signal.addEventListener('abort', rejectAbort, { once: true });
      });
    };
    document.querySelector('#search-open')?.click();
  });
  await adapter.until(
    () => !document.querySelector('#search-error')?.hasAttribute('hidden'),
    waitOptions('timed-out search error state'),
  );
  const searchTimeout = await adapter.evaluate(() => {
    const result = {
      timeoutDelay: window.__interactionSearchTimeoutDelay,
      signalAttached: window.__interactionSearchTimeoutSignal,
      errorVisible: !document.querySelector('#search-error')?.hasAttribute('hidden'),
    };
    window.setTimeout = window.__interactionNativeSetTimeout;
    delete window.__interactionNativeSetTimeout;
    return result;
  });
  assert.equal(searchTimeout.timeoutDelay, 8000, 'search requests must abort after the bounded timeout');
  assert.equal(searchTimeout.signalAttached, true, 'search requests must receive an abort signal');
  assert.equal(searchTimeout.errorVisible, true);

  await adapter.navigate('/articles/what-is-a-decibel/');
  await adapter.until(() => Boolean(document.querySelector('#search-open')), waitOptions('fresh search trigger'));
  await adapter.evaluate(() => {
    const realFetch = window.fetch.bind(window);
    window.__interactionResolveSearch = undefined;
    window.fetch = (input, init) => {
      const url = String(input instanceof Request ? input.url : input);
      if (!url.includes('search.json')) return realFetch(input, init);
      return new Promise((resolve) => {
        window.__interactionResolveSearch = () => resolve(new Response(JSON.stringify([{
          title: 'Stale closed-session result',
          description: 'This must not render while the dialog is closed.',
          tags: ['stale'],
          url: '/articles/what-is-a-decibel/',
          kind: 'Article',
        }]), { status: 200, headers: { 'content-type': 'application/json' } }));
      });
    };
    window.__interactionSearchOpenedFromBody = document.activeElement === document.body;
    document.querySelector('#search-open')?.click();
  });
  await adapter.until(
    () => document.querySelector('#search-overlay')?.hasAttribute('open')
      && typeof window.__interactionResolveSearch === 'function',
    waitOptions('pending search request'),
  );
  await adapter.evaluate(() => document.querySelector('#search-close')?.click());
  await adapter.until(
    () => !document.querySelector('#search-overlay')?.hasAttribute('open'),
    waitOptions('close during pending search'),
  );
  await adapter.evaluate(async () => {
    window.__interactionResolveSearch?.();
    await new Promise((resolve) => setTimeout(resolve, 50));
  });
  const staleSearch = await adapter.evaluate(() => ({
    open: document.querySelector('#search-overlay')?.hasAttribute('open'),
    resultCount: document.querySelectorAll('#search-results a').length,
    errorVisible: !document.querySelector('#search-error')?.hasAttribute('hidden'),
    announcement: document.querySelector('[data-search-announcement]')?.textContent ?? '',
    openedFromBody: window.__interactionSearchOpenedFromBody,
    focusRestoredToTrigger: document.activeElement === document.querySelector('#search-open'),
  }));
  assert.equal(staleSearch.open, false);
  assert.equal(staleSearch.resultCount, 0, 'a closed search session must ignore a late index response');
  assert.equal(staleSearch.errorVisible, false, 'a closed search session must not surface a late error state');
  assert.equal(staleSearch.announcement, '', 'a closed search session must not announce a late result');
  assert.equal(staleSearch.openedFromBody, true, 'the fallback-focus regression must open search from the document body');
  assert.equal(staleSearch.focusRestoredToTrigger, true, 'closing search from the document body must focus the search button');
  results.search = { trap: searchTrap, retry: searchRetry, reducedMotionClose, timeout: searchTimeout, staleSession: staleSearch };

  await adapter.setReducedMotion(true);
  await adapter.resize(1100, 800);
  await adapter.navigate('/');
  const initialReducedRail = await adapter.evaluate(() => ({
    display: getComputedStyle(document.querySelector('[data-exposure-rail]')).display,
    value: document.querySelector('[data-rail-value]')?.textContent,
    progress: document.querySelector('[data-exposure-rail]')?.style.getPropertyValue('--rail-progress'),
  }));
  assert.equal(initialReducedRail.display, 'none');
  assert.equal(initialReducedRail.value, '0');
  assert.equal(initialReducedRail.progress, '0%');
  await adapter.setReducedMotion(false);
  await adapter.until(() => document.querySelectorAll('[data-pro-category]').length >= 2, waitOptions('Pro tabs'));
  const proTabs = await adapter.evaluate(() => {
    const tabs = [...document.querySelectorAll('[data-pro-category]')];
    const panels = [...document.querySelectorAll('[data-pro-feature-panel]')];
    const press = (target, key) => target.dispatchEvent(new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    }));
    const first = tabs[0];
    if (!(first instanceof HTMLElement)) throw new Error('Pro tab not found');
    first.focus();
    press(first, 'ArrowRight');
    const second = tabs[1];
    const rightFocusedSecond = document.activeElement === second
      && second?.getAttribute('aria-selected') === 'true';
    const secondPanel = panels.find((panel) => panel.id === second?.getAttribute('aria-controls'));
    const detailButton = secondPanel?.querySelectorAll('.pro-feature-button')[1];
    if (!(detailButton instanceof HTMLElement)) throw new Error('Pro detail button not found');
    detailButton.click();
    const detailTitle = secondPanel.querySelector('[data-pro-feature-title]')?.textContent;
    const selectedDetail = detailButton.getAttribute('aria-pressed');
    press(second, 'End');
    const selectedTabs = tabs.filter((tab) => tab.getAttribute('aria-selected') === 'true');
    const lastTab = tabs.at(-1);
    const activePanelId = selectedTabs[0]?.getAttribute('aria-controls');
    return {
      rightFocusedSecond,
      detailTitle,
      expectedDetailTitle: detailButton.dataset.featureTitle,
      selectedDetail,
      selectedTabCount: selectedTabs.length,
      finalTabIsLast: lastTab !== undefined
        && selectedTabs[0]?.isSameNode(lastTab) === true
        && document.activeElement?.isSameNode(lastTab) === true,
      panels: panels.map((panel) => ({
        id: panel.id,
        hidden: panel.getAttribute('aria-hidden'),
        inert: panel.hasAttribute('inert'),
        active: panel.id === activePanelId,
      })),
    };
  });
  assert.equal(proTabs.rightFocusedSecond, true, 'ArrowRight must move Pro-tab focus to the second tab');
  assert.equal(proTabs.selectedDetail, 'true', 'clicking a Pro feature must commit its pressed state');
  assert.equal(proTabs.detailTitle, proTabs.expectedDetailTitle, 'Pro detail copy must follow the committed feature');
  assert.equal(proTabs.selectedTabCount, 1, 'exactly one Pro tab must remain selected');
  assert.equal(proTabs.finalTabIsLast, true, 'End must activate and focus the last Pro tab');
  for (const panel of proTabs.panels) {
    assert.equal(panel.hidden, panel.active ? 'false' : 'true', `${panel.id} aria-hidden state`);
    assert.equal(panel.inert, !panel.active, `${panel.id} inert state`);
  }

  await adapter.evaluate(() => {
    const rail = document.querySelector('[data-exposure-rail]');
    const section = rail?.closest('[data-exposure-rail-section]');
    if (!(section instanceof HTMLElement)) throw new Error('Exposure Rail section not found');
    const top = section.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + section.offsetHeight * 0.7);
  });
  await adapter.until(
    () => Number(document.querySelector('[data-rail-value]')?.textContent) > 0,
    waitOptions('active Exposure Rail scroll reading'),
  );
  const activeRail = await adapter.evaluate(() => ({
    display: getComputedStyle(document.querySelector('[data-exposure-rail]')).display,
    value: Number(document.querySelector('[data-rail-value]')?.textContent),
  }));
  assert.notEqual(activeRail.display, 'none');
  assert.ok(activeRail.value > 0);

  await adapter.setReducedMotion(true);
  await adapter.until(
    () => {
      const rail = document.querySelector('[data-exposure-rail]');
      return getComputedStyle(rail).display === 'none'
        && document.querySelector('[data-rail-value]')?.textContent === '0';
    },
    waitOptions('reduced-motion Exposure Rail teardown'),
  );
  await adapter.evaluate(async () => {
    scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 80));
  });
  const reducedRail = await adapter.evaluate(() => ({
    display: getComputedStyle(document.querySelector('[data-exposure-rail]')).display,
    value: document.querySelector('[data-rail-value]')?.textContent,
    progress: document.querySelector('[data-exposure-rail]')?.style.getPropertyValue('--rail-progress'),
  }));
  assert.equal(reducedRail.display, 'none');
  assert.equal(reducedRail.value, '0');
  assert.equal(reducedRail.progress, '0%');

  await adapter.setReducedMotion(false);
  await adapter.evaluate(() => {
    const rail = document.querySelector('[data-exposure-rail]');
    const section = rail?.closest('[data-exposure-rail-section]');
    if (!(section instanceof HTMLElement)) throw new Error('Exposure Rail section not found');
    const top = section.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + section.offsetHeight * 0.7);
  });
  await adapter.until(
    () => getComputedStyle(document.querySelector('[data-exposure-rail]')).display !== 'none'
      && Number(document.querySelector('[data-rail-value]')?.textContent) > 0,
    waitOptions('Exposure Rail restart after reduced motion'),
  );
  const resumedRail = await adapter.evaluate(() => ({
    display: getComputedStyle(document.querySelector('[data-exposure-rail]')).display,
    value: Number(document.querySelector('[data-rail-value]')?.textContent),
  }));
  assert.notEqual(resumedRail.display, 'none');
  assert.ok(resumedRail.value > 0);
  results.proTabs = {
    ...proTabs,
    exposureRail: { initialReduced: initialReducedRail, active: activeRail, reduced: reducedRail, resumed: resumedRail },
  };

  await adapter.resize(1000, 800);
  await adapter.navigate('/sounds/');
  await adapter.until(() => document.querySelectorAll('[data-sound-explorer] .sound-marker').length > 1, waitOptions('Sound Explorer'));
  const soundSelection = await adapter.evaluate(() => {
    const explorer = document.querySelector('[data-sound-explorer]');
    if (!(explorer instanceof HTMLElement)) throw new Error('Sound Explorer not found');
    const markers = [...explorer.querySelectorAll('.sound-marker')];
    const marker = markers.find((candidate, index) => index > 0 && candidate instanceof HTMLElement && candidate.dataset.route);
    if (!(marker instanceof HTMLElement)) throw new Error('Sound Explorer guide marker not found');
    marker.click();
    marker.focus();
    const route = explorer.querySelector('[data-sound-route]');
    const host = explorer.querySelector('.sound-markers');
    return {
      index: Number(marker.dataset.soundIndex),
      name: explorer.querySelector('[data-sound-name]')?.textContent,
      expectedName: marker.dataset.name,
      range: explorer.querySelector('[data-sound-range]')?.textContent,
      expectedRange: marker.dataset.range,
      activeCount: markers.filter((candidate) => candidate.classList.contains('active')).length,
      pressed: marker.getAttribute('aria-pressed'),
      routeHidden: route?.hasAttribute('hidden'),
      routePath: route instanceof HTMLAnchorElement ? new URL(route.href).pathname : '',
      expectedRoute: marker.dataset.route,
      announcement: explorer.querySelector('[data-sound-announcement]')?.textContent,
      bandStart: host instanceof HTMLElement ? host.style.getPropertyValue('--band-start') : '',
      bandSpan: host instanceof HTMLElement ? host.style.getPropertyValue('--band-span') : '',
      expectedBandStart: marker.dataset.bandStart,
      expectedBandSpan: marker.dataset.bandSpan,
      bandRisk: explorer.querySelector('[data-range-band]')?.classList.contains(marker.dataset.risk ?? ''),
      markerFocused: document.activeElement === marker,
    };
  });
  assert.equal(soundSelection.name, soundSelection.expectedName);
  assert.equal(soundSelection.range, soundSelection.expectedRange);
  assert.equal(soundSelection.activeCount, 1, 'Sound Explorer must have exactly one committed selection');
  assert.equal(soundSelection.pressed, 'true');
  assert.equal(soundSelection.routeHidden, false);
  assert.equal(soundSelection.routePath, soundSelection.expectedRoute);
  assert.equal(soundSelection.announcement, `${soundSelection.expectedName}: ${soundSelection.expectedRange}`);
  assert.equal(soundSelection.bandStart, soundSelection.expectedBandStart);
  assert.equal(soundSelection.bandSpan, soundSelection.expectedBandSpan);
  assert.equal(soundSelection.bandRisk, true);
  assert.equal(soundSelection.markerFocused, true);

  await adapter.until(
    () => {
      const reading = document.querySelector('[data-sound-range]:not([aria-hidden])');
      const ghost = document.querySelector('[data-sound-range][aria-hidden="true"]');
      return reading instanceof HTMLElement
        && reading.style.opacity === '0'
        && ghost instanceof HTMLElement
        && !ghost.hidden;
    },
    waitOptions('active Sound Explorer scramble precondition'),
  );
  const scramblePrecondition = await adapter.evaluate(() => {
    const reading = document.querySelector('[data-sound-range]:not([aria-hidden])');
    const ghost = document.querySelector('[data-sound-range][aria-hidden="true"]');
    return {
      opacity: reading instanceof HTMLElement ? reading.style.opacity : undefined,
      ghostVisible: ghost instanceof HTMLElement && !ghost.hidden,
    };
  });
  assert.equal(scramblePrecondition.opacity, '0');
  assert.equal(scramblePrecondition.ghostVisible, true);
  await adapter.setReducedMotion(true);
  await adapter.until(
    () => {
      const reading = document.querySelector('[data-sound-range]:not([aria-hidden])');
      const ghost = document.querySelector('[data-sound-range][aria-hidden="true"]');
      return reading instanceof HTMLElement
        && reading.style.opacity !== '0'
        && (!(ghost instanceof HTMLElement) || ghost.hidden);
    },
    waitOptions('active Sound Explorer scramble finalization'),
  );
  const reducedScramble = await adapter.evaluate(() => {
    const reading = document.querySelector('[data-sound-range]:not([aria-hidden])');
    const ghost = document.querySelector('[data-sound-range][aria-hidden="true"]');
    return {
      text: reading?.textContent,
      opacity: reading instanceof HTMLElement ? reading.style.opacity : undefined,
      ghostHidden: !(ghost instanceof HTMLElement) || ghost.hidden,
    };
  });
  assert.equal(reducedScramble.text, soundSelection.expectedRange);
  assert.notEqual(reducedScramble.opacity, '0');
  assert.equal(reducedScramble.ghostHidden, true);
  await adapter.setReducedMotion(false);

  await adapter.resize(700, 800);
  await adapter.until(
    () => document.activeElement?.matches('.mobile-sound-list summary') === true,
    waitOptions('desktop-to-mobile Sound Explorer focus transfer'),
  );
  const mobileSoundFocus = await adapter.evaluate(() => ({
    width: innerWidth,
    index: Number(document.activeElement?.closest('[data-sound-index]')?.getAttribute('data-sound-index')),
    summary: document.activeElement?.matches('.mobile-sound-list summary') === true,
  }));
  assert.equal(mobileSoundFocus.width, 700);
  assert.equal(mobileSoundFocus.index, soundSelection.index);
  assert.equal(mobileSoundFocus.summary, true);
  await adapter.resize(701, 800);
  await adapter.until(
    () => document.activeElement?.matches('.sound-marker') === true,
    waitOptions('mobile-to-desktop Sound Explorer focus transfer'),
  );
  const desktopSoundFocus = await adapter.evaluate(() => ({
    width: innerWidth,
    index: Number(document.activeElement?.getAttribute('data-sound-index')),
    marker: document.activeElement?.matches('.sound-marker') === true,
  }));
  assert.equal(desktopSoundFocus.width, 701);
  assert.equal(desktopSoundFocus.index, soundSelection.index);
  assert.equal(desktopSoundFocus.marker, true);
  const pointerFocusPrecondition = await adapter.evaluate(() => {
    const markerFocused = document.activeElement?.matches('.sound-marker') === true;
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
    return { markerFocused };
  });
  assert.equal(pointerFocusPrecondition.markerFocused, true, 'the stale-focus regression needs a focused desktop marker');
  await adapter.resize(700, 800);
  await adapter.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const pointerClearedFocus = await adapter.evaluate(() => ({
    summaryFocused: document.activeElement?.matches('.mobile-sound-list summary') === true,
  }));
  assert.equal(pointerClearedFocus.summaryFocused, false, 'pointer activity outside the explorer must clear responsive focus transfer');
  results.soundExplorer = {
    selection: soundSelection,
    scramblePrecondition,
    reducedScramble,
    mobileFocus: mobileSoundFocus,
    desktopFocus: desktopSoundFocus,
    pointerClearedFocus,
  };

  await adapter.navigate('/tools/decibel-distance/');
  await adapter.until(() => Boolean(document.querySelector('[data-distance-calculator]')), waitOptions('distance calculator'));
  await adapter.evaluate(() => {
    const set = (selector, value) => {
      const input = document.querySelector(selector);
      if (!(input instanceof HTMLInputElement)) throw new Error(`${selector} not found`);
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    set('[data-reference-level]', '90');
    set('[data-reference-distance]', '1');
    set('[data-target-distance]', '4');
  });
  await adapter.until(() => document.querySelector('[data-distance-output]')?.textContent === '78.0 dB', waitOptions('changed distance result'));
  await adapter.evaluate(() => {
    const input = document.querySelector('[data-target-distance]');
    if (!(input instanceof HTMLInputElement)) throw new Error('target distance not found');
    input.value = '2';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const distance = await adapter.evaluate(() => ({
    level: document.querySelector('[data-distance-output]')?.textContent,
    change: document.querySelector('[data-distance-change]')?.textContent,
  }));
  assert.equal(distance.level, '84.0 dB');
  assert.match(distance.change ?? '', /−6\.0 dB$/);
  await adapter.evaluate(() => {
    const input = document.querySelector('[data-reference-distance]');
    if (!(input instanceof HTMLInputElement)) throw new Error('reference distance not found');
    input.value = '0';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const invalidDistance = await adapter.evaluate(() => ({
    level: document.querySelector('[data-distance-output]')?.textContent,
    detail: document.querySelector('[data-distance-change]')?.textContent,
  }));
  assert.equal(invalidDistance.level, '—');
  assert.match(invalidDistance.detail ?? '', /valid positive distances/i);

  await adapter.navigate('/tools/add-decibels/');
  await adapter.until(() => Boolean(document.querySelector('[data-add-decibels-calculator]')), waitOptions('add-decibels calculator'));
  await adapter.evaluate(() => {
    const inputs = [...document.querySelectorAll('[data-sound-level]')];
    for (const input of inputs) {
      input.value = '70';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await adapter.until(() => document.querySelector('[data-combined-output]')?.textContent === '73.0 dB', waitOptions('changed addition result'));
  await adapter.evaluate(() => {
    for (const input of document.querySelectorAll('[data-sound-level]')) {
      input.value = '80';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  const addition = await adapter.evaluate(() => ({
    level: document.querySelector('[data-combined-output]')?.textContent,
    detail: document.querySelector('[data-combined-detail]')?.textContent,
  }));
  assert.equal(addition.level, '83.0 dB');
  assert.match(addition.detail ?? '', /2 independent levels combine to 83\.0 dB\./);

  await adapter.navigate('/tools/noise-dose-calculator/');
  await adapter.until(() => Boolean(document.querySelector('[data-noise-dose-calculator]')), waitOptions('noise-dose calculator'));
  await adapter.evaluate(() => {
    const rows = [...document.querySelectorAll('[data-exposure-row]')];
    for (const row of rows) {
      const level = row.querySelector('[data-exposure-level]');
      const duration = row.querySelector('[data-exposure-duration]');
      const unit = row.querySelector('[data-exposure-unit]');
      if (!(level instanceof HTMLInputElement) || !(duration instanceof HTMLInputElement) || !(unit instanceof HTMLSelectElement)) {
        throw new Error('noise-dose row is incomplete');
      }
      level.value = '85';
      unit.value = 'minutes';
      unit.dispatchEvent(new Event('change', { bubbles: true }));
      duration.value = '100';
      duration.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await adapter.until(() => document.querySelector('[data-dose-output]')?.textContent === '41.7%', waitOptions('changed noise-dose result'));
  await adapter.evaluate(() => {
    for (const duration of document.querySelectorAll('[data-exposure-duration]')) {
      duration.value = '240';
      duration.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  const noiseDose = await adapter.evaluate(() => ({
    dose: document.querySelector('[data-dose-output]')?.textContent,
    detail: document.querySelector('[data-dose-detail]')?.textContent,
    totalMinutes: [...document.querySelectorAll('[data-exposure-duration]')]
      .reduce((sum, input) => sum + Number(input.value), 0),
    levels: [...document.querySelectorAll('[data-exposure-level]')].map((input) => Number(input.value)),
    units: [...document.querySelectorAll('[data-exposure-unit]')].map((input) => input.value),
  }));
  assert.equal(noiseDose.dose, '100%');
  assert.equal(noiseDose.totalMinutes, 480);
  assert.deepEqual(noiseDose.levels, [85, 85]);
  assert.deepEqual(noiseDose.units, ['minutes', 'minutes']);
  assert.equal(noiseDose.detail, 'At 100% of the daily reference dose.');
  results.calculators = { distance, invalidDistance, addition, noiseDose };

  await adapter.resize(1100, 800);
  await adapter.navigate('/');
  await adapter.until(
    () => {
      const video = document.querySelector('#hero-video');
      const button = document.querySelector('#listen-btn');
      return video instanceof HTMLVideoElement && video.readyState >= 1 && button instanceof HTMLButtonElement && !button.disabled;
    },
    waitOptions('hero media readiness'),
  );
  await adapter.evaluate(() => document.querySelector('#listen-btn')?.click(), undefined, { userGesture: true });
  await adapter.until(
    () => {
      const video = document.querySelector('#hero-video');
      return document.querySelector('#listen-btn')?.getAttribute('aria-pressed') === 'true'
        && video instanceof HTMLVideoElement && !video.muted && !video.paused;
    },
    waitOptions('hero Listen success'),
  );
  const heroListen = await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    return {
      pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
      muted: video instanceof HTMLVideoElement ? video.muted : undefined,
      paused: video instanceof HTMLVideoElement ? video.paused : undefined,
      text: document.querySelector('#listen-text')?.textContent,
    };
  });
  assert.equal(heroListen.pressed, 'true');
  assert.equal(heroListen.muted, false);
  assert.equal(heroListen.paused, false);
  assert.match(heroListen.text ?? '', /Mute/);

  const persistedPagehide = await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    const event = new PageTransitionEvent('pagehide', { persisted: true });
    window.dispatchEvent(event);
    return {
      persisted: event.persisted,
      pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
      muted: video instanceof HTMLVideoElement ? video.muted : undefined,
      paused: video instanceof HTMLVideoElement ? video.paused : undefined,
      listening: document.body.classList.contains('is-listening'),
    };
  });
  const persistedPagehideDetails = JSON.stringify(persistedPagehide);
  assert.equal(persistedPagehide.persisted, true, persistedPagehideDetails);
  assert.equal(persistedPagehide.pressed, 'true', persistedPagehideDetails);
  assert.equal(persistedPagehide.muted, false, persistedPagehideDetails);
  assert.equal(persistedPagehide.paused, false, persistedPagehideDetails);
  assert.equal(persistedPagehide.listening, true, persistedPagehideDetails);

  await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    if (!(video instanceof HTMLVideoElement)) throw new Error('hero video not found');
    const currentSource = video.src;
    Object.defineProperty(video, 'paused', { configurable: true, get: () => true });
    Object.defineProperty(video, 'src', {
      configurable: true,
      get: () => currentSource,
      set: (value) => { window.__interactionRequestedHeroSource = value; },
    });
    Object.defineProperty(video, 'load', { configurable: true, value: () => {} });
  });
  await adapter.resize(700, 800);
  const sourceSwitchPrecondition = await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    return {
      pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
      muted: video instanceof HTMLVideoElement ? video.muted : undefined,
      paused: video instanceof HTMLVideoElement ? video.paused : undefined,
      requestedSource: window.__interactionRequestedHeroSource,
    };
  });
  assert.equal(sourceSwitchPrecondition.pressed, 'true', 'the visible source-switch action must still be Mute');
  assert.equal(sourceSwitchPrecondition.muted, false);
  assert.equal(sourceSwitchPrecondition.paused, true, 'the source-switch race must exercise transient paused media');
  assert.match(sourceSwitchPrecondition.requestedSource ?? '', /hero-mobile/);
  await adapter.evaluate(() => document.querySelector('#listen-btn')?.click(), undefined, { userGesture: true });
  await adapter.until(
    () => {
      const video = document.querySelector('#hero-video');
      return document.querySelector('#listen-btn')?.getAttribute('aria-pressed') === 'false'
        && video instanceof HTMLVideoElement && video.muted;
    },
    waitOptions('hero Mute state'),
  );
  const heroMute = await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    return {
      pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
      muted: video instanceof HTMLVideoElement ? video.muted : undefined,
      text: document.querySelector('#listen-text')?.textContent,
    };
  });
  assert.equal(heroMute.pressed, 'false');
  assert.equal(heroMute.muted, true);
  assert.match(heroMute.text ?? '', /Listen/);

  const abortedSourceChange = await adapter.evaluate(async () => {
    const video = document.querySelector('#hero-video');
    const button = document.querySelector('#listen-btn');
    if (!(video instanceof HTMLVideoElement)) throw new Error('hero video not found');
    if (!(button instanceof HTMLButtonElement)) throw new Error('hero Listen button not found');
    await new Promise((resolve) => setTimeout(resolve, 20));
    video.dispatchEvent(new Event('abort'));
    button.setAttribute('aria-pressed', 'true');
    video.dispatchEvent(new Event('pause'));
    return {
      pressed: button.getAttribute('aria-pressed'),
      muted: video.muted,
      paused: video.paused,
    };
  });
  assert.equal(abortedSourceChange.pressed, 'false');
  assert.equal(abortedSourceChange.muted, true);
  assert.equal(abortedSourceChange.paused, true);

  const pagehideZero = await adapter.evaluate(() => {
    const sweep = document.querySelector('#gauge-sweep');
    if (!(sweep instanceof SVGElement)) throw new Error('hero gauge sweep not found');
    sweep.style.setProperty('--sweep', '123');
    const beforeSweep = sweep.style.getPropertyValue('--sweep');
    window.dispatchEvent(new Event('pagehide'));
    return {
      beforeSweep,
      db: document.querySelector('#db-value')?.textContent,
      status: document.querySelector('#instrument-status')?.textContent,
      sweep: sweep.style.getPropertyValue('--sweep'),
      listening: document.body.classList.contains('is-listening'),
    };
  });
  assert.equal(Number(pagehideZero.beforeSweep), 123);
  assert.equal(pagehideZero.db, '--');
  assert.equal(pagehideZero.status, 'Standby');
  assert.equal(Number(pagehideZero.sweep), 0);
  assert.equal(pagehideZero.listening, false);

  await adapter.resize(1100, 800);
  await adapter.navigate('/');
  await adapter.until(
    () => {
      const video = document.querySelector('#hero-video');
      const button = document.querySelector('#listen-btn');
      return video instanceof HTMLVideoElement && video.readyState >= 1 && button instanceof HTMLButtonElement && !button.disabled;
    },
    waitOptions('fresh hero media readiness'),
  );
  await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    if (!(video instanceof HTMLVideoElement)) throw new Error('hero video not found');
    window.__interactionRejectedPlayCalls = 0;
    Object.defineProperty(video, 'play', {
      configurable: true,
      value: () => {
        window.__interactionRejectedPlayCalls += 1;
        return Promise.reject(new DOMException('Injected interaction-check rejection', 'NotAllowedError'));
      },
    });
    document.querySelector('#listen-btn')?.click();
  }, undefined, { userGesture: true });
  await adapter.until(
    () => {
      const video = document.querySelector('#hero-video');
      return window.__interactionRejectedPlayCalls > 0
        && document.querySelector('#listen-btn')?.getAttribute('aria-pressed') === 'false'
        && video instanceof HTMLVideoElement && video.muted;
    },
    waitOptions('hero rejected play recovery'),
  );
  const heroRejected = await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    return {
      playCalls: window.__interactionRejectedPlayCalls,
      pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
      muted: video instanceof HTMLVideoElement ? video.muted : undefined,
      disabled: document.querySelector('#listen-btn')?.hasAttribute('disabled'),
    };
  });
  assert.ok(heroRejected.playCalls >= 1);
  assert.equal(heroRejected.pressed, 'false');
  assert.equal(heroRejected.muted, true);
  assert.equal(heroRejected.disabled, false);

  await adapter.setReducedMotion(true);
  await adapter.navigate('/');
  await adapter.until(
    () => document.querySelector('#listen-btn') instanceof HTMLButtonElement,
    waitOptions('hero lifecycle resume setup'),
  );
  await adapter.evaluate(installHeroLifecycleMocks, 'resume', { userGesture: true });
  await adapter.until(
    () => window.__interactionLifecycle?.resumeCalls === 1,
    waitOptions('pending AudioContext resume'),
  );
  await adapter.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    window.__interactionLifecycle?.resolveResume?.();
  });
  await adapter.until(
    () => window.__interactionLifecycle?.context?.state === 'suspended'
      && window.__interactionLifecycle.suspendCalls >= 1,
    waitOptions('stale AudioContext resume teardown'),
  );
  const staleResume = await adapter.evaluate(() => ({
    contextState: window.__interactionLifecycle?.context?.state,
    pauseCalls: window.__interactionLifecycle?.pauseCalls,
    playCalls: window.__interactionLifecycle?.playCalls,
    resumeCalls: window.__interactionLifecycle?.resumeCalls,
    suspendCalls: window.__interactionLifecycle?.suspendCalls,
    pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
    muted: document.querySelector('#hero-video')?.muted,
    db: document.querySelector('#db-value')?.textContent,
    status: document.querySelector('#instrument-status')?.textContent,
  }));
  assert.equal(staleResume.contextState, 'suspended');
  assert.ok(staleResume.pauseCalls >= 1);
  assert.equal(staleResume.playCalls, 0, 'a stale resume must not continue into playback');
  assert.equal(staleResume.resumeCalls, 1);
  assert.ok(staleResume.suspendCalls >= 1);
  assert.equal(staleResume.pressed, 'false');
  assert.equal(staleResume.muted, true);
  assert.equal(staleResume.db, '--');
  assert.equal(staleResume.status, 'Standby');

  await adapter.navigate('/');
  await adapter.until(
    () => document.querySelector('#listen-btn') instanceof HTMLButtonElement,
    waitOptions('hero lifecycle play setup'),
  );
  await adapter.evaluate(installHeroLifecycleMocks, 'play', { userGesture: true });
  await adapter.until(
    () => window.__interactionLifecycle?.playCalls === 1,
    waitOptions('pending hero video play'),
  );
  await adapter.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    window.__interactionLifecycle.pauseCallsAfterPagehide = window.__interactionLifecycle.pauseCalls;
    window.__interactionLifecycle.resolvePlay?.();
  });
  await adapter.until(
    () => window.__interactionLifecycle?.pauseCalls > window.__interactionLifecycle?.pauseCallsAfterPagehide
      && window.__interactionLifecycle?.context?.state === 'suspended',
    waitOptions('stale hero video play teardown'),
  );
  const stalePlay = await adapter.evaluate(() => ({
    contextState: window.__interactionLifecycle?.context?.state,
    pauseCalls: window.__interactionLifecycle?.pauseCalls,
    pauseCallsAfterPagehide: window.__interactionLifecycle?.pauseCallsAfterPagehide,
    playCalls: window.__interactionLifecycle?.playCalls,
    resumeCalls: window.__interactionLifecycle?.resumeCalls,
    suspendCalls: window.__interactionLifecycle?.suspendCalls,
    pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
    muted: document.querySelector('#hero-video')?.muted,
    db: document.querySelector('#db-value')?.textContent,
    status: document.querySelector('#instrument-status')?.textContent,
  }));
  assert.equal(stalePlay.contextState, 'suspended');
  assert.ok(stalePlay.pauseCalls > stalePlay.pauseCallsAfterPagehide, 'stale play resolution must pause media again');
  assert.equal(stalePlay.playCalls, 1);
  assert.equal(stalePlay.resumeCalls, 1);
  assert.ok(stalePlay.suspendCalls >= 1);
  assert.equal(stalePlay.pressed, 'false');
  assert.equal(stalePlay.muted, true);
  assert.equal(stalePlay.db, '--');
  assert.equal(stalePlay.status, 'Standby');
  await adapter.setReducedMotion(false);

  const removeAutoplayMock = await adapter.addInitScript(installPendingAutoplayMock);
  try {
    await adapter.navigate('/');
    await adapter.until(
      () => window.__interactionAutoplay?.playCalls === 1
        && typeof window.__interactionAutoplay.resolvePlay === 'function',
      waitOptions('pending initial hero autoplay'),
    );
  } finally {
    await removeAutoplayMock();
  }
  const autoplayPrecondition = await adapter.evaluate(() => ({
    playCalls: window.__interactionAutoplay?.playCalls,
    paused: document.querySelector('#hero-video')?.paused,
    muted: document.querySelector('#hero-video')?.muted,
  }));
  assert.equal(autoplayPrecondition.playCalls, 1, 'the initial autoplay call must be pending before pagehide');
  assert.equal(autoplayPrecondition.paused, true);
  assert.equal(autoplayPrecondition.muted, true);
  await adapter.evaluate(() => {
    const sweep = document.querySelector('#gauge-sweep');
    if (!(sweep instanceof SVGElement)) throw new Error('hero gauge sweep not found');
    sweep.style.setProperty('--sweep', '123');
    window.__interactionAutoplay.beforeSweep = sweep.style.getPropertyValue('--sweep');
    window.dispatchEvent(new Event('pagehide'));
    window.__interactionAutoplay.pauseCallsAfterPagehide = window.__interactionAutoplay.pauseCalls;
    window.__interactionAutoplay.resolvePlay();
  });
  await adapter.until(
    () => window.__interactionAutoplay?.paused === true
      && window.__interactionAutoplay.pauseCalls > window.__interactionAutoplay.pauseCallsAfterPagehide,
    waitOptions('stale initial autoplay teardown'),
  );
  const staleAutoplay = await adapter.evaluate(() => ({
    beforeSweep: window.__interactionAutoplay?.beforeSweep,
    pauseCalls: window.__interactionAutoplay?.pauseCalls,
    pauseCallsAfterPagehide: window.__interactionAutoplay?.pauseCallsAfterPagehide,
    playCalls: window.__interactionAutoplay?.playCalls,
    paused: document.querySelector('#hero-video')?.paused,
    pressed: document.querySelector('#listen-btn')?.getAttribute('aria-pressed'),
    muted: document.querySelector('#hero-video')?.muted,
    db: document.querySelector('#db-value')?.textContent,
    status: document.querySelector('#instrument-status')?.textContent,
    sweep: document.querySelector('#gauge-sweep')?.style.getPropertyValue('--sweep'),
    listening: document.body.classList.contains('is-listening'),
  }));
  assert.equal(Number(staleAutoplay.beforeSweep), 123);
  assert.equal(staleAutoplay.playCalls, 1);
  assert.ok(
    staleAutoplay.pauseCalls > staleAutoplay.pauseCallsAfterPagehide,
    'a stale initial autoplay resolution must pause media again',
  );
  assert.equal(staleAutoplay.paused, true);
  assert.equal(staleAutoplay.pressed, 'false');
  assert.equal(staleAutoplay.muted, true);
  assert.equal(staleAutoplay.db, '--');
  assert.equal(staleAutoplay.status, 'Standby');
  assert.equal(Number(staleAutoplay.sweep), 0);
  assert.equal(staleAutoplay.listening, false);

  await adapter.resize(1100, 800);
  await adapter.navigate('/');
  await adapter.until(
    () => {
      const video = document.querySelector('#hero-video');
      const button = document.querySelector('#listen-btn');
      return video instanceof HTMLVideoElement && video.readyState >= 1 && button instanceof HTMLButtonElement && !button.disabled;
    },
    waitOptions('stalled hero source-switch setup'),
  );
  await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    if (!(video instanceof HTMLVideoElement)) throw new Error('hero video not found');
    const currentSource = video.src;
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.__interactionHeroNativeSetTimeout = nativeSetTimeout;
    window.__interactionHeroSourceFallback = undefined;
    window.__interactionHeroSourceFallbackDelay = undefined;
    window.setTimeout = (handler, delay, ...args) => {
      if (delay === 5000) {
        window.__interactionHeroSourceFallbackDelay = delay;
        window.__interactionHeroSourceFallback = () => handler(...args);
        return 0;
      }
      return nativeSetTimeout(handler, delay, ...args);
    };
    Object.defineProperty(video, 'paused', { configurable: true, get: () => true });
    Object.defineProperty(video, 'src', {
      configurable: true,
      get: () => currentSource,
      set: (value) => { window.__interactionRequestedStalledHeroSource = value; },
    });
    Object.defineProperty(video, 'load', { configurable: true, value: () => {} });
  });
  await adapter.resize(700, 800);
  const stalledSourceChange = await adapter.evaluate(() => {
    const video = document.querySelector('#hero-video');
    const button = document.querySelector('#listen-btn');
    if (!(video instanceof HTMLVideoElement)) throw new Error('hero video not found');
    if (!(button instanceof HTMLButtonElement)) throw new Error('hero Listen button not found');
    const fallback = window.__interactionHeroSourceFallback;
    if (typeof fallback === 'function') fallback();
    button.setAttribute('aria-pressed', 'true');
    video.dispatchEvent(new Event('pause'));
    const result = {
      fallbackDelay: window.__interactionHeroSourceFallbackDelay,
      requestedSource: window.__interactionRequestedStalledHeroSource,
      pressed: button.getAttribute('aria-pressed'),
      muted: video.muted,
    };
    window.setTimeout = window.__interactionHeroNativeSetTimeout;
    delete window.__interactionHeroNativeSetTimeout;
    return result;
  });
  assert.equal(stalledSourceChange.fallbackDelay, 5000, 'a stalled hero source swap must have a bounded fallback');
  assert.match(stalledSourceChange.requestedSource ?? '', /hero-mobile/);
  assert.equal(stalledSourceChange.pressed, 'false', 'the Listen control must recover after a stalled source swap');
  assert.equal(stalledSourceChange.muted, true);

  results.heroMedia = {
    listen: heroListen,
    persistedPagehide,
    sourceSwitchPrecondition,
    mute: heroMute,
    abortedSourceChange,
    pagehideZero,
    rejectedPlay: heroRejected,
    staleResume,
    stalePlay,
    staleAutoplay,
    stalledSourceChange,
  };

  return results;
}
