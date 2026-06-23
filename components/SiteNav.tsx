'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { person } from './site-data';

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Photos', href: '/photos' },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between gap-6 px-6 py-7 md:px-8">
      <Link href="/" className="group flex items-center gap-3" aria-label={`${person.name} — home`}>
        {/* The peach badge holds the logo face that PathFollower glides on draw. */}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach/15 ring-1 ring-line">
          <Logo id="site-logo" className="h-[1.6rem] w-auto transition-transform group-hover:-translate-y-px" aria-hidden />
        </span>
        <span className="hidden flex-col leading-tight sm:flex">
          <span className="whitespace-nowrap text-[0.95rem] font-semibold tracking-tight text-ink">
            {person.name}
          </span>
          <span className="text-[0.8rem] text-faint">{person.role}</span>
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-[0.95rem] sm:gap-7">
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
                  : 'text-faint underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-ink hover:decoration-line'
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
