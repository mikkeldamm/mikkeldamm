'use client';

import { useEffect } from 'react';

// Class that switches the page into its print layout — see cv.css.
const PRINTING_CLASS = 'cv-printing';

/** Triggers the browser print dialog — "Save as PDF" produces the CV. */
export function PrintButton() {
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

  return (
    <button type="button" className="cv-print-btn" onClick={print}>
      Print / Save as PDF
    </button>
  );
}
