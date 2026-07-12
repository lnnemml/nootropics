import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account/", "/checkout/", "/admin/", "/auth/", "/cart/"],
      },
    ],
    sitemap: "https://www.noraalliance.com/sitemap.xml",
  };
}
