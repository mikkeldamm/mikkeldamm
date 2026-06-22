# Coding Moon (codingmoon.dev) — proposed changes

A proposal for adding an **AI-native development** angle to the company site and
cross-linking it with the personal site (mikkeldamm.com). This repo is the
personal site; codingmoon.dev lives in a separate project, so this is a
hand-off doc: copy, placement, and ready-to-adapt markup.

> Context as of this writing, codingmoon.dev has: nav (Work · About · Get in
> touch), a hero ("I build web & mobile products for companies — from first
> idea to launch."), Selected Work (Client Projects + Own Products), an About
> section, and a Contact CTA. **No mention of AI anywhere.** That's the gap.

---

## 1. Why add an AI angle

The way Mikkel builds has changed: agentic AI coding + custom skills are now a
core part of how Coding Moon ships. That's a genuine selling point for clients
("more shipped, faster, without cutting corners"), and it's differentiating —
most studio sites still don't talk about it credibly. The personal site already
references it; the company site should make it a clear, client-facing promise.

Tone to match the existing site: professional yet approachable, concrete,
no hype words ("revolutionary", "AI-powered magic"). Show the *practice*, not
the buzzword.

---

## 2. New section: "AI-native development"

Place it **right after the hero, before Selected Work** — it reframes how the
work that follows gets built.

### Copy (drop-in)

> **Heading:** Built AI-native — without cutting corners
>
> **Body:** I build with agentic AI coding at the center of the workflow —
> custom skills, automated review, and tooling I've tuned over hundreds of
> hours. In practice that means more ground covered per week, fewer bugs slipping
> through, and budget that goes further. The craft doesn't change: code that's
> simple to understand and easy to maintain for whoever touches it next. AI just
> lets me get there faster.

Three supporting points (icon + label + one line) — optional row beneath:

- **Ship faster.** More features per sprint, prototypes in days not weeks.
- **Fewer bugs.** Automated, adversarial review on every change before it lands.
- **Same craft.** Maintainable, well-tested code — AI accelerates it, doesn't replace the judgment.

### Ready-to-adapt JSX (Next.js / Tailwind)

```tsx
// components/AiNativeSection.tsx
export function AiNativeSection() {
  return (
    <section id="ai" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        Built AI-native — without cutting corners
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
        I build with agentic AI coding at the center of the workflow — custom
        skills, automated review, and tooling I&apos;ve tuned over hundreds of
        hours. More ground covered per week, fewer bugs slipping through, and
        budget that goes further. The craft doesn&apos;t change: code that&apos;s
        simple to understand and easy to maintain. AI just gets me there faster.
      </p>
      <ul className="mt-10 grid gap-8 sm:grid-cols-3">
        {[
          ['Ship faster', 'More features per sprint, prototypes in days not weeks.'],
          ['Fewer bugs', 'Automated, adversarial review on every change before it lands.'],
          ['Same craft', 'Maintainable, well-tested code — judgment stays human.'],
        ].map(([title, body]) => (
          <li key={title}>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-neutral-600">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

## 3. Hero tweak (optional, lighter touch)

If a whole section is too much, append one line to the existing hero instead:

> I build web & mobile products for companies — from first idea to launch.
> **Now built AI-native: agentic coding and custom tooling that ship more,
> faster, without cutting corners.**

---

## 4. Cross-linking the two sites

Right now the sites don't reference each other. Connect them both ways so the
"studio" and the "person behind it" reinforce each other.

**On codingmoon.dev** — in the About section, add:

```tsx
<p>
  Coding Moon is run by{' '}
  <a href="https://mikkeldamm.com" className="underline underline-offset-4">
    Mikkel Damm Vind
  </a>{' '}
  — 16+ years across frontend and full-stack. More about me, my background, and
  the work →
</p>
```

**On mikkeldamm.com** — already done: the footer and the "Coding Moon" work
entry link to codingmoon.dev. (See `components/site-data.ts`.)

Optionally add an OG/meta `author` link and a small "Available for projects via
Coding Moon" line on the personal site if Mikkel wants to drive leads there.

---

## 5. Suggested order of work

1. Add `AiNativeSection` after the hero (section 2).
2. Add the bi-directional About link (section 4).
3. Confirm both sites' OG metadata name each other as author/related.
4. Optional: a tiny "/uses" or "/ai" page on codingmoon.dev detailing the
   actual stack & skills, linked from the new section — strong proof for clients.

## Open questions for Mikkel
- Full section or just the hero line? (Recommend full section — it's the differentiator.)
- Want a dedicated `/ai` proof page, or keep it to one section?
- Drive client leads to Coding Moon from the personal site, or keep them separate?
