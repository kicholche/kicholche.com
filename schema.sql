-- KICHOLOCHE / SUPABASE REFERENCE MIGRATION
-- The connected Supabase project is the source of truth.
-- This file is intentionally idempotent and only documents the core public-site
-- tables/policies required by the GitHub Pages frontend.

create extension if not exists pgcrypto;

create table if not exists site_settings(
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists government_updates(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  summary text,
  content text,
  image_url text,
  official_link text,
  language text default 'bn',
  is_published boolean default true,
  is_pinned boolean default false,
  views integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists jobs(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text,
  location text,
  description text,
  apply_url text,
  status text default 'published',
  created_at timestamptz default now()
);

create table if not exists scholarships(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text,
  published_on date,
  url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists results(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text,
  published_on date,
  url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists form_fill_up(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  deadline date,
  apply_link text,
  status text default 'running',
  language text default 'bn',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists schemes(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  eligibility text,
  benefits text,
  documents text,
  how_to_apply text,
  official_url text,
  image_url text,
  status text default 'published',
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists lottery_results(
  id uuid primary key default gen_random_uuid(),
  lottery_name text not null,
  result_date date,
  result_number text,
  result_text text,
  image_url text,
  pdf_url text,
  official_url text,
  status text default 'published',
  created_at timestamptz default now()
);

create table if not exists ai_tools(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  description text,
  icon text,
  route text,
  active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists breaking_news(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text,
  active boolean default true,
  priority integer default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists quick_links(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text,
  sort_order integer default 0,
  is_published boolean default true
);

create table if not exists translation_records(
  id uuid primary key default gen_random_uuid(),
  content_type text,
  content_id uuid,
  bn text,
  hi text,
  en text,
  status text default 'pending'
);

-- Public read boundary. Admin/manager writes are controlled by the
-- already-installed authentication/RLS layer in Supabase.
alter table government_updates enable row level security;
alter table jobs enable row level security;
alter table scholarships enable row level security;
alter table results enable row level security;
alter table form_fill_up enable row level security;
alter table schemes enable row level security;
alter table lottery_results enable row level security;
alter table ai_tools enable row level security;
alter table breaking_news enable row level security;
alter table quick_links enable row level security;
alter table translation_records enable row level security;

drop policy if exists public_read_government_updates on government_updates;
create policy public_read_government_updates on government_updates for select to anon using (is_published=true);

drop policy if exists public_read_jobs on jobs;
create policy public_read_jobs on jobs for select to anon using (lower(coalesce(status,'published'))='published');

drop policy if exists public_read_scholarships on scholarships;
create policy public_read_scholarships on scholarships for select to anon using (coalesce(is_published,true)=true);

drop policy if exists public_read_results on results;
create policy public_read_results on results for select to anon using (coalesce(is_published,true)=true);

drop policy if exists public_read_form_fill_up on form_fill_up;
create policy public_read_form_fill_up on form_fill_up for select to anon using (lower(coalesce(status,'running'))<>'expired');

drop policy if exists public_read_schemes on schemes;
create policy public_read_schemes on schemes for select to anon using (lower(coalesce(status,'published'))='published');

drop policy if exists public_read_lottery_results on lottery_results;
create policy public_read_lottery_results on lottery_results for select to anon using (lower(coalesce(status,'published'))='published');

drop policy if exists public_read_ai_tools on ai_tools;
create policy public_read_ai_tools on ai_tools for select to anon using (active=true);

drop policy if exists public_read_breaking_news on breaking_news;
create policy public_read_breaking_news on breaking_news for select to anon using (active=true and (starts_at is null or starts_at<=now()) and (ends_at is null or ends_at>=now()));

drop policy if exists public_read_quick_links on quick_links;
create policy public_read_quick_links on quick_links for select to anon using (coalesce(is_published,true)=true);

drop policy if exists public_read_translation_records on translation_records;
create policy public_read_translation_records on translation_records for select to anon,authenticated using (true);


-- Security hardening for the connected project: remove older permissive
-- public SELECT policies so unpublished records are not exposed by accident.
drop policy if exists "Public Read Government Updates" on government_updates;
drop policy if exists "Public Read Jobs" on jobs;
drop policy if exists "Public Read Scholarships" on scholarships;
drop policy if exists "Public Read Results" on results;
drop policy if exists "Public Read Form Fillup" on form_fill_up;
drop policy if exists "Public Read Schemes" on schemes;


-- Remove legacy duplicate permissive policies that overlap the hardened policies above.
drop policy if exists "admins manage ai tools" on ai_tools;
drop policy if exists "public read ai tools" on ai_tools;
drop policy if exists "admins manage breaking" on breaking_news;
drop policy if exists "public read breaking" on breaking_news;
drop policy if exists "admins manage jobs" on jobs;
drop policy if exists "public read published jobs" on jobs;
drop policy if exists "admins manage lottery" on lottery_results;
drop policy if exists "public read lottery" on lottery_results;
drop policy if exists "admins manage schemes" on schemes;
drop policy if exists "public read schemes" on schemes;
drop policy if exists "public read quick_links" on quick_links;
drop policy if exists "public read results" on results;
drop policy if exists "public read scholarships" on scholarships;
