/**
 * layout.tsx - the outer shell every page shares (HTML skeleton,
 * fonts, metadata for link previews when you share your URL).
 */

import type { Metadata, Viewport } from "next";
import { site } from "@/lib/siteConfig";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} | Links`,
  description: site.tagline,
  // What shows up when someone pastes your link in a chat or post:
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Decorative pitch markings (center circle + halfway line)
            drawn behind every page. Purely visual - see globals.css. */}
        <div className="pitch" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
