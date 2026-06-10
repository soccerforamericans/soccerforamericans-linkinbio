/**
 * The tracked-link redirect: yoursite.com/go/shop
 *
 * This is the heart of the whole site. Every button on your page points
 * HERE first instead of directly at the destination. We:
 *   1. look up which real URL the slug belongs to,
 *   2. log the click (timestamp, link, referrer, country),
 *   3. instantly forward the visitor to the real URL.
 *
 * The visitor experiences a normal click - the logging adds only a few
 * milliseconds. Because the counting happens on the server, it works
 * even for visitors with JavaScript disabled, and bots that don't
 * follow redirects mostly don't pollute your numbers.
 */

import { NextRequest, NextResponse } from "next/server";
import { findLink } from "@/lib/siteConfig";
import { recordClick } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const link = findLink(slug);

  // Unknown slug (old link, typo)? Send them to the homepage, not an error.
  if (!link) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Log the click - but NEVER let a logging problem break the redirect.
  // A lost click is annoying; a visitor hitting an error page costs money.
  try {
    await recordClick({
      slug,
      clicked_at: new Date().toISOString(),
      referrer: request.headers.get("referer"),
      // Vercel adds the visitor's country to every request for free.
      country: request.headers.get("x-vercel-ip-country"),
    });
  } catch (error) {
    console.error(`Failed to log click for "${slug}":`, error);
  }

  // Internal pages (like "/shop") redirect within our own site;
  // external links get UTM tags added first.
  const destination = link.url.startsWith("/")
    ? new URL(link.url, request.url)
    : withUtm(link.url);
  return NextResponse.redirect(destination, { status: 302 });
}

/**
 * Add UTM tags to outgoing links. UTM tags are small labels in a URL
 * (utm_source=...) that shops and affiliate dashboards read to credit
 * where a buyer came from - i.e. they prove YOUR bio drove the sale.
 * We only add them if the URL doesn't already have its own.
 */
function withUtm(url: string): string {
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("utm_source")) {
      parsed.searchParams.set("utm_source", "linkinbio");
      parsed.searchParams.set("utm_medium", "bio");
    }
    return parsed.toString();
  } catch {
    return url; // not a normal URL - pass it through untouched
  }
}
