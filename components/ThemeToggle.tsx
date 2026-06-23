'use client';

import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './icons';

/** Light/dark toggle. The theme class is set pre-paint in the root layout. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      className="flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch. */}
      {mounted && dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      <span>{mounted && dark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
