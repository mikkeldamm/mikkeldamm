import type { Metadata } from 'next';
import Image from 'next/image';
import { person, intro, whatIDo } from '@/components/site-data';
import { ArrowUpRight } from '@/components/icons';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About — Mikkel Damm Vind',
  description: person.statement,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 md:px-8">
      {/* Intro */}
      <section className="pb-14 pt-8 md:pt-14">
        <p className="text-lg text-faint md:text-xl">About</p>
        <div className="mt-8 grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          <Image
            src="/images/mikkeldamm.jpg"
            alt="Mikkel Damm Vind"
            width={120}
            height={120}
            className="h-28 w-28 rounded-2xl object-cover grayscale md:h-32 md:w-32"
            priority
          />
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted [&_strong]:font-semibold [&_strong]:text-ink">
            {intro.map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: emphasize(paragraph) }} />
            ))}
          </div>
        </div>
      </section>

      {/* What I do */}
      <section className="border-t border-line pt-10 md:pt-12">
        <p className="text-lg text-faint md:text-xl">What I do</p>
        <ul className="mt-8">
          {whatIDo.map((item) => (
            <li
              key={item}
              className="border-t border-line py-4 text-lg text-ink first:border-t-0 md:text-xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Say hello */}
      <section className="mt-16 border-t border-line pt-10 md:mt-20 md:pt-12">
        <p className="max-w-2xl text-balance text-xl leading-snug text-ink md:text-2xl">
          Working on something I could help with? I&rsquo;d love to hear about it.
        </p>
        <a
          href={`mailto:${person.email}`}
          className="group mt-6 inline-flex items-center gap-1.5 text-base font-medium text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-peach-deep md:text-lg"
        >
          {person.email}
          <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-peach-deep" />
        </a>
      </section>
    </main>
  );
}

/** Wrap a few key phrases in <strong> for rhythm. */
function emphasize(text: string): string {
  const phrases = ['16+ years', 'work well and look good'];
  let out = text;
  for (const phrase of phrases) {
    out = out.replace(phrase, `<strong>${phrase}</strong>`);
  }
  return out;
}
