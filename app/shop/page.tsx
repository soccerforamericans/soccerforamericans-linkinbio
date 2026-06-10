/**
 * /shop - your storefront page.
 *
 * Every "Shop on Amazon" button goes through /go/<slug> first, so your
 * stats page shows exactly which PRODUCTS people click - not just that
 * "the shop" got traffic. That's how you learn what your audience
 * actually buys before you ever hold inventory.
 */

import Link from "next/link";
import { site } from "@/lib/siteConfig";
import { products } from "@/lib/shopConfig";

export default function ShopPage() {
  return (
    <main className="page shop">
      <h1>{site.name} — the shop</h1>
      <p className="tagline">
        Gear I'd actually spend money on this World Cup. No junk.
      </p>

      <div className="shop-grid">
        {products.map((p) => (
          <div key={p.slug} className="product">
            <div className="product-emoji">{p.emoji}</div>
            <h2>{p.title}</h2>
            <p className="blurb">{p.blurb}</p>
            <p className="price">from {p.price}</p>
            <a href={`/go/${p.slug}`} className="button buy">
              Shop on Amazon
            </a>
          </div>
        ))}
      </div>

      <Link href="/" className="back">
        ← back to all links
      </Link>

      <footer>
        Prices are ballpark and set by the retailer. As an Amazon Associate
        I may earn from qualifying purchases — at no extra cost to you.
      </footer>
    </main>
  );
}
