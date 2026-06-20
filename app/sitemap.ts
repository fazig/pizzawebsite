import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/menu",
    "/offers",
    "/track",
    "/about",
    "/contact",
    "/account",
    "/cart",
    "/checkout",
  ];

  return routes.map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
