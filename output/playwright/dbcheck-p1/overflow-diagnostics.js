async page => {
  const cases = [
    { route: '/de/werkzeuge/laermexpositionsrechner/', width: 320 },
    { route: '/de/artikel/was-ist-schalldruckpegel/', width: 320 },
  ];
  const selectors = [
    'main',
    'main > :first-child',
    '.page-head',
    '.page-head > *',
    '.tool-grid',
    '.tool-grid > li',
    '.tool-card',
    '.tool-card > *',
    '.tool-calculator',
    '.tool-calculator > *',
    '.calculator-form',
    '.calculator-form > *',
    '.entry-list',
    '.entry-row',
    '.entry-row > *',
    '.sounds-overview',
    '.overview-scroll',
    '.overview-scroll img',
    '.editorial',
    '.editorial-head',
    '.editorial-head > *',
    '.prose',
    '.prose table',
    '.prose thead',
    '.prose .katex-display',
    '.prose .katex-display .katex',
    '.prose .katex-display .katex-mathml',
    '.prose .katex-display semantics',
    '.related',
    '.related ul',
    '.related li',
    '.related a',
    '.related a > *',
    '.article-cta',
    '.article-cta > *',
  ];
  const results = [];
  for (const item of cases) {
    await page.setViewportSize({ width: item.width, height: 1000 });
    await page.goto(`http://127.0.0.1:4322${item.route}`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    results.push(await page.evaluate(({ item, selectors }) => {
      const describe = (el, selector) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const parent = el.parentElement;
        const parentStyle = parent ? getComputedStyle(parent) : null;
        return {
          selector,
          tag: el.tagName.toLowerCase(),
          class: el.className?.baseVal ?? el.className ?? '',
          text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70),
          rect: { left: +rect.left.toFixed(2), right: +rect.right.toFixed(2), width: +rect.width.toFixed(2) },
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          computedWidth: style.width,
          minWidth: style.minWidth,
          maxWidth: style.maxWidth,
          whiteSpace: style.whiteSpace,
          overflowWrap: style.overflowWrap,
          wordBreak: style.wordBreak,
          overflowX: style.overflowX,
          display: style.display,
          position: style.position,
          parent: parent ? {
            tag: parent.tagName.toLowerCase(),
            class: parent.className?.baseVal ?? parent.className ?? '',
            display: parentStyle.display,
            minWidth: parentStyle.minWidth,
            overflowX: parentStyle.overflowX,
          } : null,
        };
      };
      const elements = [];
      for (const selector of selectors) {
        for (const el of document.querySelectorAll(selector)) elements.push(describe(el, selector));
      }
      const outside = [...document.querySelectorAll('body *')]
        .filter(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && rect.right > document.documentElement.clientWidth + 0.5;
        })
        .sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right)
        .slice(0, 20)
        .map(el => describe(el, 'outside'));
      return {
        ...item,
        clientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        elements,
        outside,
      };
    }, { item, selectors }));
  }
  return results;
}
