/**
 * Renders a schema.org graph as JSON-LD. Search engines use this to build
 * rich results for the services, prices and case studies on this site.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
