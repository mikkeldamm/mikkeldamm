import { links } from './site-data';

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-2xl px-6 pb-16 pt-12">
      <div className="border-t border-line pt-8">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-base font-medium">
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
        <p className="mt-6 text-sm text-faint">© {new Date().getFullYear()} Mikkel Damm Vind</p>
      </div>
    </footer>
  );
}
