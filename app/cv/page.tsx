import type { Metadata } from 'next';
import { Fragment } from 'react';
import { PrintButton } from './PrintButton';
import './cv.css';

export const dynamic = 'force-static';

// Kept out of search — this page carries a phone number and exists to be printed.
export const metadata: Metadata = {
  title: 'CV — Mikkel Damm Vind',
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/* CV content — edit here, then run `pnpm cv:pdf` to refresh the PDF.  */
/* ------------------------------------------------------------------ */

const name = 'Mikkel Damm Vind';
const title = 'Senior Full-Stack Developer';

const contact: { label: string; href?: string }[] = [
  { label: 'Copenhagen, Denmark' },
  { label: '+45 21 74 67 66', href: 'tel:+4521746766' },
  { label: 'mikkel@dammvind.dk', href: 'mailto:mikkel@dammvind.dk' },
  { label: 'mikkeldamm.dk', href: 'https://mikkeldamm.dk' },
];

const summary = [
  'Senior full-stack developer, 18+ years in. Frontend roots, full-stack reach — from booking platforms at scale to SaaS products and climate-tech tooling.',
  'Equally at home in database design, queues and calculation engines as in interface craft and product design. Strongest on the bigger picture: systems, architecture, and how the pieces fit together.',
  "I've built products end to end as a solo developer, led teams of up to 8 across borders, co-founded and served as CTO of a startup, and shipped features used daily by thousands of users.",
  'A lot of how I build today is agentic: AI coding agents and tight feedback loops for speed, while staying the person who understands and owns every line that ships.',
];

const skills = [
  {
    title: 'Languages & core',
    body: 'TypeScript, JavaScript, HTML, CSS, Node.js, C# / .NET, SQL',
  },
  {
    title: 'Frontend',
    body: 'React, Next.js, Angular, React Native, Expo, frontend architecture',
  },
  {
    title: 'Backend & data',
    body: 'Node.js, PostgreSQL, MySQL, REST APIs, queues & background jobs, calculation engines, Docker',
  },
  {
    title: 'Product & architecture',
    body: 'System architecture, data modelling, end-to-end product ownership, UX and product design, sketch to launch',
  },
  {
    title: 'Quality & process',
    body: 'Automated testing, clean code advocacy, code review, Scrum and agile facilitation, technical leadership and mentoring',
  },
  {
    title: 'Ways of working',
    body: 'Agentic development with AI coding agents, solo end-to-end delivery, direct client collaboration',
  },
];

type CvJob = {
  company: string;
  employment: 'Full-time' | 'Part-time';
  role: string;
  period: string;
  summary: string;
  bullets: string[];
};

// Most recent first.
const jobs: CvJob[] = [
  {
    company: 'Målbar',
    employment: 'Part-time',
    role: 'Lead Software Developer',
    period: 'Jun 2023 – Present',
    summary:
      'Danish sustainability platform helping companies measure and reduce environmental impact through life cycle assessment (LCA).',
    bullets: [
      'Built the core web tool end to end — database, backend, frontend, queues and the result calculation engine.',
      'Translated a complex Excel-based screening tool into a full web application anyone can use.',
      'Built the admin platform where the team manages the materials, processes and datasets behind the calculations.',
    ],
  },
  {
    company: 'Coding Moon ApS',
    employment: 'Full-time',
    role: 'Software Developer & Owner',
    period: 'Oct 2018 – Present',
    summary:
      'One-person software studio taking web and mobile products from rough sketch to launch, for clients and as own products.',
    bullets: [
      'Client work: big.dk and internal tools for Bjarke Ingels Group, bookkeeping automation for Zignifikant, CRM integrations for Spilbræt.',
      'Own products: Ønsker.dk, Instabolig and Subgent, plus Vejtilleg nearing launch.',
      'Full ownership of design, architecture, delivery and client relationships — no hand-offs.',
    ],
  },
  {
    company: 'eManager',
    employment: 'Full-time',
    role: 'Founder & CTO',
    period: 'Dec 2018 – Oct 2021',
    summary: 'eSport manager game built for real Counter-Strike events.',
    bullets: [
      'Co-founded an esports startup and built the platform from scratch as CTO.',
      'Manager game running on live Counter-Strike events — real players, matches and tournaments.',
      'Grew the team to 5 people and raised 1M DKK in capital.',
    ],
  },
  {
    company: 'Dinero',
    employment: 'Full-time',
    role: 'Senior Frontend Developer',
    period: 'Sep 2016 – Oct 2019',
    summary: "One of Denmark's leading cloud-based accounting platforms for small businesses.",
    bullets: [
      'Took the product from a legacy Backbone codebase to a full Angular SPA, alongside a broad UX overhaul.',
      'Owned and shipped kassekladde and bankafstemning — core features used daily by thousands of users.',
      'Built Node.js services on Docker and migrated the test suite from Selenium to Cypress.',
    ],
  },
  {
    company: 'DFDS',
    employment: 'Full-time',
    role: 'Frontend Developer',
    period: 'Feb 2015 – Sep 2016',
    summary: 'Ferry and logistics network in and around Europe.',
    bullets: [
      'Brought modern frontend thinking into an organisation of 80+ mostly C# backend developers.',
      'Led a rebuild of dfds.com, from SharePoint with Angular modules to a headless CMS with React.',
      'Rewrote parts of the passenger booking platform from .NET MVC to a full Angular SPA.',
    ],
  },
  {
    company: 'Group Online A/S',
    employment: 'Full-time',
    role: 'Full-Stack Developer, later Lead Developer',
    period: 'Feb 2008 – Jan 2015',
    summary: 'First large web agency with 20,000+ customers.',
    bullets: [
      "Built a new CMS from scratch in .NET with a colleague; it became the company's main product and was later sold.",
      'Grew into a lead developer role heading a team of 8 across Denmark and Ukraine.',
      'Focused on architecture and frontend, establishing testing procedures and introducing Scrum.',
    ],
  },
];

// The CV's own font files (see cv.css) — fetched up front so they are ready
// before anyone prints, or headless Chrome renders the PDF.
const fontFiles = ['Inter-Light', 'Inter-Regular', 'Inter-SemiBold'].map(
  (file) => `/fonts/Inter/${file}.woff2`
);

// How many jobs fit on page 1 — the rest continue at the top of page 2.
// Pages have a fixed height, so lower this if page 1 grows.
const JOBS_ON_PAGE_ONE = 3;

const education = {
  school: 'Frederiksberg HTX',
  degree: 'Higher Technical Examination (HTX), Information Technology',
  period: '2006 – 2009',
};

const certifications = [
  { name: 'Certified Agile Tester (CAT)', issuer: 'iSQI GmbH', date: 'Jan 2014' },
  { name: 'ISTQB Software Tester Foundation', issuer: 'ISTQB / DELTA', date: 'Oct 2011' },
];

const languages = [
  { name: 'Danish', level: 'Native' },
  { name: 'English', level: 'Fluent, professional working proficiency' },
];

const industries = [
  'Sustainability & climate tech (LCA)',
  'Fintech & accounting software',
  'Transport, travel & logistics',
  'Architecture & design',
  'Esports & gaming',
  'E-commerce & bookkeeping automation',
  'Consumer web & mobile apps',
  'SaaS & digital agency / CMS',
];

/* ------------------------------------------------------------------ */
/* Rendering                                                           */
/* ------------------------------------------------------------------ */

// One column in reading order, with plain-text headings an ATS recognises —
// the PDF's text layer then reads top to bottom exactly as the page does.

function CvSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="cv-section">
      {title && <h2 className="cv-heading">{title}</h2>}
      {children}
    </section>
  );
}

