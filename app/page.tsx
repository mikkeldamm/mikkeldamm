import { person, experience, products } from '@/components/site-data';
import { ContactSection } from '@/components/ContactSection';
import { ArrowUpRight } from '@/components/icons';

export const dynamic = 'force-static';

/** A subdued uppercase label that opens a group within a section. */
function GroupLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-[0.7rem] font-medium uppercase tracking-[0.18em] text-faint ${className}`}>
      {children}
    </h3>
  );
}

/** Title that links out (with a trailing arrow) or renders plain. */
function WorkTitle({ name, url, current }: { name: string; url?: string; current?: boolean }) {
  const dot = current ? (
    <span
      className="ml-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-peach-deep align-middle"
      aria-label="current"
    />
  ) : null;

  if (!url) {
    return (
      <h4 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
        {name}
        {dot}
      </h4>
    );
  }

  return (
    <h4 className="text-xl font-semibold tracking-tight md:text-2xl">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1 text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-peach-deep"
      >
        {name}
        <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-peach-deep" />
      </a>
      {dot}
    </h4>
  );
}

export default function Page() {
  // Two-tone the hero: the opener stays ink, the rest goes muted.
  const split = person.statement.indexOf(' — ');
  const head = person.statement.slice(0, split);
  const tail = person.statement.slice(split + 3);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 md:px-8">
      {/* Hero statement */}
      <section className="pb-16 pt-8 md:pb-24 md:pt-14">
        <h1 className="max-w-3xl text-mega font-medium leading-[1.14] tracking-[-0.015em] text-balance">
          <span className="text-ink">{head} — </span>
          <span className="text-muted">{tail}</span>
        </h1>
      </section>

      {/* Experience + own products */}
      <section className="border-t border-line pt-10 md:pt-12">
        <GroupLabel>Experience</GroupLabel>
        <ol className="mt-6">
          {experience.map((job) => (
            <li key={job.company + job.period} className="border-t border-line py-7 first:border-t-0 md:py-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <WorkTitle name={job.company} url={job.url} current={job.current} />
                <span className="font-mono text-sm tabular-nums text-faint">{job.period}</span>
              </div>
              <p className="mt-1 text-base font-medium text-peach-deep">{job.role}</p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-[1.05rem]">{job.blurb}</p>
            </li>
          ))}
        </ol>

        <GroupLabel className="mt-14">Own products</GroupLabel>
        <ul className="mt-6">
          {products.map((product) => (
            <li key={product.name} className="border-t border-line py-7 first:border-t-0 md:py-8">
              <WorkTitle name={product.name} url={product.url} />
              <p className="mt-1 text-base font-medium text-peach-deep">{product.tagline}</p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-[1.05rem]">{product.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-faint"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 md:mt-20">
        <ContactSection />
      </div>
    </main>
  );
}
