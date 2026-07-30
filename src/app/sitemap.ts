// Sitemap for the four content routes.
//
// Derived from `site.nav` rather than from the filesystem, which is what keeps
// /test and /styleguide out of it: they are routable but they are not navigation,
// so they can never leak in here by accident. Adding a real route to the nav adds
// it to the sitemap in the same edit.
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.nav.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(),
    // Google ignores changeFrequency and priority; Bing and others still read
    // them, and they cost nothing. Home is the entry point, /contact is the
    // conversion page for both §1 audiences.
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : item.href === "/contact" ? 0.9 : 0.8,
  }));
}
