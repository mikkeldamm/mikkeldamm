import type { Metadata } from 'next';
import { PrintButton } from './PrintButton';
import './cv.css';

export const dynamic = 'force-static';

// Kept out of search — this page carries a phone number and exists to be printed.
export const metadata: Metadata = {
  title: 'CV — Mikkel Damm Vind',
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/* CV content — edit here, then print the page to refresh the PDF.     */
/* ------------------------------------------------------------------ */

const contact = [
  'mikkel@codingmoon.dk',
  '+45 21 74 67 66',
  'codingmoon.dk',
  'mikkeldamm.dk',
  'linkedin.com/in/mikkeldamm',
  'Copenhagen, Denmark',
];

const statement =
  'Senior full-stack developer, 18+ years in. Frontend roots, full-stack reach — from booking platforms at scale to SaaS products and climate-tech tooling.';

const profile = [
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
    body: "Node.js, PostgreSQL, MySQL, REST API's, queues & background jobs, calculation engines, Docker",
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
  employment: 'Fulltime' | 'Part-time';
  role: string;
  period: string;
  summary: string;
  bullets: string[];
};

// Jobs are split by page — move entries between the arrays if content grows.
const jobsPageOne: CvJob[] = [
  {
    company: 'Målbar',
    employment: 'Part-time',
    role: 'Lead Software Developer',
    period: 'Jun 2023 – Current',
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
    employment: 'Fulltime',
    role: 'Software Developer & Owner',
    period: 'Oct 2018 – Current',
    summary:
      'One-person software studio taking web and mobile products from rough sketch to launch, for clients and as own products.',
    bullets: [
      'Client work: big.dk and internal tools for Bjarke Ingels Group, bookkeeping automation for Zignifikant, CRM integrations for Spilbræt.',
      'Own products: Ønsker.dk, Instabolig and Subgent, plus Vejtilleg nearing launch.',
      'Full ownership of design, architecture, delivery and client relationships — no hand-offs.',
    ],
  },
];

const jobsPageTwo: CvJob[] = [
  {
    company: 'eManager',
    employment: 'Fulltime',
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
    employment: 'Fulltime',
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
    employment: 'Fulltime',
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
    employment: 'Fulltime',
    role: 'Full-Stack Developer → Lead Developer',
    period: 'Feb 2008 – Jan 2015',
    summary: 'First large web agency with 20,000+ customers.',
    bullets: [
      "Built a new CMS from scratch in .NET with a colleague; it became the company's main product and was later sold.",
      'Grew into a lead developer role heading a team of 8 across Denmark and Ukraine.',
      'Focused on architecture and frontend, establishing testing procedures and introducing Scrum.',
    ],
  },
];

const education = {
  school: 'Frederiksberg HTX',
  degree: 'Higher Technical Examination (HTX), Information Technology',
  period: '2006 – 2009',
};

const certifications = [
  { name: 'Certified Agile Tester (CAT)', issuer: 'iSQI GmbH · Jan 2014' },
  { name: 'ISTQB Software Tester Foundation', issuer: 'ISTQB / DELTA · Oct 2011' },
];

const languages = [
  { name: 'Danish', level: 'native' },
  { name: 'English', level: 'fluent, professional working proficiency' },
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

/** One job = a meta cell (company + employment) and an entry cell. */
function JobEntry({ job, padTop = 0 }: { job: CvJob; padTop?: number }) {
  const pad = padTop ? { paddingTop: padTop } : undefined;
  return (
    <>
      <div className="cv-meta" style={pad}>
        <div className="cv-meta-rule" />
        <span className="cv-meta-company">{job.company}</span>
        <span>{job.employment}</span>
      </div>
      <div className="cv-entry" style={pad}>
        <h3>{job.role}</h3>
        <p className="cv-period">{job.period}</p>
        <p className="cv-entry-summary">{job.summary}</p>
        <ul>
          {job.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function CvPage() {
  return (
    <main className="cv-root">
      <div className="cv-toolbar">
        <p>Letter format · prints edge to edge with no margins</p>
        <PrintButton />
      </div>

      {/* Page 1 — header, profile, skills, current roles */}
      <section className="cv-page">
        <header className="cv-header">
          <div />
          <div className="cv-header-body">
            <div className="cv-header-top">
              <p className="cv-name">Mikkel Damm Vind</p>
              <div className="cv-contact">
                {contact.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
            <h1 className="cv-statement">{statement}</h1>
          </div>
        </header>

        <div className="cv-grid">
          <p className="cv-label">Profile</p>
          <div className="cv-profile">
            {profile.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="cv-side">
            <div className="cv-side-group cv-side-group--tight">
              <p className="cv-label">Skills</p>
              {skills.map((skill) => (
                <div key={skill.title} className="cv-side-item">
                  <p>{skill.title}</p>
                  <p>{skill.body}</p>
                </div>
              ))}
            </div>
          </aside>

          <JobEntry job={jobsPageOne[0]} padTop={26} />
          <JobEntry job={jobsPageOne[1]} padTop={20} />
        </div>
      </section>

      {/* Page 2 — earlier roles, education, certifications, languages, industries */}
      <section className="cv-page">
        <div className="cv-grid">
          <JobEntry job={jobsPageTwo[0]} />
          <aside className="cv-side">
            <div className="cv-side-group">
              <p className="cv-label">Education</p>
              <div className="cv-side-item">
                <p>{education.school}</p>
                <p>{education.degree}</p>
                <p>{education.period}</p>
              </div>
            </div>
            <div className="cv-side-group">
              <p className="cv-label">Certifications</p>
              {certifications.map((cert) => (
                <div key={cert.name} className="cv-side-item">
                  <p>{cert.name}</p>
                  <p>{cert.issuer}</p>
                </div>
              ))}
            </div>
            <div className="cv-side-group">
              <p className="cv-label">Languages</p>
              <div className="cv-side-list">
                {languages.map((language) => (
                  <p key={language.name}>
                    <span className="cv-meta-company">{language.name}</span> — {language.level}
                  </p>
                ))}
              </div>
            </div>
            <div className="cv-side-group">
              <p className="cv-label">Industries</p>
              <div className="cv-side-list">
                {industries.map((industry) => (
                  <p key={industry}>{industry}</p>
                ))}
              </div>
            </div>
          </aside>

          {jobsPageTwo.slice(1).map((job) => (
            <JobEntry key={job.company} job={job} padTop={20} />
          ))}
        </div>
      </section>
    </main>
  );
}
