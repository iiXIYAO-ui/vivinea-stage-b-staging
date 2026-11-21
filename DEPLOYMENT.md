# DEPLOYMENT — Foundation V1.2

Status: candidate package only. No deployment, publishing, account
creation, purchase, or configuration has been done. Do not deploy without
a separate explicit approval, and do not change the live GitHub Pages
configuration.

## Package

Upload the *contents* of the `vivinea-foundation-v1-2-r3-1/` folder — not the
folder itself — so `index.html` is at the site root. Keep the relative
structure: `css/`, `js/`, `locales/`, `fonts/`, `assets/`.

## r3.2 — six-language release (2026-11-20)

Upload the *contents* of the `vivinea-foundation-v1-2-r3-2/` folder instead.
File count is **52** (the 41 M4.1 files + `locales/ru.json` + 8 Cyrillic
WOFF2 files + `OFL-Inter.txt` + `OFL-NotoSerif.txt`). The ZIP has 61
entries (52 files + 9 directory entries). Staging of this candidate needs
its own separate approval; do not replace the files in the current staging
repository with this candidate until that approval is given.

## M4 — empty asset directories (Stage B M4, 2026-11-18)

- `assets/hero/` and `assets/social/` exist in the candidate **empty**
  (no image files). They are the documented homes for the hero files
  (`hero-desktop-16x10.jpg`, `hero-mobile-4x5.jpg`) and the reserved OG
  file (`og-image-1200x630.jpg`) when founder-approved files are supplied.
  `assets/editorial/` does **not** exist yet (no editorial visual named).
- **Empty directories and Git:** Git does not retain empty directories.
  The directories are present on disk and in the deliverable ZIP (the ZIP
  stores empty-directory entries), but they are not recorded in the Git
  history — a fresh clone will not contain them. That is expected and
  documented: `PENDING-ASSETS.md` (the slot registry) is the authoritative
  record that the paths exist, and the placement procedure creates the
  directory if absent. No `.gitkeep`-style marker file is used, so nothing
  implies a file exists where none does.
- The deployment ZIP `vivinea-foundation-v1-2-r3-1-m4.zip` was built
  without `.git/` and includes the empty `assets/hero/` and
  `assets/social/` directory entries (verify with `unzip -l`).

## Version history (git) — r3-remediation

- The remediation candidate folder contains a git repository (`.git/`).
  Commit 1 (tag `v1.2-r3`) is the unmodified r3 baseline; commit 2 (tag
  `v1.2-r3-remediation`) is the corrected candidate. No remote is
  configured; nothing was pushed.
- Rollback to the baseline: `git checkout v1.2-r3` (restores the working
  tree to the unmodified r3 files). Independent rollback artifact: the r3
  ZIP `vivinea-foundation-v1-2-r3.zip`, SHA-256
  `f60ccd440a56c7cb2d19c94aad1ef385b6904b825e6365a897ab5fd63bdc29ed`.
- **Exclude `.git/` from any upload/deployment package.** Upload only the
  candidate files (`index.html`, `css/`, `js/`, `locales/`, `fonts/`,
  `assets/`, docs). The deployment ZIP
  `vivinea-foundation-v1-2-r3-remediation.zip` was built without `.git/`.
- Do not force-push or overwrite an existing repository. If a remote is
  ever added, it must be a new repository; the live GitHub Pages beta
  must not be reconfigured.

## Cloudflare Pages (staging)

1. Dashboard > Workers & Pages > Create > Pages > Upload assets.
2. Project name, e.g. `vivinea-v12-staging`. Upload the folder contents.
3. Deploy. Open the `https://…pages.dev` URL and run the checks in
   TESTING-CHECKLIST.md.
4. To update, create a new deployment in the same project and upload the
   new contents. The URL stays the same.

## GitHub Pages (staging)

1. Create a public repository, e.g. `vivinea-v12-staging`. Upload the
   folder contents via Add file > Upload files (or `git add` / commit /
   push from a computer), keeping `css/`, `js/`, `locales/`, `fonts/`,
   `assets/` as subfolders.
2. Settings > Pages > Deploy from a branch, branch `main`, folder
   `/ (root)`. Save. Wait 1–2 minutes for the `https://<username>.github.io/<repo>/`
   URL.
3. Subdirectory compatibility: all asset paths in this candidate are
   relative (`css/…`, `js/…`, `locales/…`, `fonts/…`, `assets/…`), so
   the same files work at a domain root and under a repository subpath.
   No path in `index.html`, `css/`, or `js/` is hardcoded to a GitHub
   Pages address or to any beta URL.
4. Open the URL and run the checks in TESTING-CHECKLIST.md, then test
   from Mainland China and Russia without VPN.

## iPad-friendly workflow

First upload is easiest in a computer browser for both hosts. All
testing after that can be done in iPad Safari. No domain purchase is
needed for staging — use each host's own subdomain first.

## Future custom domain (founder-handled, not part of this build)

A custom domain can later be pointed at the same static files:
- On Cloudflare Pages: Pages project > Custom domains > Set up a custom
  domain, then add the DNS record the dashboard shows at the founder's
  DNS provider.
- On GitHub Pages: repository Settings > Pages > Custom domain, then add
  the DNS records GitHub shows at the founder's DNS provider.
- No domain was purchased, registered, or configured in this build.
  Domain selection and configuration will be handled separately by the
  founder. Do not treat any staging URL as the permanent public URL.

## Local testing (before any upload)

From the candidate folder, run a local static server (do not rely on
`file://` previews, which block `fetch` of the locale JSON files):

```
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/` and check all six pages, all five
languages, and the language selector. The same check was run during the
build validation (see TESTING-CHECKLIST.md).
