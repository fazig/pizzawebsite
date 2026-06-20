import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/navigation";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
