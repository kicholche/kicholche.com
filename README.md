# Kicholche

Production target: GitHub Pages + Supabase Free.

## Files
- `index.html` — approved homepage layout
- `style.css` — screenshot-matched responsive design
- `app.js` — Supabase data loading, official-link rendering, search, language selection and UI behavior
- `config.js` — public runtime configuration
- `admin.html` — Supabase Auth + CRUD dashboard for homepage content
- `schema.sql` — reproducible database/reference SQL

## Admin
Open `/admin.html` and sign in with the Supabase Auth account that is registered in `public.admin_users`.

The dashboard manages:
- Government Updates
- Jobs
- Scholarships
- Results
- Form Fill-up
- Schemes
- Lottery Results
- AI Tools
- Breaking News
- Quick Links

Create, edit and delete operations are protected by the database's admin RLS policies. The browser never receives a service-role key.

## Content
The connected Supabase project is the source of truth. Core public content tables are currently empty except for the existing AI Tools rows, so the homepage uses safe UI fallback/demo entries until verified records are added through the admin dashboard.

Do not publish invented government information. Add verified titles, dates and official URLs through Admin.

## Design rule
The approved homepage screenshot remains the visual master. Do not rearrange sections when adding content.

## Language rule
Support exactly Bengali, Hindi and English. The navbar stays English. The language selector appears on the homepage and persists in Local Storage.

## Security
Only the Supabase publishable key is used in browser code. Never put a service-role key in GitHub Pages. RLS remains the database security boundary, and unpublished content is not intended to be publicly readable.
