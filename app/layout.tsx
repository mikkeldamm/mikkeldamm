import './global.css';
import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { PathFollower } from '@/components/PathFollower';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

// The whole system is tuned around Instrument Sans — self-hosted at build by next/font.
const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const title = 'Mikkel Damm Vind — Senior Full-Stack Developer';
const description =
  'Self-taught full-stack developer from Copenhagen with 16+ years of experience. Frontend roots, full-stack reach — building things that work well and look good.';
const url = 'https://mikkeldamm.com';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  authors: [{ name: 'Mikkel Damm Vind', url }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en',
    url,
    siteName: 'Mikkel Damm Vind',
    title,
    description,
    images: [{ url: '/images/mikkeldamm.jpg', width: 1200, height: 630, alt: 'Mikkel Damm Vind' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@MikkelDamm',
    images: ['/images/mikkeldamm.jpg'],
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#15120f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// Runs before paint to set the theme class — avoids a flash of the wrong mode.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m))document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrument.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <PathFollower />
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
