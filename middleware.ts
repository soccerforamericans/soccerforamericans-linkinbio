/**
 * middleware.ts - the bouncer for /stats.
 *
 * Runs BEFORE the stats page on every request to it, and demands a
 * password using "HTTP Basic Auth" - the browser's built-in login box.
 * No login form to build, nothing fancy: the browser asks for a
 * username and password, we check the password, done.
 *
 *   Username: admin
 *   Password: whatever you set as STATS_PASSWORD (in .env.local when
 *             running locally, or in Vercel's environment settings live)
 *
 * If no password is configured, we allow access during local
 * development (so you can play) but BLOCK the page in production
 * (so forgetting the setting never leaks your numbers).
 */

import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/stats"] };

export function middleware(request: NextRequest) {
  const password = process.env.STATS_PASSWORD;

  if (!password) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next(); // local machine, no password set - allow
    }
    return new NextResponse(
      "Stats are locked. Set the STATS_PASSWORD environment variable in Vercel.",
      { status: 503 },
    );
  }

  // The browser sends "Authorization: Basic <base64 of user:pass>".
  const expected = "Basic " + btoa(`admin:${password}`);
  if (request.headers.get("authorization") === expected) {
    return NextResponse.next(); // correct password - let them through
  }

  // Wrong/missing password: status 401 + this header = browser shows
  // its login popup.
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="stats"' },
  });
}
