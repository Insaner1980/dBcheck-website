import type { Locale } from '../i18n/config';

export interface SocialImage {
  src: string;
  alt: Record<Locale, string>;
}

export const socialImages = {
  app: {
    src: '/images/og/dbcheck-app.webp',
    alt: {
      en: 'dBcheck Android sound awareness app interface',
      de: 'Benutzeroberfläche der dBcheck-Android-App zur Geräuschwahrnehmung',
    },
  },
  fundamentals: {
    src: '/images/og/decibel-guides.webp',
    alt: {
      en: 'dBcheck guide about understanding decibels',
      de: 'dBcheck-Leitfaden zum Verständnis von Dezibelwerten',
    },
  },
  measurement: {
    src: '/images/og/phone-measurement.webp',
    alt: {
      en: 'dBcheck guide about phone sound measurement',
      de: 'dBcheck-Leitfaden zur Schallmessung mit dem Smartphone',
    },
  },
  exposure: {
    src: '/images/og/noise-exposure.webp',
    alt: {
      en: 'dBcheck guide about noise exposure',
      de: 'dBcheck-Leitfaden zur Lärmbelastung',
    },
  },
  sounds: {
    src: '/images/og/common-sounds.webp',
    alt: {
      en: 'dBcheck Common Sounds Explorer interface',
      de: 'Oberfläche des dBcheck-Alltagsgeräusche-Explorers',
    },
  },
} satisfies Record<string, SocialImage>;

export function socialImageForEditorial(kind: 'article' | 'sound', clusterKey: string): SocialImage {
  if (kind === 'sound') return socialImages.sounds;

  switch (clusterKey) {
    case 'fundamentals':
      return socialImages.fundamentals;
    case 'smartphone':
      return socialImages.measurement;
    case 'exposure':
      return socialImages.exposure;
    default:
      return socialImages.app;
  }
}
