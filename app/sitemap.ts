import type { MetadataRoute } from 'next';

const BASE_URL = 'https://ismosis.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/portfolio', '/process', '/pricing', '/about', '/contact'];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
