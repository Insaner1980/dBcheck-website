export interface SocialImage {
  src: string;
  alt: string;
}

export const socialImages = {
  app: {
    src: '/images/og/dbcheck-app.webp',
    alt: 'dBcheck Android sound awareness app interface',
  },
  fundamentals: {
    src: '/images/og/decibel-guides.webp',
    alt: 'dBcheck guide about understanding decibels',
  },
  measurement: {
    src: '/images/og/phone-measurement.webp',
    alt: 'dBcheck guide about phone sound measurement',
  },
  exposure: {
    src: '/images/og/noise-exposure.webp',
    alt: 'dBcheck guide about noise exposure',
  },
  sounds: {
    src: '/images/og/common-sounds.webp',
    alt: 'dBcheck Common Sounds Explorer interface',
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
