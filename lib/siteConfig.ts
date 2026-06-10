/**
 * siteConfig.ts - YOUR SITE'S CONTENT. This is the file you'll edit most.
 *
 * Every link has a `slug`: a short id that appears in your tracked URL
 * (yoursite.com/go/shop) and in your stats. Once you've shared a link
 * publicly, don't change its slug or old posts will break.
 *
 * Replace the placeholder URLs below with your real shop/affiliate/social
 * URLs. Links you haven't set up yet? Just delete them or comment them
 * out with // - you can always add them back.
 */

import { products } from "./shopConfig";

export type TrackedLink = {
  slug: string;          // unique id, lowercase, no spaces (used in /go/<slug>)
  title: string;         // text shown on the button
  url: string;           // where the visitor actually ends up
  emoji?: string;        // small decoration on the button
  featured?: boolean;    // featured links render big and bright at the top
  section: "shop" | "affiliate" | "content" | "social";
};

export const site = {
  name: "SoccerForAmericans",
  // One line that tells a stranger why to follow you
  tagline:
    "Soccer, translated for Americans. World Cup 2026 takes, big opinions, and gear that's actually worth it.",
};

export const links: TrackedLink[] = [
  // ---- The money links (featured = big button at the top) -------------
  {
    slug: "shop",
    title: "World Cup gear I rate",
    url: "/shop", // our own shop page - products live in lib/shopConfig.ts
    emoji: "🛍️",
    featured: true,
    section: "shop",
  },

  // ---- Affiliate links ("Gear I use") ---------------------------------
  // Replace with your real affiliate URLs (Amazon Associates, Fanatics, etc.)
  {
    slug: "boots",
    title: "The boots I rate",
    url: "https://example.com/affiliate-boots", // CHANGE ME
    emoji: "👟",
    section: "affiliate",
  },
  {
    slug: "jersey",
    title: "Where I get my jerseys",
    url: "https://example.com/affiliate-jersey", // CHANGE ME
    emoji: "⚽",
    section: "affiliate",
  },

  // ---- Your content ----------------------------------------------------
  {
    slug: "latest",
    title: "My latest video",
    url: "https://example.com/latest-video",    // CHANGE ME (update weekly!)
    emoji: "🎬",
    section: "content",
  },

  // ---- Socials (shown as a row of round chips under your name) ---------
  // These point to your real, registered accounts. Note X uses a shorter
  // handle (Socc4Americans) because the full name was unavailable there.
  { slug: "tiktok",    title: "TikTok",    url: "https://tiktok.com/@soccerforamericans",   section: "social" },
  { slug: "instagram", title: "Instagram", url: "https://instagram.com/soccerforamericans", section: "social" },
  { slug: "facebook",  title: "Facebook",  url: "https://facebook.com/soccerforamericans",  section: "social" },
  { slug: "x",         title: "X",         url: "https://x.com/Socc4Americans",             section: "social" },
  // No YouTube account yet - when you make one, uncomment and fix the handle:
  // { slug: "youtube",   title: "YouTube",   url: "https://youtube.com/@soccerforamericans",  section: "social" },
];

// Section headings shown on the page, in display order.
export const sectionTitles: Record<string, string> = {
  shop: "Shop",
  affiliate: "Gear I use",
  content: "Watch",
};

/** Look up a link OR shop product by its slug (used by the /go redirect). */
export function findLink(slug: string): { url: string } | undefined {
  return (
    links.find((l) => l.slug === slug) ??
    products.find((p) => p.slug === slug)
  );
}
