import type { MetadataRoute } from 'next';

const url = 'https://mikkeldamm.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${url}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${url}/cv`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
