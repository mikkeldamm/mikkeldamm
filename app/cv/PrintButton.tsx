'use client';

/** Triggers the browser print dialog — "Save as PDF" produces the CV. */
export function PrintButton() {
  return (
    <button type="button" className="cv-print-btn" onClick={() => window.print()}>
      Print / Save as PDF
    </button>
  );
}
