type AnimeScrollContainer = {
  dataTimer?: unknown;
};

export const pauseAnimeScrollDataTimer = (container: AnimeScrollContainer | undefined): void => {
  const timer = container?.dataTimer;
  if (!timer || typeof timer !== 'object') return;
  const pause = Reflect.get(timer, 'pause');
  if (typeof pause === 'function') Reflect.apply(pause, timer, []);
};
