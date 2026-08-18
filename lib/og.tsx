import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { person } from '@/components/site-data';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

// Read once per server process rather than per request.
const portraitDataUri = (() => {
  const file = readFileSync(join(process.cwd(), 'public', 'images', 'og-portrait.jpg'));
  return `data:image/jpeg;base64,${file.toString('base64')}`;
})();

/**
 * A real 1.91:1 social card. The site used to hand platforms the portrait
 * photo — 2276×2477 — while declaring it as 1200×630, so every card was
 * cropped or rejected.
 */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '64px',
          backgroundColor: '#faf9f7',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitDataUri}
          alt=""
          width={300}
          height={300}
          style={{ borderRadius: '40px', objectFit: 'cover' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#877e71',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: '18px',
              fontSize: 62,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#16130f',
            }}
          >
            {person.name}
          </div>
          <div
            style={{
              marginTop: '18px',
              fontSize: 32,
              lineHeight: 1.3,
              color: '#6b6258',
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '36px' }}>
            <div style={{ height: '8px', width: '64px', backgroundColor: '#d98a5c' }} />
            <div style={{ fontSize: 26, color: '#877e71' }}>mikkeldamm.com</div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
