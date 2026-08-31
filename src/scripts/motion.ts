/**
 * Sivuston yhteinen mittariliike. Kaikki numeroiden ja tilamerkintöjen
 * scramble-vaihdot kulkevat tämän moduulin kautta, jotta ajoitus, merkistö ja
 * prefers-reduced-motion -käsittely määritellään vain kerran.
 *
 * anime.js ladataan dynaamisesti vasta ensimmäisestä oikeasta arvonvaihdosta,
 * jotta työkalusivut eivät maksa kirjaston kokoa ennen vuorovaikutusta.
 */

export interface ScrambleProfile {
  chars: string;
  revealRate: number;
  settleDuration: number;
}

/** Kertaluonteiset numeeriset siirtymät; ei jatkuville syötteille tai liukusäätimille. */
export const SCRAMBLE_DIGITS: ScrambleProfile = { chars: 'numbers', revealRate: 90, settleDuration: 160 };

/** Tilamerkinnät (STANDBY, ELEVATED, CALIBRATING). */
export const SCRAMBLE_LABEL: ScrambleProfile = { chars: 'uppercase', revealRate: 60, settleDuration: 150 };

/** Kalibrointi ja muut kertaluonteiset esittelyhetket saavat olla hitaampia. */
export const SCRAMBLE_CALIBRATION: ScrambleProfile = { chars: 'numbers', revealRate: 14, settleDuration: 420 };

type ScrambleEngine = typeof import('./scramble-engine');

let engine: Promise<ScrambleEngine> | null = null;
let loadedEngine: ScrambleEngine | null = null;
const loadEngine = () => (engine ??= import('./scramble-engine').then((module) => {
  loadedEngine = module;
  return module;
}));

/** Viimeisin pyydetty arvo elementtiä kohti, jottei myöhässä latautuva animaatio palaa vanhaan lukemaan. */
const requested = new WeakMap<HTMLElement, symbol>();
type ActiveScramble = { request: symbol; text: string; onComplete: () => void };
const activeScrambles = new Map<HTMLElement, ActiveScramble>();
let reducedMotionQuery: MediaQueryList | null = null;

function finishScramble(element: HTMLElement, active: ActiveScramble, stop = true): void {
  if (activeScrambles.get(element) !== active) return;
  activeScrambles.delete(element);
  requested.set(element, Symbol());
  if (stop) loadedEngine?.stopScramble(element);
  element.textContent = active.text;
  active.onComplete();
}

function getReducedMotionQuery(): MediaQueryList {
  if (reducedMotionQuery) return reducedMotionQuery;
  reducedMotionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotionQuery.addEventListener('change', ({ matches }) => {
    if (!matches) return;
    for (const [element, active] of activeScrambles) finishScramble(element, active);
  });
  return reducedMotionQuery;
}

export const prefersReducedMotion = (): boolean => getReducedMotionQuery().matches;

export function cancelScramble(element: HTMLElement): void {
  requested.set(element, Symbol());
  activeScrambles.delete(element);
  loadedEngine?.stopScramble(element);
}

function scramble(element: HTMLElement, text: string, profile: ScrambleProfile, onComplete: () => void = () => {}) {
  const request = Symbol();
  const active = { request, text, onComplete };
  requested.set(element, request);
  activeScrambles.set(element, active);
  loadedEngine?.stopScramble(element);
  void loadEngine()
    .then(({ runScramble }) => {
      if (requested.get(element) !== request) return;
      if (prefersReducedMotion()) {
        finishScramble(element, active);
        return;
      }
      runScramble(element, text, profile, () => finishScramble(element, active, false));
    })
    .catch(() => {
      if (requested.get(element) !== request) return;
      // Jos kirjasto ei lataudu, lukema jää näkyviin ilman liikettä.
      finishScramble(element, active, false);
    });
}

/**
 * Vaihtaa elementin tekstin scramble-liikkeellä.
 * Käytä vain elementteihin, jotka eivät ole aria-live-alueen sisällä.
 */
export function scrambleValue(element: HTMLElement, text: string, profile: ScrambleProfile = SCRAMBLE_DIGITS): void {
  cancelScramble(element);
  element.textContent = text;
  if (prefersReducedMotion()) return;
  scramble(element, text, profile);
}

const ghosts = new WeakMap<HTMLElement, HTMLElement>();
const readingVersions = new WeakMap<HTMLElement, number>();
const readingOpacity = new WeakMap<HTMLElement, string>();

function resetReading(element: HTMLElement): number {
  const version = (readingVersions.get(element) ?? 0) + 1;
  readingVersions.set(element, version);

  const activeGhost = ghosts.get(element);
  if (activeGhost) {
    cancelScramble(activeGhost);
    activeGhost.hidden = true;
  }
  const activeOpacity = readingOpacity.get(element);
  if (activeOpacity !== undefined) {
    element.style.opacity = activeOpacity;
    readingOpacity.delete(element);
  }
  return version;
}

export function setReadingValue(element: HTMLElement, text: string): void {
  resetReading(element);
  element.textContent = text;
}

/** Luo elementistä tyylillisesti identtisen, ruudunlukijalta piilotetun kopion animointia varten. */
function ghostFor(element: HTMLElement): HTMLElement {
  let ghost = ghosts.get(element);
  if (!ghost) {
    ghost = element.cloneNode(false) as HTMLElement;
    ghost.removeAttribute('id');
    ghost.setAttribute('aria-hidden', 'true');
    ghost.style.position = 'absolute';
    ghost.style.pointerEvents = 'none';
    ghosts.set(element, ghost);
  }
  return ghost;
}

/**
 * Päivittää lukeman heti saavutettavuuspuuhun ja ajaa scramblen erillisessä
 * aria-hidden-kerroksessa. Näin aria-live-alue ilmoittaa vain lopullisen arvon
 * eikä lue välitiloja ääneen.
 */
export function scrambleReading(element: HTMLElement, text: string, profile: ScrambleProfile = SCRAMBLE_DIGITS): void {
  const previous = element.textContent ?? '';
  const version = resetReading(element);
  element.textContent = text;

  const host = element.parentElement;
  if (!host || !previous || previous === text || prefersReducedMotion()) return;

  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';

  const ghost = ghostFor(element);
  ghost.textContent = previous;
  ghost.hidden = false;
  ghost.style.left = `${element.offsetLeft}px`;
  ghost.style.top = `${element.offsetTop}px`;
  ghost.style.width = `${element.offsetWidth}px`;
  host.append(ghost);
  const previousOpacity = element.style.opacity;
  readingOpacity.set(element, previousOpacity);
  element.style.opacity = '0';

  scramble(ghost, text, profile, () => {
    if (readingVersions.get(element) !== version) return;
    ghost.hidden = true;
    element.style.opacity = readingOpacity.get(element) ?? previousOpacity;
    readingOpacity.delete(element);
  });
}
