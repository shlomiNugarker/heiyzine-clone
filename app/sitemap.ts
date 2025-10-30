import { MetadataRoute } from 'next';
import { SUPPORTED_LOCALES } from './lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://flipbook-viewer.vercel.app';

  const routes = SUPPORTED_LOCALES.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...routes,
  ];
}
