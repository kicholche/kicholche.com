# Kicholche – setup (GitHub Pages + Supabase Free)

The Supabase project `kicholche.com` is already set up and connected in `config.js`. Do not run any SQL.

## Add content
Supabase → Table Editor → insert rows in: `gov_updates`, `form_fillups`, `schemes`, `jobs`, `scholarships`, `results`, `lottery_results`, `breaking_news`.
- Write the title in Bengali in `title` (`lottery_name` for lottery).
- Show a row: `status = published` (`is_published = true` for scholarships/results). Form fill-ups use `upcoming`/`open`/`closing_soon`.
- Hindi/English: add rows in `translations` (`entity_id` = the row id, `language` = hi or en, `field_name` = title, `translated_text`).

## GitHub Pages
Upload all files to the repo, then Settings → Pages → Deploy from a branch → `main` / root. Add `hero.jpg` for the hero photo.
