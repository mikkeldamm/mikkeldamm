// All site content lives here, sourced from Profile.pdf (LinkedIn export).
// Narrative-first — a CV's facts, told the way Mikkel would say them.

export const person = {
  name: 'Mikkel Damm Vind',
  role: 'Senior Full-Stack Developer',
  tagline: 'Frontend roots, full-stack reach.',
  location: 'Copenhagen, Denmark',
  email: 'mikkel@codingmoon.dk',
  // Hero statement — split on the first em dash for two-tone styling.
  statement:
    "I'm a developer in Copenhagen — making things that work well and look good. Most devs care about the code or the look. I try to care about both. Where I'm strongest is the bigger picture: systems and architecture, and how all the pieces fit together.",
};

// The hero / summary — spoken, not bulleted.
export const intro = [
  "I’m a self-taught developer with 16+ years of experience — from large-scale booking platforms to SaaS products. Most of that time I’ve spent trying to make things both work well and look good.",
  "That combination — solid engineering and a real eye for design — is what I’m most proud of. Most devs care about the code or the look. I try to care about both.",
  "These days I run Coding Moon and lead development at Målbar, building LCA tooling from the ground up — shipping fast while keeping things simple to understand and easy to maintain for whoever touches the code next.",
  "A lot of how I build now is agentic — I lean on AI coding agents and tight feedback loops to move faster, while staying the person who understands and owns every line that ships.",
];

export type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  url?: string;
  blurb: string;
};

// "Selected work" — most recent first.
export const experience: Job[] = [
  {
    company: 'Målbar',
    role: 'Lead Software Developer',
    period: '2023 — Now',
    current: true,
    url: 'https://maalbar.dk',
    blurb:
      'Danish sustainability platform for life-cycle assessment. Built the core web tool from the ground up — database, backend, frontend, queues, calculation engine — turning a complex Excel screening tool into a web app anyone can use, plus the full admin & content platform behind it.',
  },
  {
    company: 'Coding Moon',
    role: 'Software Developer & Owner',
    period: '2018 — Now',
    current: true,
    url: 'https://codingmoon.dev',
    blurb:
      'My own studio. Client work includes the Målbar platform, the public website big.dk for Bjarke Ingels Group, an internal dashboard for Zignifikant, and CRM integrations for Spilbræt. On the side: my own products — Ønsker, Instabolig, and a couple of apps in progress.',
  },
  {
    company: 'eManager',
    role: 'Founder & CTO',
    period: '2018 — 2021',
    blurb:
      'Co-founded an esports startup as CTO and built the platform from scratch — a manager game on top of live Counter-Strike events: players, matches, tournaments. Grew it into a content platform with partner integrations, a team of 5, and 1M DKK raised.',
  },
  {
    company: 'Dinero',
    role: 'Senior Frontend Developer',
    period: '2016 — 2019',
    blurb:
      "One of Denmark’s leading cloud accounting platforms. Helped move it from an old Backbone codebase to a full Angular SPA. Owned and shipped the kassekladde and bankafstemning — core features used daily by thousands. Backend services in Node.js on Docker; moved the test suite from Selenium to Cypress.",
  },
  {
    company: 'DFDS',
    role: 'Frontend Developer',
    period: '2015 — 2016',
    blurb:
      'Brought modern frontend thinking into an 80+ developer org of mostly C# engineers. Led a full rebuild of dfds.com (SharePoint → headless CMS on React) and rewrote parts of the passenger booking platform from .NET MVC to Angular. Sat on the digital strategy committee, advocating clean code and testing.',
  },
  {
    company: 'Group Online A/S',
    role: 'Full-Stack Developer → Lead',
    period: '2008 — 2015',
    blurb:
      'Came in as a designer; JavaScript pulled me into engineering. Built a CMS from scratch in .NET in my spare time — it became the company\'s main product and later sold for a significant sum. Grew into lead, heading a team of 8 across Denmark and Ukraine: architecture, frontend, testing, and Scrum.',
  },
];

export type Product = {
  name: string;
  tagline: string;
  blurb: string;
  tags: string[];
  url?: string;
};

// Own products — mirrored from codingmoon.dk.
export const products: Product[] = [
  {
    name: 'Ønsker',
    tagline: 'Wishlists worth sharing',
    blurb:
      'A wishlist app for creating, organising and sharing wishes with friends and family — so gifting is easy and nobody buys the same thing twice.',
    tags: ['Next.js', 'TypeScript', 'React'],
    url: 'https://www.oensker.dk',
  },
  {
    name: 'Vejtilleg',
    tagline: 'A community-driven playground finder',
    blurb:
      'A web and mobile app for finding playgrounds near you — see facilities, photos and reviews, and add new ones yourself. A community-driven map built by and for families. Currently nearing launch.',
    tags: ['React Native', 'Expo', 'Next.js', 'TypeScript'],
    url: 'https://vejtilleg.dk',
  },
  {
    name: 'Subgent',
    tagline: 'Find and track your subscriptions automatically',
    blurb:
      'An app that uses open banking to automatically discover recurring payments and remind you before the next charge — so you stay in control of your subscriptions.',
    tags: ['TypeScript', 'React', 'Open Banking'],
    url: 'https://subgent.com',
  },
  {
    name: 'Hoestt',
    tagline: 'A community-driven farm shop finder',
    blurb:
      'A web and mobile app for discovering local farm shops — see what each one offers and add new shops to the map yourself. Community-driven, for people who want to buy local. Currently nearing launch.',
    tags: ['React Native', 'Expo', 'Next.js', 'TypeScript'],
  },
  {
    name: 'Coding Moon',
    tagline: 'A tiny software studio',
    blurb:
      'My one-person studio — designing, building and shipping web and mobile products for companies, taking them the whole way from a rough sketch to something real and well-crafted.',
    tags: ['Next.js', 'React Native', 'TypeScript'],
    url: 'https://codingmoon.dk',
  },
];

// What I do — for the About page.
export const whatIDo = [
  'Web apps with Next.js, React & TypeScript',
  'Full-stack systems — APIs, databases, queues & calculation engines',
  'Mobile apps with React Native & Expo',
  'Product design and frontend craft — taking ideas to launch',
];

// "Let's talk" — the contact list on the home page.
export type ContactLink = { label: string; href: string; icon: 'mail' | 'linkedin' | 'github' };

export const contactLinks: ContactLink[] = [
  { label: 'Drop me an email', href: 'mailto:mikkel@codingmoon.dk', icon: 'mail' },
  { label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/mikkeldamm/', icon: 'linkedin' },
  { label: 'Find me on GitHub', href: 'https://github.com/mikkeldamm', icon: 'github' },
];

export const contactIntro =
  'Open to senior full-stack roles and meaningful product collaborations — and always up for a good conversation about building things well.';

// Minimal footer links.
export const links = [
  { label: 'Email', href: 'mailto:mikkel@codingmoon.dk' },
  { label: 'GitHub', href: 'https://github.com/mikkeldamm' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikkeldamm/' },
  { label: 'Coding Moon', href: 'https://codingmoon.dev' },
];

export type Photo = {
  src: string;
  alt: string;
  /** aspect ratio hint for the grid, e.g. '3/2' or '4/5' */
  ratio?: string;
};

// Photography lives on /photos. Drop image files in /public/images/photos
// and list them here — the grid renders placeholders while this is empty.
export const photos: Photo[] = [];
