'use client';

import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

type Pt = { x: number; y: number };

const MIN_STEP = 6; // min px between captured points
const MARK = 44; // logo size in px

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
  const markRef = useRef<HTMLDivElement>(null);

  // Mutable animation state kept off React to avoid re-render storms.
  const drawing = useRef(false);
  const points = useRef<Pt[]>([]);
  const lengthRef = useRef(0);
  const speedRef = useRef(220); // px/sec, set per committed path
  const distRef = useRef(0);

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

    const commit = () => {
      const path = committedRef.current;
      if (!path) return;
      const d = toPath(points.current);
      if (!d) return;
      path.setAttribute('d', d);
      const len = path.getTotalLength();
      lengthRef.current = len;
      speedRef.current = Math.min(600, Math.max(140, len / 4));
      distRef.current = 0;
      if (draftRef.current) draftRef.current.setAttribute('d', '');
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (isInteractive(e.target)) return;
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

    // Animation loop — glide the mark along the committed path.
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - prev);
      prev = now;
      const mark = markRef.current;
      const path = committedRef.current;
      const len = lengthRef.current;
      if (mark && path && len > 1) {
        distRef.current = (distRef.current + (speedRef.current * dt) / 1000) % len;
        const p = path.getPointAtLength(distRef.current);
        mark.style.transform = `translate(${p.x - MARK / 2}px, ${p.y - MARK / 2}px)`;
        mark.style.opacity = '1';
      } else if (mark) {
        mark.style.opacity = '0';
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
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
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
      <div
        ref={markRef}
        className="absolute left-0 top-0 opacity-0 drop-shadow-sm transition-opacity duration-300"
        style={{ width: MARK, height: MARK, willChange: 'transform' }}
      >
        <Logo className="h-full w-full" />
      </div>
    </div>
  );
}
