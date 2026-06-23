'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const pages = [
  { label: 'Home', href: '/' },
  { label: 'Photos', href: '/photos' },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-6">
      <Link
        href="/"
        className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-ink"
        aria-label="Mikkel Damm Vind — home"
      >
        <Logo className="h-7 w-auto transition-transform group-hover:-translate-y-px" aria-hidden />
        <span className="hidden sm:inline">Mikkel Damm Vind</span>
      </Link>
      <nav className="flex items-center gap-6 text-base font-medium">
        {pages.map((p) => {
          const active = p.href === '/' ? pathname === '/' : pathname.startsWith(p.href);
          return (
            <Link
              key={p.href}
              href={p.href}
              aria-current={active ? 'page' : undefined}
              className={
                active
                  ? 'text-ink underline decoration-peach-deep decoration-2 underline-offset-[6px]'
                  : 'text-muted underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-ink hover:decoration-line'
              }
            >
              {p.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
