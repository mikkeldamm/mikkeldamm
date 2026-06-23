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
  const speedRef = useRef(600); // px/sec, set per committed path
  const distRef = useRef(0);
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
        logo.style.willChange = '';
      }
      logoRef.current = null;
      baseRef.current = null;
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
      path.setAttribute('d', d);
      const len = path.getTotalLength();
      lengthRef.current = len;
      // Quicker glide than before.
      speedRef.current = Math.min(1400, Math.max(500, len / 2));
      distRef.current = 0;

      // Measure the logo's resting centre with any prior transform cleared.
      logo.style.transform = '';
      const r = logo.getBoundingClientRect();
      baseRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      logo.style.willChange = 'transform';
      logoRef.current = logo;

      if (draftRef.current) draftRef.current.setAttribute('d', '');
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (isInteractive(e.target)) return;
      if (!document.getElementById(LOGO_ID)) return; // nothing to follow on this page
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

    // Animation loop — glide the main logo along the committed path.
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - prev);
      prev = now;
      const logo = logoRef.current;
      const base = baseRef.current;
      const path = committedRef.current;
      const len = lengthRef.current;
      if (logo && base && path && len > 1) {
        distRef.current = (distRef.current + (speedRef.current * dt) / 1000) % len;
        const p = path.getPointAtLength(distRef.current);
        logo.style.transform = `translate(${p.x - base.x}px, ${p.y - base.y}px)`;
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
