import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { experience, links, person, products } from '@/components/site-data';
import './global.css';

// The whole system is tuned around Instrument Sans — self-hosted at build by next/font.
const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const title = 'Mikkel Damm Vind — Senior Full-Stack Developer';
const description =
  'Self-taught full-stack developer from Copenhagen with 18+ years of experience. Frontend roots, full-stack reach — building things that work well and look good.';
const url = 'https://mikkeldamm.com';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  authors: [{ name: 'Mikkel Damm Vind', url }],
  alternates: { canonical: '/' },
  keywords: [
    'full-stack developer',
    'senior developer Copenhagen',
    'freelance udvikler',
    'softwareudvikler København',
    'Next.js',
    'React',
    'React Native',
    'TypeScript',
    'Node.js',
    'Denmark',
  ],
  creator: person.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    url,
    siteName: 'Mikkel Damm Vind',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@MikkelDamm',
  },
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

// One Person graph tying the site, the company and the profiles together, so a
// search for the name resolves to a single entity rather than three.
const personSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${url}/#person`,
      name: person.name,
      url,
      email: `mailto:${person.email}`,
      jobTitle: person.role,
      description,
      image: `${url}/images/mikkeldamm.jpg`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Copenhagen',
        addressCountry: 'DK',
      },
      worksFor: experience
        .filter((job) => job.current)
        .map((job) => ({ '@type': 'Organization', name: job.company, url: job.url })),
      knowsAbout: [
        'Full-stack development',
        'Frontend architecture',
        'Next.js',
        'React',
        'React Native',
        'TypeScript',
        'Node.js',
        'AI-assisted development',
      ],
      sameAs: links.filter((l) => l.href.startsWith('http')).map((l) => l.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      url,
      name: person.name,
      inLanguage: 'en',
      publisher: { '@id': `${url}/#person` },
    },
    {
      '@type': 'ItemList',
      '@id': `${url}/#products`,
      name: 'Own products',
      itemListElement: products.map((product, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: product.name,
          description: product.blurb,
          applicationCategory: 'WebApplication',
          ...(product.url ? { url: product.url } : {}),
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrument.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {children}
        <JsonLd data={personSchema} />
        <Analytics />
      </body>
    </html>
  );
}
