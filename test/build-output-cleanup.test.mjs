import assert from 'node:assert/strict';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { runBuild } from '../scripts/build.mjs';
import { assertFreshBuild, freshnessMarkerPath, hashBuildInputs } from '../scripts/build-freshness.mjs';

const exists = async (path) => access(path).then(() => true, () => false);

const createFixture = async () => {
  const root = await mkdtemp(join(tmpdir(), 'dbcheck-build-cleanup-'));
  await mkdir(join(root, 'src'), { recursive: true });
  await mkdir(join(root, 'public'), { recursive: true });
  await mkdir(join(root, 'scripts'), { recursive: true });
  await writeFile(join(root, 'src', 'page.astro'), '<h1>Fixture</h1>');
  await writeFile(join(root, 'public', 'asset.txt'), 'asset');
  await writeFile(join(root, 'scripts', 'build.mjs'), 'fixture build helper');
  await writeFile(join(root, 'scripts', 'build-freshness.mjs'), 'fixture freshness helper');
  return root;
};

const writeOutput = async (root, value = '<h1>Built</h1>') => {
  await mkdir(join(root, 'dist'), { recursive: true });
  await writeFile(join(root, 'dist', 'index.html'), value);
};

test('forces content sync, removes stale output before checking, and cleans a check failure', async () => {
  const root = await createFixture();
  const dist = join(root, 'dist');
  const marker = freshnessMarkerPath(root);
  const steps = [];
  try {
    await mkdir(dist);
    await writeFile(join(dist, 'stale-marker'), 'old');
    await mkdir(join(root, '.astro'));
    await writeFile(marker, 'stale marker');
    await assert.rejects(
      runBuild({
        root,
        runStep: async (step, _root, flags = []) => {
          steps.push([step, flags]);
          assert.equal(await exists(join(dist, 'stale-marker')), false);
          assert.equal(await exists(marker), false);
          if (step === 'sync') return;
          throw new Error('intentional schema failure');
        },
      }),
      /intentional schema failure/,
    );
    assert.deepEqual(steps, [['sync', ['--force']], ['check', []]]);
    assert.equal(await exists(dist), false);
    assert.equal(await exists(marker), false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('removes partial output after a build failure', async () => {
  const root = await createFixture();
  const dist = join(root, 'dist');
  const marker = freshnessMarkerPath(root);
  const steps = [];
  try {
    await assert.rejects(
      runBuild({
        root,
        runStep: async (step, _root, flags = []) => {
          steps.push([step, flags]);
          if (step !== 'build') return;
          await mkdir(dist);
          await writeFile(join(dist, 'partial-marker'), 'partial');
          throw new Error('intentional render failure');
        },
      }),
      /intentional render failure/,
    );
    assert.deepEqual(steps, [['sync', ['--force']], ['check', []], ['build', []]]);
    assert.equal(await exists(dist), false);
    assert.equal(await exists(marker), false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('writes a valid freshness marker only after a successful build', async () => {
  const root = await createFixture();
  const steps = [];
  try {
    await runBuild({
      root,
      runStep: async (step, _root, flags = []) => {
        steps.push([step, flags]);
        if (step === 'build') await writeOutput(root);
      },
    });

    assert.deepEqual(steps, [['sync', ['--force']], ['check', []], ['build', []]]);
    await assert.doesNotReject(assertFreshBuild({ root }));
    const marker = JSON.parse(await readFile(freshnessMarkerPath(root), 'utf8'));
    assert.equal(marker.version, 1);
    assert.equal(marker.nodeVersion, process.version);
    assert.equal(marker.year, new Date().getFullYear());
    assert.match(marker.inputHash, /^[a-f0-9]{64}$/);
    assert.match(marker.outputHash, /^[a-f0-9]{64}$/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('restarts the build with one captured year when the calendar year changes', async () => {
  const root = await createFixture();
  const steps = [];
  let year = 2026;
  let buildCount = 0;
  try {
    await runBuild({
      root,
      currentYear: () => year,
      runStep: async (step, _root, flags = []) => {
        steps.push([step, flags]);
        if (step !== 'build') return;
        buildCount += 1;
        await writeOutput(root, `<h1>Build ${buildCount}</h1>`);
        if (buildCount === 1) year = 2027;
      },
    });

    assert.equal(buildCount, 2);
    assert.deepEqual(steps, [
      ['sync', ['--force']], ['check', []], ['build', []],
      ['sync', ['--force']], ['check', []], ['build', []],
    ]);
    const marker = JSON.parse(await readFile(freshnessMarkerPath(root), 'utf8'));
    assert.equal(marker.year, 2027);
    assert.equal(marker.inputHash, await hashBuildInputs(root, 2027));
    assert.equal(await readFile(join(root, 'dist', 'index.html'), 'utf8'), '<h1>Build 2</h1>');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('rejects and removes output when a build input changes during the build', async () => {
  const root = await createFixture();
  const marker = freshnessMarkerPath(root);
  try {
    await assert.rejects(
      runBuild({
        root,
        runStep: async (step) => {
          if (step !== 'build') return;
          await writeOutput(root);
          await writeFile(join(root, 'src', 'page.astro'), '<h1>Changed during build</h1>');
        },
      }),
      /Build inputs changed while Astro was building/,
    );
    assert.equal(await exists(join(root, 'dist')), false);
    assert.equal(await exists(marker), false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('freshness validation rejects source and dist mutations after a successful build', async () => {
  const root = await createFixture();
  try {
    await runBuild({
      root,
      runStep: async (step) => {
        if (step === 'build') await writeOutput(root);
      },
    });
    await assertFreshBuild({ root });
    await writeFile(join(root, 'src', 'page.astro'), '<h1>Changed after build</h1>');
    await assert.rejects(assertFreshBuild({ root }), /Build inputs changed after dist was generated/);
    await writeFile(join(root, 'src', 'page.astro'), '<h1>Fixture</h1>');
    await assertFreshBuild({ root });
    await writeFile(join(root, 'dist', 'index.html'), '<h1>Mutated</h1>');
    await assert.rejects(assertFreshBuild({ root }), /dist changed after its freshness marker was written/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
