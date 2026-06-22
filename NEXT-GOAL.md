# NEXT-GOAL.md — personal site build loop

Living backlog. Work top-down. When a goal is done, check it off. When the
list is all checked, the loop is done.

## Decisions (locked 2026-06-22)
- Name: **Mikkel Damm Vind**. Keep the cream/peach logo. Font: Inter (variable).
- Aesthetic: **light & editorial** (rsms.me-like). bg `#faf9f7`, text near-black, peach as the single accent.
- Hidden effect: **draw a path → the logo glides along it** (loops until a new path drawn). Respect `prefers-reduced-motion`.
- Company site (codingmoon.dev, separate repo): deliver a **proposal doc** with AI section + cross-linking copy.
- AI angle on personal site: **woven into the prose**, no dedicated section.
- Single-page site (hero → now → work → products → colophon/footer), CV content but narrative, not a "CV".

## Goals
- [x] G1. Foundation: clean junk `page.tsx`, design tokens + Inter variable font in `global.css`, metadata in `layout.tsx`.
- [x] G2. Logo component recovered into `components/Logo.tsx` (accepts className/style/ref).
- [x] G3. Content data (`components/site-data.ts`): bio, experience, products, links — sourced from Profile.pdf.
- [x] G4. Page composition: hero, intro/now, selected work (experience), products, colophon, footer links. Responsive.
- [x] G5. Interactive effect `components/PathFollower.tsx`: draw path, logo follows, reduced-motion fallback, hint affordance.
- [x] G6. Profile.pdf copied to `public/` + linked as résumé; OG/meta/favicon correct.
- [x] G7. COMPANY-SITE-CHANGES.md proposal (AI-native section + cross-link to mikkeldamm.com).
- [x] G8. Verify: typecheck + build pass (clean), dev run, desktop+mobile screenshots, draw interaction verified.
- [x] G9. Final review (web-interface-guidelines): curly typography, text-balance, no text-selection during drag, touch-action, legible faint color, color-scheme. Loop closed.

## Next goal
**None — backlog empty. Loop complete.**

## Parking lot (optional, not requested — pick up only if asked)
- Dedicated 1200×630 OG image (currently reuses the photo, which isn't 1.91:1).
- Hand the changes in COMPANY-SITE-CHANGES.md to the codingmoon.dev repo.
- Deploy (Vercel project already linked via `.vercel`).
- Remove now-unused `radash` dep + old `postcss.config.js`/`autoprefixer` if not needed under Tailwind v4.
