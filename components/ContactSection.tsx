import { contactIntro, contactLinks } from './site-data';
import { contactIcons, ArrowUpRight } from './icons';

/** "Let's talk" — a statement plus a divided list of contact links. */
export function ContactSection() {
  return (
    <section className="border-t border-line pb-4 pt-10 md:pt-12">
      <p className="text-lg text-faint md:text-xl">Let&rsquo;s talk</p>
      <p className="mt-6 max-w-2xl text-balance text-xl leading-snug text-ink md:text-2xl">
        {contactIntro}
      </p>

      <ul className="mt-10 border-t border-line">
        {contactLinks.map((link) => {
          const Icon = contactIcons[link.icon];
          const external = link.href.startsWith('http');
          return (
            <li key={link.label} className="border-b border-line">
              <a
                href={link.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between gap-4 py-5 text-base font-medium text-ink md:text-lg"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-faint transition-colors group-hover:text-peach-deep" />
                  {link.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-peach-deep" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
