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

/** Mittarilukemat. Nopea, koska arvo voi päivittyä joka näppäinpainalluksella. */
export const SCRAMBLE_DIGITS: ScrambleProfile = { chars: 'numbers', revealRate: 90, settleDuration: 160 };

/** Tilamerkinnät (STANDBY, ELEVATED, CALIBRATING). */
export const SCRAMBLE_LABEL: ScrambleProfile = { chars: 'uppercase', revealRate: 60, settleDuration: 150 };

/** Kalibrointi ja muut kertaluonteiset esittelyhetket saavat olla hitaampia. */
export const SCRAMBLE_CALIBRATION: ScrambleProfile = { chars: 'numbers', revealRate: 14, settleDuration: 420 };

export const prefersReducedMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;

let engine: Promise<typeof import('./scramble-engine')> | null = null;
const loadEngine = () => (engine ??= import('./scramble-engine'));

/** Viimeisin pyydetty arvo elementtiä kohti, jottei myöhässä latautuva animaatio palaa vanhaan lukemaan. */
const requested = new WeakMap<HTMLElement, string>();

function scramble(element: HTMLElement, text: string, profile: ScrambleProfile, onComplete: () => void = () => {}) {
  requested.set(element, text);
  void loadEngine()
    .then(({ runScramble }) => {
      if (requested.get(element) !== text) return;
      runScramble(element, text, profile, onComplete);
    })
    .catch(() => {
      // Jos kirjasto ei lataudu, lukema jää näkyviin ilman liikettä.
      element.textContent = text;
      onComplete();
    });
}

/**
 * Vaihtaa elementin tekstin scramble-liikkeellä.
 * Käytä vain elementteihin, jotka eivät ole aria-live-alueen sisällä.
 */
export function scrambleValue(element: HTMLElement, text: string, profile: ScrambleProfile = SCRAMBLE_DIGITS): void {
  element.textContent = text;
  if (prefersReducedMotion()) return;
  scramble(element, text, profile);
}

const ghosts = new WeakMap<HTMLElement, HTMLElement>();

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
  element.style.visibility = 'hidden';

  scramble(ghost, text, profile, () => {
    ghost.hidden = true;
    element.style.visibility = '';
  });
}
