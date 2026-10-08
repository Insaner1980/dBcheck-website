import { animate, onScroll } from 'animejs';
import { DISPLAY_MAX_DB, levelForDb, scalePercent } from '../lib/display-scale';
import { pauseAnimeScrollDataTimer } from './anime-scroll-timer';

export function startExposureRail(rail: HTMLElement, section: HTMLElement, valueElement: HTMLElement) {
  const reading = { db: 0 };
  let level = '';
  const render = () => {
    rail.style.setProperty('--rail-progress', `${scalePercent(reading.db)}%`);
    valueElement.textContent = String(Math.round(reading.db));
    const nextLevel = levelForDb(reading.db);
    if (nextLevel === level) return;
    rail.dataset.level = nextLevel;
    level = nextLevel;
  };

  render();
  const observer = onScroll({
    target: section,
    enter: 'bottom top',
    leave: 'top bottom',
    sync: 1,
    // The rail never reads velocity; stop anime.js's unbounded velocity timer after each update.
    onUpdate: (observer) => pauseAnimeScrollDataTimer(observer.container),
  });
  const animation = animate(reading, {
    db: DISPLAY_MAX_DB,
    ease: 'linear',
    onUpdate: render,
    autoplay: observer,
  });

  return () => {
    animation.revert();
    observer.revert();
    reading.db = 0;
    render();
  };
}
