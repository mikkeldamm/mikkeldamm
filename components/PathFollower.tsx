'use client';

import { useEffect, useRef, useState } from 'react';

type Pt = { x: number; y: number };

const MIN_STEP = 6; // min px between captured points
const LOGO_ID = 'site-logo'; // the main hero logo this effect drives

function toPath(points: Pt[]): string {
  if (points.length < 2) return '';
  // Smooth-ish path: quadratic curves through midpoints.
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i].x + points[i + 1].x) / 2;
    const my = (points[i].y + points[i + 1].y) / 2;
    d += ` Q ${points[i].x} ${points[i].y} ${mx} ${my}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

function isInteractive(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  return !!el.closest('a, button, input, textarea, select, label, summary, [role="button"], [contenteditable="true"]');
}

export function PathFollower() {
  const [enabled, setEnabled] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const committedRef = useRef<SVGPathElement>(null); // visible + measured path
  const draftRef = useRef<SVGPathElement>(null); // in-progress stroke

  // Mutable animation state kept off React to avoid re-render storms.
  const drawing = useRef(false);
  const points = useRef<Pt[]>([]);
  const lengthRef = useRef(0);
  const durationRef = useRef(0); // ms to traverse the committed path once
  const elapsedRef = useRef(0); // ms into the current glide
  const logoRef = useRef<SVGElement | null>(null); // the actual hero logo, while it glides
  const baseRef = useRef<Pt | null>(null); // logo centre at rest (viewport coords)

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 640) {
      // Skip on small touch screens — drawing fights with scrolling there.
      return;
    }
    setEnabled(true);

    const sizeSvg = () => {
      const svg = svgRef.current;
      if (svg) svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    };
    sizeSvg();
    window.addEventListener('resize', sizeSvg);

    const releaseLogo = () => {
      const logo = logoRef.current;
      if (logo) {
        logo.style.transform = '';
        logo.style.transition = '';
        logo.style.willChange = '';
        logo.style.position = '';
        logo.style.zIndex = '';
      }
      logoRef.current = null;
      baseRef.current = null;
    };

    // Idle reset — after a spell of no drawing, fade the line out and ease the
    // face back to its resting place in the header.
    let idleTimer = 0;
    let fadeTimer = 0;
    let releaseTimer = 0;

    const cancelReturn = () => {
      window.clearTimeout(idleTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(releaseTimer);
    };

    const returnHome = () => {
      const committed = committedRef.current;
      if (committed) {
        committed.style.transition = 'opacity 500ms ease';
        committed.style.opacity = '0';
        fadeTimer = window.setTimeout(() => {
          committed.setAttribute('d', '');
          committed.style.transition = '';
          committed.style.opacity = '';
          lengthRef.current = 0;
        }, 520);
      }
      const logo = logoRef.current;
      if (logo) {
        // Ease from the parked spot/size back to rest, then hand the face back.
        logo.style.transition = 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)';
        logo.style.transform = 'translate(0px, 0px) scale(1)';
        const current = logo;
        releaseTimer = window.setTimeout(() => {
          if (logoRef.current === current) releaseLogo();
        }, 680);
      }
    };

    const scheduleReturn = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(returnHome, 5000);
    };

    const commit = () => {
      const path = committedRef.current;
      if (!path) return;
      // Grab the main logo — the effect drives it, never a clone.
      const logo = document.getElementById(LOGO_ID) as SVGElement | null;
      if (!logo) {
        if (draftRef.current) draftRef.current.setAttribute('d', '');
        return;
      }
      const d = toPath(points.current);
      if (!d) return;
      cancelReturn(); // a new drawing interrupts any pending/in-flight reset
      // Restore the line's visibility in case a fade was mid-flight.
      path.style.transition = '';
      path.style.opacity = '';
      path.setAttribute('d', d);
      const len = path.getTotalLength();
      lengthRef.current = len;
      // Traversal pace: ~1650 px/sec, clamped so tiny scribbles still read
      // and long marathons don't drag. Easing is applied in the tick.
      durationRef.current = Math.min(1500, Math.max(520, (len / 1650) * 1000));
      elapsedRef.current = 0;

      // Measure the logo's resting centre with any prior transform cleared.
      logo.style.transition = 'none'; // we drive transform per-frame; no CSS easing/lag
      logo.style.transform = '';
      const r = logo.getBoundingClientRect();
      baseRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      logo.style.willChange = 'transform';
      // Lift the face above the line overlay (fixed z-40) while it glides.
      logo.style.position = 'relative';
      logo.style.zIndex = '50';
      logoRef.current = logo;

      if (draftRef.current) draftRef.current.setAttribute('d', '');
      scheduleReturn(); // start the 5s idle countdown from this draw
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (isInteractive(e.target)) return;
      if (!document.getElementById(LOGO_ID)) return; // nothing to follow on this page
      cancelReturn(); // hold the face/line in place while a new drawing starts
      drawing.current = true;
      points.current = [{ x: e.clientX, y: e.clientY }];
      if (draftRef.current) draftRef.current.setAttribute('d', '');
      // Don't let the drag turn into a text selection.
      document.body.style.userSelect = 'none';
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!drawing.current) return;
      const pts = points.current;
      const last = pts[pts.length - 1];
      if (Math.hypot(e.clientX - last.x, e.clientY - last.y) < MIN_STEP) return;
      pts.push({ x: e.clientX, y: e.clientY });
      if (draftRef.current) draftRef.current.setAttribute('d', toPath(pts));
      e.preventDefault();
    };

    const onUp = () => {
      if (!drawing.current) return;
      drawing.current = false;
      document.body.style.userSelect = '';
      window.getSelection?.()?.removeAllRanges();
      if (points.current.length > 1) commit();
    };

    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    // Ease-in-out so the face accelerates off its mark and settles at the end
    // rather than gliding at a flat, mechanical pace.
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Grow the face as it leaves its mark and keep it big — it stays enlarged
    // where it comes to rest at the end of the line.
    const POP = 2.3; // scale while travelling and at rest
    const scaleAt = (t: number) => {
      const grow = 0.18; // ramp up over the first 18%, then hold
      if (t < grow) {
        const k = t / grow;
        return 1 + (POP - 1) * (1 - Math.pow(1 - k, 3)); // ease-out
      }
      return POP;
    };

    // Animation loop — glide the main logo along the committed path once.
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - prev);
      prev = now;
      const logo = logoRef.current;
      const base = baseRef.current;
      const path = committedRef.current;
      const len = lengthRef.current;
      const dur = durationRef.current;
      if (logo && base && path && len > 1 && dur > 0) {
        elapsedRef.current += dt;
        const t = Math.min(1, elapsedRef.current / dur);
        const p = path.getPointAtLength(easeInOut(t) * len);
        logo.style.transform = `translate(${p.x - base.x}px, ${p.y - base.y}px) scale(${scaleAt(t)})`;
        if (t >= 1) {
          durationRef.current = 0; // arrived — stop driving, leave the face parked
          logo.style.willChange = ''; // no longer animating; it rests at the end
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', sizeSvg);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      cancelAnimationFrame(raf);
      cancelReturn();
      document.body.style.userSelect = '';
      releaseLogo();
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <svg ref={svgRef} className="h-full w-full" preserveAspectRatio="none">
        <path
          ref={committedRef}
          fill="none"
          stroke="var(--color-peach)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.55}
        />
        <path
          ref={draftRef}
          fill="none"
          stroke="var(--color-peach-deep)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.7}
        />
      </svg>
    </div>
  );
}
