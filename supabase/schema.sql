-- Run this ONCE in Supabase's SQL Editor (left sidebar > SQL Editor >
-- New query > paste > Run). It creates the table that stores clicks.

create table if not exists clicks (
  id bigint generated always as identity primary key,
  slug text not null,                          -- which link was clicked
  clicked_at timestamptz not null default now(), -- when
  referrer text,                               -- which site sent the visitor
  country text                                 -- 2-letter visitor country
);

-- Speeds up the stats queries (filtering by date, grouping by link).
create index if not exists clicks_clicked_at_idx on clicks (clicked_at);
create index if not exists clicks_slug_idx on clicks (slug);

-- Lock the table down: with Row Level Security on and no policies,
-- ONLY our server (using the service role key) can read or write.
-- Random internet users with your public project URL get nothing.
alter table clicks enable row level security;
