-- Run once in Supabase: SQL Editor -> New query -> paste -> Run

create table if not exists profiles(
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'manager' check (role in ('admin','manager'))
);
alter table profiles enable row level security;
create policy "own profile" on profiles for select using (id = auth.uid());

create or replace function is_staff() returns boolean
language sql security definer stable set search_path = public as
$$ select exists(select 1 from profiles where id = auth.uid()) $$;

do $$
declare t text;
begin
  foreach t in array array['government_updates','jobs','scholarships','results','schemes','form_fill_up','lottery_results','breaking_news','advice']
  loop
    execute format('create table if not exists %I(
      id bigint generated always as identity primary key,
      title_bn text not null, title_hi text, title_en text,
      keywords text, link text, badge text,
      deadline date, date date default current_date,
      pinned boolean default false, published boolean default true,
      views int default 0, created_at timestamptz default now())', t);
    execute format('alter table %I enable row level security', t);
    execute format('create policy "public read" on %I for select using (published or is_staff())', t);
    execute format('create policy "staff write" on %I for all using (is_staff()) with check (is_staff())', t);
  end loop;
end $$;

create table if not exists site_settings(key text primary key, value jsonb);
alter table site_settings enable row level security;
create policy "public read" on site_settings for select using (true);
create policy "staff write" on site_settings for all using (is_staff()) with check (is_staff());

-- Make yourself admin AFTER creating your user in Authentication -> Users:
-- insert into profiles(id, role) select id, 'admin' from auth.users where email = 'YOUR_EMAIL';
