import { animate, scrambleText, utils } from 'animejs';

import type { ScrambleProfile } from './motion';

/**
 * anime.js:ää käyttävä osa scramble-liikkeestä, omassa moduulissaan.
 * Nimetyt tuonnit pitävät tree-shakingin toimivana: dynaaminen `import('animejs')`
 * vetäisi mukaan koko kirjaston, tämä vain animaatioytimen ja text-moduulin.
 */
export function runScramble(
  element: HTMLElement,
  text: string,
  profile: ScrambleProfile,
  onComplete: () => void,
): void {
  utils.remove(element);
  animate(element, { innerHTML: scrambleText({ text, ...profile }), onComplete });
}
