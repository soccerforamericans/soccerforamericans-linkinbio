/**
 * page.tsx - your public link-in-bio page (the thing visitors see).
 *
 * Notice that no button links directly to a shop or social network:
 * everything goes through /go/<slug> so the click gets counted first.
 * The page itself is plain, fast, static HTML - it loads instantly on
 * a phone, which matters because 95%+ of your visitors come from a
 * phone tapping your bio.
 */

import Image from "next/image";
import { site, links, sectionTitles } from "@/lib/siteConfig";

export default function HomePage() {
  const socials = links.filter((l) => l.section === "social");
  const featured = links.filter((l) => l.featured);
  const sections = Object.keys(sectionTitles); // shop, affiliate, content

  return (
    <main className="page">
      {/* ---- Header: crest, name, flag bar, tagline ---- */}
      <Image src="/logo.svg" alt={`${site.name} crest`} width={92} height={92} priority />
      <h1>{site.name}</h1>
      {/* A slim red-white-blue bar under the name - the "flag" accent */}
      <div className="flag-bar" aria-hidden="true" />
      <p className="tagline">{site.tagline}</p>

      {/* ---- Social chips (tracked, like everything else) ---- */}
      <nav className="socials" aria-label="Social media">
        {socials.map((s) => (
          <a key={s.slug} href={`/go/${s.slug}`} className="chip" title={s.title}>
            {s.title}
          </a>
        ))}
      </nav>

      {/* ---- Featured money links ---- */}
      {featured.map((l) => (
        <a key={l.slug} href={`/go/${l.slug}`} className="button featured">
          {l.emoji && <span className="emoji">{l.emoji}</span>}
          {l.title}
        </a>
      ))}

      {/* ---- Everything else, grouped by section ---- */}
      {sections.map((section) => {
        const items = links.filter((l) => l.section === section && !l.featured);
        if (items.length === 0) return null;
        return (
          <section key={section} className="group">
            <h2>{sectionTitles[section]}</h2>
            {items.map((l) => (
              <a key={l.slug} href={`/go/${l.slug}`} className="button">
                {l.emoji && <span className="emoji">{l.emoji}</span>}
                {l.title}
              </a>
            ))}
          </section>
        );
      })}

      <footer>
        Some links above are affiliate links - they support the channel at no
        cost to you. 💚
      </footer>
    </main>
  );
}
