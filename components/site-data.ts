// All site content lives here, sourced from Profile.pdf (LinkedIn export).
// Narrative-first — a CV's facts, told the way Mikkel would say them.

export const person = {
  name: 'Mikkel Damm Vind',
  role: 'Senior Full-Stack Developer',
  tagline: 'Frontend roots, full-stack reach.',
  location: 'Copenhagen, Denmark',
  email: 'mikkel@codingmoon.dk',
  resume: '/Profile.pdf',
};

// The hero / summary — spoken, not bulleted. AI is woven in, not a section.
export const intro = [
  "I’m a self-taught developer with 16+ years of experience — from large-scale booking platforms to SaaS products. Most of that time I’ve spent trying to make things both work well and look good.",
  "That combination — solid engineering and a real eye for design — is what I’m most proud of. Most devs care about the code or the look. I try to care about both.",
  "These days I run Coding Moon and lead development at Målbar, building LCA tooling from the ground up. I lean heavily on agentic AI coding and custom skills to ship more, faster — this site included — while keeping things simple to understand and easy to maintain for whoever touches the code next.",
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
  blurb: string;
  url?: string;
};

// Own products / side projects.
export const products: Product[] = [
  { name: 'Ønsker', blurb: 'A wishlist platform.', url: 'https://ønsker.dk' },
  {
    name: 'Instabolig',
    blurb: "Tracks estate listings from realtors’ Instagram accounts and notifies you of new ones.",
  },
  { name: 'Playground finder', blurb: 'Find playgrounds near you. In progress.' },
  { name: 'Grocery discovery', blurb: 'Local grocery discovery app. In progress.' },
];

export const facts = {
  awards: 'Developer of the Year',
  certs: ['Certified Agile Tester (CAT)', 'ISTQB Software Tester Foundation'],
  languages: ['Danish', 'English'],
  education: 'HTX, Information Technology — Frederiksberg',
};

export const links = [
  { label: 'GitHub', href: 'https://github.com/mikkeldamm' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikkeldamm/' },
  { label: 'Twitter', href: 'https://twitter.com/MikkelDamm' },
  { label: 'Unsplash', href: 'https://unsplash.com/@dammeren' },
  { label: 'Coding Moon', href: 'https://codingmoon.dev' },
];
