'use client';

import { useEffect, useState } from 'react';

// Class that switches the page into its print layout — see cv.css.
const PRINTING_CLASS = 'cv-printing';

// Pre-rendered copy of this page — regenerate with `pnpm cv:pdf`.
const PDF_URL = '/Mikkel-Damm-Vind-CV.pdf';

/**
 * Triggers the browser print dialog — "Save as PDF" produces the CV.
 * On iOS it links to the pre-rendered PDF instead: iOS Safari always stamps
 * its own header and footer (title, URL, page numbers) on printouts.
 */
export function PrintButton() {
  const [isIos, setIsIos] = useState(false);

  // -webkit-touch-callout only exists in iOS/iPadOS Safari.
  useEffect(() => {
    setIsIos(CSS.supports('-webkit-touch-callout', 'none'));
  }, []);

  // iOS Safari prints with the screen styles and ignores @media print, so the
  // print layout is also toggled with a class around every print (including
  // prints started from the browser's own menu).
  useEffect(() => {
    const root = document.documentElement;
    const start = () => root.classList.add(PRINTING_CLASS);
    const end = () => root.classList.remove(PRINTING_CLASS);
    window.addEventListener('beforeprint', start);
    window.addEventListener('afterprint', end);
    // Fallback in case afterprint never fires: the next tap restores the page.
    window.addEventListener('pointerdown', end);
    return () => {
      window.removeEventListener('beforeprint', start);
      window.removeEventListener('afterprint', end);
      window.removeEventListener('pointerdown', end);
      end();
    };
  }, []);

  function print() {
    document.documentElement.classList.add(PRINTING_CLASS);
    window.print();
  }

  if (isIos) {
    return (
      <a href={PDF_URL} download="Mikkel Damm Vind CV.pdf" className="cv-print-btn">
        Download PDF
      </a>
    );
  }

  return (
    <button type="button" className="cv-print-btn" onClick={print}>
      Print / Save as PDF
    </button>
  );
}
