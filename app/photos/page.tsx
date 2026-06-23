import type { Metadata } from 'next';
import Image from 'next/image';
import { photos } from '@/components/site-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Photos — Mikkel Damm Vind',
  description: 'A few frames worth keeping.',
  alternates: { canonical: '/photos' },
};

export default function PhotosPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-10 pt-8 md:px-8 md:pt-14">
      <header className="mb-12">
        <p className="text-lg text-faint md:text-xl">Photos</p>
        <h1 className="mt-6 max-w-2xl text-mega font-medium leading-[1.14] tracking-[-0.015em] text-balance">
          A few frames worth keeping<span className="text-muted"> — moments, light, and places from in and around Copenhagen.</span>
        </h1>
      </header>

      {photos.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo) => (
            <li
              key={photo.src}
              className="overflow-hidden rounded-lg bg-line"
              style={{ aspectRatio: photo.ratio ?? '3/2' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-lg border border-dashed border-line bg-line/40 text-xs text-faint"
              style={{ aspectRatio: i % 4 === 0 ? '4/5' : '3/2' }}
            >
              <span className="select-none">Coming soon</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
