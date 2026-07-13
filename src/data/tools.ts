export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  category: 'calculator' | 'explorer';
  order: number;
  searchTags: string[];
}

export const tools: ToolDefinition[] = [
  {
    id: 'safe-exposure-time',
    title: 'Safe Exposure Time Calculator',
    description: 'Estimate the time to a 100% NIOSH daily occupational dose using the 85 dBA / 8 hour / 3 dB model.',
    href: '/tools/safe-listening-time-calculator/',
    actionLabel: 'Open calculator',
    category: 'calculator',
    order: 1,
    searchTags: ['calculator', 'niosh', 'exposure', 'time', '85 dba'],
  },
  {
    id: 'noise-dose',
    title: 'Noise Dose Calculator',
    description: 'Combine multiple sound-level and duration periods into one estimated daily occupational noise dose.',
    href: '/tools/noise-dose-calculator/',
    actionLabel: 'Calculate dose',
    category: 'calculator',
    order: 2,
    searchTags: ['calculator', 'noise dose', 'multiple exposures', 'duration'],
  },
  {
    id: 'common-sounds',
    title: 'Common Sounds Explorer',
    description: 'Compare typical decibel ranges for everyday sounds and open detailed sound guides.',
    href: '/sounds/',
    actionLabel: 'Explore sounds',
    category: 'explorer',
    order: 3,
    searchTags: ['sound library', 'common sounds', 'decibels', 'comparison'],
  },
  {
    id: 'decibel-distance',
    title: 'Decibel Distance Calculator',
    description: 'Estimate how sound level may change as distance from a source increases under simplified free-field conditions.',
    href: '/tools/decibel-distance/',
    actionLabel: 'Estimate level',
    category: 'calculator',
    order: 4,
    searchTags: ['calculator', 'distance', 'free field', 'sound level'],
  },
  {
    id: 'add-decibels',
    title: 'Add Decibels Calculator',
    description: 'Combine independent sound levels correctly using logarithmic addition instead of ordinary arithmetic.',
    href: '/tools/add-decibels/',
    actionLabel: 'Combine levels',
    category: 'calculator',
    order: 5,
    searchTags: ['calculator', 'add decibels', 'logarithmic addition', 'sound levels'],
  },
];
