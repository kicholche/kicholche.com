# Kicholche

Production target: GitHub Pages + Supabase Free.

## Files
- `index.html` — approved homepage layout
- `style.css` — screenshot-matched design system
- `app.js` — dynamic Supabase data, search, language selection and UI behavior
- `config.js` — public runtime configuration
- `admin.html` — Supabase Auth admin entry point
- `schema.sql` — historical bootstrap/reference SQL; the connected Supabase project is the source of truth

## Design rule
The approved homepage screenshot remains the visual master. Do not rearrange sections when adding content.

## Language rule
Support exactly Bengali, Hindi and English. The navbar stays English. The language selector appears on the homepage and persists in Local Storage.

## Security
Only the Supabase publishable key is used in browser code. Never put a service-role key in GitHub Pages. RLS remains the database security boundary.
