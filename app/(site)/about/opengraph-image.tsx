import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'About Mikkel Damm Vind';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'About',
    title: '18+ years building things that work well and look good.',
  });
}
