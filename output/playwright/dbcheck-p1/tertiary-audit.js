async page => {
  const cases = [
    { route: '/', width: 1440 },
    { route: '/', width: 390 },
    { route: '/articles/', width: 1440 },
    { route: '/sounds/', width: 1440 },
    { route: '/sounds/', width: 390 },
    { route: '/tools/', width: 1440 },
    { route: '/articles/what-is-a-decibel/', width: 1440 },
    { route: '/sounds/concert/', width: 1440 },
    { route: '/tools/safe-listening-time-calculator/', width: 1440 },
    { route: '/de/artikel/', width: 1440 },
    { route: '/de/alltagsgeraeusche/', width: 390 },
    { route: '/de/werkzeuge/expositionsdauer-rechner/', width: 1440 },
  ];
  const results = [];
  const base = 'http://127.0.0.1:4322';

  for (const item of cases) {
    await page.setViewportSize({ width: item.width, height: 1000 });
    await page.goto(base + item.route, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    if (item.route === '/' || item.route === '/de/artikel/') {
      await page.locator('#search-open').click();
      await page.locator('#search-input').fill(item.route === '/' ? 'sound' : 'Lärm');
    }
    const uses = await page.evaluate(() => {
      const selector = el => {
        if (el.id) return `#${el.id}`;
        const classes = [...el.classList].slice(0, 3).join('.');
        return `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''}`;
      };
      const surface = el => {
        let current = el;
        const lineage = [];
        while (current) {
          const style = getComputedStyle(current);
          if (style.backgroundImage !== 'none' || style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            lineage.push({ selector: selector(current), color: style.backgroundColor, image: style.backgroundImage });
          }
          current = current.parentElement;
        }
        return lineage.slice(0, 3);
      };
      return [...document.querySelectorAll('body *')]
        .filter(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.color === 'rgb(94, 94, 94)'
            && style.display !== 'none'
            && style.visibility !== 'hidden'
            && rect.width > 0
            && rect.height > 0;
        })
        .map(el => {
          const style = getComputedStyle(el);
          return {
            selector: selector(el),
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 72),
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            ariaHidden: el.getAttribute('aria-hidden'),
            disabled: 'disabled' in el ? el.disabled : false,
            interactive: el.matches('a, button, input, summary'),
            surface: surface(el),
          };
        });
    });
    results.push({ ...item, uses });
    if (await page.locator('#search-overlay[open]').count()) await page.locator('#search-close').click();
  }
  return results;
}
