# IEEE MIT-ADT — Final Admin Dashboard

A Cloudflare Pages + Functions admin-enabled version of the IEEE Student Branch MIT-ADT link website.

## Included
- Public Linktree-style website
- Secure server-side admin login
- Signed HttpOnly session cookie
- D1 persistent content database
- R2 image storage
- Links: add/edit/delete/reorder/publish
- Events: add/edit/delete/reorder/publish
- Announcements: add/edit/delete/reorder/publish
- Images: upload/delete
- Profile/appearance basics
- Dashboard statistics + activity log
- Same-origin checks for state-changing requests
- Login attempt throttling in D1
- Security headers + restrictive CSP
- `_routes.json` to keep static assets from unnecessarily invoking Functions

## Cloudflare setup
1. Create a D1 database named `ieee-mit-adt-db`.
2. Run `schema.sql`, then `seed.sql` against that database.
3. Create an R2 bucket named `ieee-mit-adt-media`.
4. Replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.jsonc` with the D1 database ID.
5. In Cloudflare Pages, connect the GitHub repository containing these files.
6. Add bindings: D1 binding `DB` -> your database; R2 binding `MEDIA` -> your bucket.
7. Add encrypted secrets: `ADMIN_PASSWORD` and a long random `SESSION_SECRET`.
8. Deploy. Admin URL: `/admin.html`.

Do not put passwords, session secrets, API keys, or Cloudflare tokens in GitHub.
