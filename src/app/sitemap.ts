import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/data/categories';
import { PORTFOLIO_ITEMS } from '@/lib/data/portfolio';

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

  // 작업사례 상세 — 검색 유입을 담당하는 콘텐츠 페이지
  const caseRoutes: MetadataRoute.Sitemap = PORTFOLIO_ITEMS.filter((item) => item.caseStudy).map(
    (item) => ({
      url: `${BASE_URL}/portfolio/${item.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...caseRoutes];
}
