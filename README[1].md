# Kicholche – setup (₹0: GitHub Pages + Supabase Free)

## 1. Supabase
1. supabase.com → New project (free plan).
2. SQL Editor → paste `schema.sql` → Run (once only).
3. Project Settings → API → copy **Project URL** and **anon public** key.
4. Put them in `config.js`. Never use the `service_role` key. The anon key is safe because Row Level Security is on.

## 2. Add content
Supabase → Table Editor → open `government_updates`, `jobs`, `scholarships`, `results`, `schemes`, `form_fill_up`, `lottery_results`, `breaking_news` or `advice` → Insert row.
- Fill `title_bn`, `title_hi`, `title_en` (one row shows in the visitor's chosen language).
- `link` = official page (https only), `badge` = small label, `deadline` = form last date, `pinned` = show first, `published` = false to hide.
- `keywords` = extra words so search finds the same item in any language.

## 3. GitHub Pages
1. Upload all files to the repo `kicholche/kicholche.com` (Add file → Upload files → Commit).
2. Settings → Pages → Source: **Deploy from a branch** → `main` / root → Save.
3. Add a hero photo named `hero.jpg` next to `index.html` (Darjeeling train image).

## 4. Admin / Manager
Create users in Authentication → Users. Run the `insert into profiles ...` line at the bottom of `schema.sql` for each one (`admin` or `manager`). Staff can edit content in Table Editor.

## 5. Later: custom domain / paid hosting
No domain is hardcoded. Add the domain in Settings → Pages (GitHub adds a `CNAME` file). Moving to paid hosting = copy the same files. Supabase upgrade needs no code change.
