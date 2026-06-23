import Image from 'next/image';
import Logo from '@/components/Logo';
import { person, intro, experience, products } from '@/components/site-data';

export const dynamic = 'force-static';

/** A section with a small margin label on wide screens, stacked on mobile. */
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-3 border-t border-line pt-10 md:grid-cols-[8rem_1fr] md:gap-10">
      <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-faint md:pt-1.5">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-10 pt-10 md:pt-16">
      {/* Hero */}
      <header className="mb-20">
        <Logo id="site-logo" className="mb-9 h-20 w-auto md:h-24" />
        <h1 className="text-mega font-extrabold leading-[1.02] tracking-[-0.03em] text-balance">
          {person.name}
          <span className="text-peach-deep">.</span>
        </h1>
        <p className="mt-4 text-xl text-muted md:text-2xl">
          {person.role} — <span className="text-ink">{person.tagline}</span>
        </p>
        <p className="mt-1 text-base text-faint">{person.location}</p>
      </header>

      <div className="flex flex-col gap-14">
        {/* Intro / about */}
        <Section label="Hello">
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted [&_strong]:font-semibold [&_strong]:text-ink">
            {intro.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: emphasize(p) }} />
            ))}
          </div>
          <div className="mt-7 flex items-center gap-4">
            <Image
              src="/images/mikkeldamm.jpg"
              alt="Mikkel Damm Vind"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover grayscale"
              priority
            />
            <a
              href={`mailto:${person.email}`}
              className="group text-base font-medium text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-peach-deep"
            >
              Say hello
              <span className="text-peach-deep transition-transform group-hover:translate-x-0.5"> →</span>
            </a>
          </div>
        </Section>

        {/* Selected work */}
        <Section label="Work">
          <ol className="flex flex-col gap-9">
            {experience.map((job) => (
              <li key={job.company + job.period}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-xl font-bold tracking-tight">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-peach-deep"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    {job.current && (
                      <span className="ml-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-peach-deep align-middle" aria-label="current" />
                    )}
                  </h3>
                  <span className="font-mono text-sm tabular-nums text-faint">{job.period}</span>
                </div>
                <p className="text-base font-medium text-peach-deep">{job.role}</p>
                <p className="mt-2 text-base leading-relaxed text-muted">{job.blurb}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Own products */}
        <Section label="Projects">
          <ul className="flex flex-col gap-4">
            {products.map((p) => (
              <li key={p.name} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="shrink-0 font-semibold text-ink">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-peach-deep"
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </span>
                <span className="text-base text-muted">{p.blurb}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  );
}

/** Wrap the first occurrence of a few key phrases in <strong> for rhythm. */
function emphasize(text: string): string {
  const phrases = ['16+ years', 'work well and look good'];
  let out = text;
  for (const phrase of phrases) {
    out = out.replace(phrase, `<strong>${phrase}</strong>`);
  }
  return out;
}
