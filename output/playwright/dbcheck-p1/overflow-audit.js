async page => {
  const base = 'http://127.0.0.1:4322';
  const routes = [
    '/',
    '/articles/',
    '/sounds/',
    '/tools/',
    '/de/artikel/',
    '/de/alltagsgeraeusche/',
    '/de/werkzeuge/',
    '/de/werkzeuge/laermexpositionsrechner/',
    '/de/artikel/laermexpositionsgrenzen-deutschland-eu/',
    '/de/artikel/was-ist-schalldruckpegel/',
  ];
  const widths = [320, 360, 390, 768, 1440];
  const results = [];

  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base + route, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const clientWidth = root.clientWidth;
        const selector = el => {
          if (el.id) return `#${el.id}`;
          const classes = [...el.classList].slice(0, 3).join('.');
          return `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''}`;
        };
        const describe = el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          let owner = el;
          while (owner && !['grid', 'inline-grid', 'flex', 'inline-flex'].includes(getComputedStyle(owner).display)) {
            owner = owner.parentElement;
          }
          let localScroller = el.parentElement;
          while (localScroller && localScroller !== body) {
            const localStyle = getComputedStyle(localScroller);
            if (['auto', 'scroll'].includes(localStyle.overflowX) && localScroller.scrollWidth > localScroller.clientWidth + 1) break;
            localScroller = localScroller.parentElement;
          }
          return {
            selector: selector(el),
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 48),
            rect: {
              left: +rect.left.toFixed(2),
              right: +rect.right.toFixed(2),
              width: +rect.width.toFixed(2),
            },
            computedWidth: style.width,
            minWidth: style.minWidth,
            whiteSpace: style.whiteSpace,
            overflowWrap: style.overflowWrap,
            wordBreak: style.wordBreak,
            display: style.display,
            owner: owner ? {
              selector: selector(owner),
              display: getComputedStyle(owner).display,
              minWidth: getComputedStyle(owner).minWidth,
            } : null,
            localScroller: localScroller && localScroller !== body ? {
              selector: selector(localScroller),
              clientWidth: localScroller.clientWidth,
              scrollWidth: localScroller.scrollWidth,
              overflowX: getComputedStyle(localScroller).overflowX,
            } : null,
          };
        };
        const outside = [...document.querySelectorAll('body *')]
          .filter(el => {
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return style.display !== 'none'
              && style.visibility !== 'hidden'
              && rect.width > 0
              && rect.height > 0
              && (rect.right > clientWidth + 0.5 || rect.left < -0.5);
          })
          .sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right);

        return {
          clientWidth,
          documentScrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          rightmost: outside[0] ? describe(outside[0]) : null,
        };
      });
      results.push({ route, width, ...metrics });
    }
  }

  return results;
}
