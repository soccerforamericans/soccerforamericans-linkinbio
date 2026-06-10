/**
 * storage.ts - where click data gets saved and read back.
 *
 * Two backends, picked automatically:
 *
 *   1. SUPABASE (production) - used when SUPABASE_URL and
 *      SUPABASE_SERVICE_ROLE_KEY exist in the environment. Supabase is a
 *      free hosted Postgres database; see README for the 5-minute setup.
 *
 *   2. LOCAL FILE (development fallback) - with no Supabase configured,
 *      clicks append to data/clicks.json on your machine. Great for
 *      testing today; NOT suitable for the live site (Vercel's servers
 *      forget local files between visits).
 *
 * The rest of the app only calls recordClick() and getClicksSince() and
 * never knows which backend is underneath - so swapping in Supabase
 * later needs zero code changes, just two environment variables.
 *
 * This file must only ever be imported by server code (API routes and
 * server components) - the service role key is an admin password for
 * your database and must never reach the browser.
 */

import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";

export type Click = {
  slug: string;
  clicked_at: string; // ISO timestamp, e.g. "2026-06-10T18:30:00.000Z"
  referrer?: string | null; // which site sent the visitor (if known)
  country?: string | null;  // 2-letter code, provided free by Vercel
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when real database credentials are configured. */
export const usingSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);

const LOCAL_FILE = path.join(process.cwd(), "data", "clicks.json");

/** Save one click. Called by the /go/[slug] redirect. */
export async function recordClick(click: Click): Promise<void> {
  if (usingSupabase) {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);
    const { error } = await supabase.from("clicks").insert(click);
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
    return;
  }

  // Local fallback: read the JSON array, append, write it back.
  const existing = await readLocalFile();
  existing.push(click);
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(existing, null, 2));
}

/** All clicks since a given date. Called by the /stats page. */
export async function getClicksSince(since: Date): Promise<Click[]> {
  if (usingSupabase) {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);
    const { data, error } = await supabase
      .from("clicks")
      .select("slug, clicked_at, referrer, country")
      .gte("clicked_at", since.toISOString())
      .order("clicked_at", { ascending: false })
      .limit(50000);
    if (error) throw new Error(`Supabase select failed: ${error.message}`);
    return data ?? [];
  }

  const all = await readLocalFile();
  return all.filter((c) => new Date(c.clicked_at) >= since);
}

async function readLocalFile(): Promise<Click[]> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf-8"));
  } catch {
    return []; // file doesn't exist yet - that's fine, no clicks so far
  }
}
