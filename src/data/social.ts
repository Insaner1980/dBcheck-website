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

export function socialImageForEditorial(kind: 'article' | 'sound', contentCluster: string): SocialImage {
  if (kind === 'sound') return socialImages.sounds;

  switch (contentCluster) {
    case 'Decibel fundamentals':
      return socialImages.fundamentals;
    case 'Smartphone sound measurement':
      return socialImages.measurement;
    case 'Noise exposure and hearing risk':
      return socialImages.exposure;
    default:
      return socialImages.app;
  }
}
