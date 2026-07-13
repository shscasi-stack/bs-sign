import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/data/categories';

const BASE_URL = 'https://www.bs-sign.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/quote`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/configurator`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
