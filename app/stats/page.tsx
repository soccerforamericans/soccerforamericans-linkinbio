/**
 * /stats - your private dashboard. Protected by a password (see
 * middleware.ts): the browser shows a login box before letting anyone in.
 *
 * Shows clicks per link for today / last 7 days / last 30 days, sorted
 * by what's performing best, so you can see at a glance which links
 * convert and which are dead weight.
 */

import { links } from "@/lib/siteConfig";
import { products } from "@/lib/shopConfig";
import { getClicksSince, usingSupabase } from "@/lib/storage";

// Always compute fresh numbers on every visit (never cache this page).
export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(now.getTime() - 7 * dayMs);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * dayMs);

  // One fetch covers all three windows - we filter in memory.
  const clicks = await getClicksSince(thirtyDaysAgo);

  // Count clicks per slug for each time window.
  const count = (slug: string, since: Date) =>
    clicks.filter((c) => c.slug === slug && new Date(c.clicked_at) >= since).length;

  // Page links and shop products both appear in the table.
  const rows = [...links, ...products]
    .map((l) => ({
      title: l.title,
      slug: l.slug,
      today: count(l.slug, startOfToday),
      week: count(l.slug, sevenDaysAgo),
      month: count(l.slug, thirtyDaysAgo),
    }))
    .sort((a, b) => b.month - a.month);

  const totals = {
    today: rows.reduce((sum, r) => sum + r.today, 0),
    week: rows.reduce((sum, r) => sum + r.week, 0),
    month: rows.reduce((sum, r) => sum + r.month, 0),
  };

  return (
    <main className="stats">
      <h1>Link stats</h1>
      <p className="sub">
        Clicks per link. Updated live - refresh anytime. ({now.toLocaleString()})
      </p>

      <table>
        <thead>
          <tr>
            <th>Link</th>
            <th style={{ textAlign: "right" }}>Today</th>
            <th style={{ textAlign: "right" }}>7 days</th>
            <th style={{ textAlign: "right" }}>30 days</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.slug}>
              <td>
                {r.title} <span style={{ opacity: 0.5 }}>/go/{r.slug}</span>
              </td>
              <td className="num">{r.today}</td>
              <td className="num">{r.week}</td>
              <td className="num">{r.month}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td>Total</td>
            <td className="num">{totals.today}</td>
            <td className="num">{totals.week}</td>
            <td className="num">{totals.month}</td>
          </tr>
        </tbody>
      </table>

      {!usingSupabase && (
        <p className="notice">
          Heads up: running on the <strong>local file backend</strong> (no
          Supabase configured). Fine for testing on your machine - but
          connect Supabase before going live, or production clicks won&apos;t
          be saved. See the README.
        </p>
      )}
    </main>
  );
}
