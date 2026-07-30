// robots.txt, generated so the sitemap URL derives from the one origin in site.ts
// instead of being hardcoded a second time in a static public/robots.txt.
//
// AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are deliberately
// ALLOWED. §1's secondary audience is someone who needs an address and a phone
// number immediately, and that question increasingly gets asked of an assistant
// rather than typed into a search box. Being answerable there is the whole point.
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Temporary review routes — remove these entries when the routes go (§ the
      // "delete before launch" note in each file).
      disallow: ["/test", "/styleguide"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
