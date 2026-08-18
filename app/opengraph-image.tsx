import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { person } from '@/components/site-data';

export const alt = `${person.name} — ${person.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: person.role, title: person.tagline });
}