/**
 * A bold title over a "who · when" line — a role, a degree or a certificate.
 * Dates sit inline rather than right-aligned: parsers often read a
 * right-aligned date as a separate block and lose which entry it belongs to.
 */
function EntryHead({ title, details }: { title: string; details: string[] }) {
  return (
    <>
      <h3 className="cv-entry-title">{title}</h3>
      <p className="cv-entry-org">{details.join(' · ')}</p>
    </>
  );
}

/**
 * "ROLE · COMPANY · PERIOD" on one line, as the role's heading. Full-time is
 * the default, so only part-time roles are marked.
 */
function JobEntry({ job }: { job: CvJob }) {
  const role = job.employment === 'Part-time' ? `${job.role} (Part-time)` : job.role;
  return (
    <div className="cv-entry">
      <h3 className="cv-job-title">
        {role} · {job.company} <span className="cv-job-period">· {job.period}</span>
      </h3>
      <p className="cv-entry-note">{job.summary}</p>
      <ul className="cv-bullets">
        {job.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

export default function CvPage() {
  return (
    <main className="cv-root">
      {/* React hoists these into <head>. */}
      {fontFiles.map((href) => (
        <link
          key={href}
          rel="preload"
          href={href}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}

      <div className="cv-toolbar">
        <p>Letter format · prints edge to edge with no margins</p>
        <PrintButton />
      </div>

      {/* Page 1 — header, summary, skills, most recent roles */}
      <div className="cv-page">
        <header className="cv-header">
          <h1 className="cv-name">{name}</h1>
          <p className="cv-title">{title}</p>
          <p className="cv-contact">
            {contact.map((item, i) => (
              <Fragment key={item.label}>
                {i > 0 && ' · '}
                {item.href ? <a href={item.href}>{item.label}</a> : item.label}
              </Fragment>
            ))}
          </p>
        </header>

        <CvSection title="Summary">
          <div className="cv-summary">
            {summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </CvSection>

        <CvSection title="Skills">
          <ul className="cv-list">
            {skills.map((skill) => (
              <li key={skill.title}>
                <strong>{skill.title}:</strong> {skill.body}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Experience">
          {jobs.slice(0, JOBS_ON_PAGE_ONE).map((job) => (
            <JobEntry key={job.company} job={job} />
          ))}
        </CvSection>
      </div>

      {/* Page 2 — earlier roles, education, certifications, languages, industries */}
      <div className="cv-page">
        <CvSection>
          {jobs.slice(JOBS_ON_PAGE_ONE).map((job) => (
            <JobEntry key={job.company} job={job} />
          ))}
        </CvSection>

        <CvSection title="Education">
          <div className="cv-entry">
            <EntryHead title={education.degree} details={[education.school, education.period]} />
          </div>
        </CvSection>

        <CvSection title="Certifications">
          {certifications.map((cert) => (
            <div key={cert.name} className="cv-entry">
              <EntryHead title={cert.name} details={[cert.issuer, cert.date]} />
            </div>
          ))}
        </CvSection>

        <CvSection title="Languages">
          <ul className="cv-list">
            {languages.map((language) => (
              <li key={language.name}>
                <strong>{language.name}:</strong> {language.level}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Industries">
          <p>{industries.join(' · ')}</p>
        </CvSection>
      </div>
    </main>
  );
}
