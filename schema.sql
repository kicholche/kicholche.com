-- ==========================================================
-- KICHOLOCHE DATABASE SCHEMA V1
-- GitHub Pages + Supabase Free
-- ==========================================================

create extension if not exists pgcrypto;

-- ==========================================================
-- UPDATED_AT FUNCTION
-- ==========================================================

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ==========================================================
-- SITE SETTINGS
-- ==========================================================

create table if not exists site_settings (

id uuid primary key default gen_random_uuid(),

site_name text default 'Kicholche',

tagline text default 'সরকারের সব তথ্য, এক জায়গায়',

default_language text default 'bn',

created_at timestamptz default now(),

updated_at timestamptz default now()

);

-- ==========================================================
-- GOVERNMENT UPDATES
-- ==========================================================

create table if not exists government_updates (

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

-- ==========================================================
-- JOBS
-- ==========================================================

create table if not exists jobs (

id uuid primary key default gen_random_uuid(),

title text not null,

organization text,

last_date date,

apply_link text,

status text default 'Open',

language text default 'bn',

created_at timestamptz default now(),

updated_at timestamptz default now()

);

-- ==========================================================
-- SCHOLARSHIPS
-- ==========================================================

create table if not exists scholarships (

id uuid primary key default gen_random_uuid(),

title text not null,

provider text,

last_date date,

apply_link text,

language text default 'bn',

created_at timestamptz default now(),

updated_at timestamptz default now()

);

-- ==========================================================
-- RESULTS
-- ==========================================================

create table if not exists results (

id uuid primary key default gen_random_uuid(),

title text not null,

exam text,

result_link text,

language text default 'bn',

created_at timestamptz default now(),

updated_at timestamptz default now()

);

-- ==========================================================
-- FORM FILL UP
-- ==========================================================

create table if not exists form_fill_up (

id uuid primary key default gen_random_uuid(),

title text not null,

deadline date,

apply_link text,

status text default 'Running',

language text default 'bn',

created_at timestamptz default now(),

updated_at timestamptz default now()

);

-- ==========================================================
-- SCHEMES
-- ==========================================================

create table if not exists schemes (

id uuid primary key default gen_random_uuid(),

title text not null,

summary text,

official_link text,

language text default 'bn',

created_at timestamptz default now(),

updated_at timestamptz default now()

);

-- ==========================================================
-- LOTTERY
-- ==========================================================

create table if not exists lottery_results (

id uuid primary key default gen_random_uuid(),

title text not null,

draw_date date,

result_url text,

created_at timestamptz default now()

);

-- ==========================================================
-- MENUS
-- ==========================================================

create table if not exists menus (

id uuid primary key default gen_random_uuid(),

title text,

slug text,

sort_order integer default 0,

is_visible boolean default true

);

-- ==========================================================
-- SECTIONS
-- ==========================================================

create table if not exists sections (

id uuid primary key default gen_random_uuid(),

title text,

section_key text unique,

sort_order integer default 0,

is_visible boolean default true

);

-- ==========================================================
-- NOTIFICATIONS
-- ==========================================================

create table if not exists notifications (

id uuid primary key default gen_random_uuid(),

title text,

message text,

created_at timestamptz default now()

);

-- ==========================================================
-- ADS
-- ==========================================================

create table if not exists ads (

id uuid primary key default gen_random_uuid(),

slot text,

ad_code text,

enabled boolean default false

);

-- ==========================================================
-- ANALYTICS
-- ==========================================================

create table if not exists analytics (

id uuid primary key default gen_random_uuid(),

page text,

views integer default 0,

created_at timestamptz default now()

);

-- ==========================================================
-- MANAGERS
-- ==========================================================

create table if not exists managers (

id uuid primary key default gen_random_uuid(),

name text,

email text unique,

role text default 'manager',

created_at timestamptz default now()

);

-- ==========================================================
-- PERMISSIONS
-- ==========================================================

create table if not exists permissions (

id uuid primary key default gen_random_uuid(),

manager_id uuid references managers(id) on delete cascade,

section text,

can_view boolean default true,

can_add boolean default false,

can_edit boolean default false,

can_delete boolean default false,

can_publish boolean default false

);

-- ==========================================================
-- SEO
-- ==========================================================

create table if not exists seo_metadata (

id uuid primary key default gen_random_uuid(),

page_slug text unique,

seo_title text,

meta_description text,

canonical text

);

-- ==========================================================
-- TRANSLATIONS
-- ==========================================================

create table if not exists translation_records (

id uuid primary key default gen_random_uuid(),

content_type text,

content_id uuid,

bn text,

hi text,

en text,

status text default 'pending'

);

-- ==========================================================
-- UPDATED_AT TRIGGERS
-- ==========================================================

do $$
declare
    t text;
begin
    foreach t in array array[
        'site_settings',
        'government_updates',
        'jobs',
        'scholarships',
        'results',
        'form_fill_up',
        'schemes'
    ]
    loop
        execute format('drop trigger if exists trg_%s_updated on %I;', t, t);

        execute format(
        'create trigger trg_%s_updated
         before update on %I
         for each row
         execute function update_updated_at_column();',
         t, t
        );
    end loop;
end$$;

-- ==========================================================
-- RLS ENABLE
-- ==========================================================

alter table government_updates enable row level security;
alter table jobs enable row level security;
alter table scholarships enable row level security;
alter table results enable row level security;
alter table form_fill_up enable row level security;
alter table schemes enable row level security;

-- Public Read Policies

drop policy if exists "Public Read Government Updates" on government_updates;
create policy "Public Read Government Updates"
on government_updates
for select
using (true);

drop policy if exists "Public Read Jobs" on jobs;
create policy "Public Read Jobs"
on jobs
for select
using (true);

drop policy if exists "Public Read Scholarships" on scholarships;
create policy "Public Read Scholarships"
on scholarships
for select
using (true);

drop policy if exists "Public Read Results" on results;
create policy "Public Read Results"
on results
for select
using (true);

drop policy if exists "Public Read Form Fillup" on form_fill_up;
create policy "Public Read Form Fillup"
on form_fill_up
for select
using (true);

drop policy if exists "Public Read Schemes" on schemes;
create policy "Public Read Schemes"
on schemes
for select
using (true);

-- ==========================================================
-- DEFAULT DATA
-- ==========================================================

insert into sections(title, section_key, sort_order) values
('Government Updates','government_updates',1),
('Jobs','jobs',2),
('Scholarships','scholarships',3),
('Results','results',4),
('Schemes','schemes',5),
('Form Fill-up','form_fill_up',6),
('Lottery','lottery',7),
('AI Tools','ai_tools',8)
on conflict(section_key) do nothing;

insert into menus(title,slug,sort_order) values
('Home','/',1),
('Government Updates','/government-updates',2),
('Jobs','/jobs',3),
('Scholarships','/scholarships',4),
('Results','/results',5),
('Lottery','/lottery',6),
('Schemes','/schemes',7),
('Form Fill-up','/form-fill-up',8),
('Quick Links','/quick-links',9),
('AI Tools','/ai-tools',10)
on conflict do nothing;
