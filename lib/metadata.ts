import { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/navigation";

export function createMetadata(
  title: string,
  description?: string
): Metadata {
  const fullTitle = title === "Home" ? SITE_CONFIG.name : `${title} | ${SITE_CONFIG.name}`;
  const desc = description ?? SITE_CONFIG.description;

  return {
    title: fullTitle,
    description: desc,
    keywords: [
      "pizza delivery",
      "premium pizza",
      "online ordering",
      "Fazig Pizza",
      "3D menu",
      "food delivery",
    ],
    authors: [{ name: SITE_CONFIG.name }],
    openGraph: {
      title: fullTitle,
      description: desc,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
