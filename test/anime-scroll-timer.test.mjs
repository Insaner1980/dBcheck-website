import assert from 'node:assert/strict';
import test from 'node:test';

const loadTimerGuard = async () => {
  try {
    return await import('../src/scripts/anime-scroll-timer.ts');
  } catch {
    assert.fail('anime scroll timer compatibility guard is missing');
  }
};

test('ignores unavailable anime scroll timer internals', async () => {
  const { pauseAnimeScrollDataTimer } = await loadTimerGuard();
  assert.doesNotThrow(() => pauseAnimeScrollDataTimer(undefined));
  assert.doesNotThrow(() => pauseAnimeScrollDataTimer({}));
  assert.doesNotThrow(() => pauseAnimeScrollDataTimer({ dataTimer: {} }));
});

test('pauses a compatible anime scroll data timer', async () => {
  const { pauseAnimeScrollDataTimer } = await loadTimerGuard();
  let pauses = 0;
  const dataTimer = {
    pause() {
      assert.equal(this, dataTimer);
      pauses += 1;
    },
  };

  pauseAnimeScrollDataTimer({ dataTimer });
  assert.equal(pauses, 1);
});
