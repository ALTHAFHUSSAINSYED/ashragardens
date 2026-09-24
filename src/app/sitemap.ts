import { MetadataRoute } from "next";
import { STATIC_PRODUCTS } from "@/data/products";
import { STATIC_SERVICES } from "@/data/services";
import { SITE_CONFIG } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/plants`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/service-areas`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = STATIC_PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = STATIC_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes];
}
