import { links, person } from './site-data';

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-4xl px-6 pb-16 pt-12 md:px-8">
      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-base text-ink">© {new Date().getFullYear()} {person.name}.</p>
          <p className="mt-1 text-sm text-faint">
            Design, code, and the occasional photo from {person.location}.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
