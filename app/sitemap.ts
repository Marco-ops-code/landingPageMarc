import type { MetadataRoute } from "next";
import { legalPages } from "@/lib/legal";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalEntries = legalPages.map((page) => ({
    url: `${site.url}/${page.slug}/`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...legalEntries,
  ];
}
