# VIVINEA — Foundation V1.2

## This candidate: r3.1 — Stage B M4 (2026-11-18)

Stage B milestone M4 (empty, founder-controlled image slots), built on the accepted M3 candidate under founder approval of decisions D-M4-1–D-M4-6 (empty-slot implementation only). Folder `vivinea-foundation-v1-2-r3-1/`, branch `r3.1-stage-b`, tag `v1.2-r3.1-m4`. The M4 correction (2026-11-18, founder review finding) is implemented in this working copy, committed on branch `r3.1-stage-b` and tagged `v1.2-r3.1-m4.1` (see CHANGELOG.md and the M4.1 correction report for the commit hash and ZIP SHA-256). A single empty `<picture>` hero slot (mobile source first at 767px; desktop 2400×1500, mobile 1200×1500; no `src`/`srcset` until a founder-approved file is placed); hero section label now localised via `hero_visual`; `PENDING-ASSETS.md` rewritten as the authoritative slot registry; empty `assets/hero/` and `assets/social/` directories (no files). **M4 correction (2026-11-18, founder review finding):** when an approved image is placed, the CSS placeholder art layers now disappear (`:has(img[src])` + JS `hero--has-image` class), so the final artwork is actually visible instead of being covered (desktop) or duplicated (mobile); a failed image reverts the slot to the empty state. No image integrated, no editorial slot created, no OG tags, no scoring. 279 keys in each of the five locales, unchanged; assessment still inactive. See CHANGELOG.md for the change list. M5 is not in this candidate. Nothing in this folder is deployed.

## This candidate: r3.1 — Stage B M3 (2026-11-18)

Stage B milestone M3 (font weights, header, translation review, CJK typography), built on the accepted M2 candidate under founder approval of decisions D-M3-1–D-M3-6. Folder `vivinea-foundation-v1-2-r3-1/`, branch `r3.1-stage-b`, tag `v1.2-r3.1-m3`. True static Archivo 400/500/600/700 and Newsreader 500/600 font files replace the misleading variable-font files (the remediation's "renders in SemiBold" conclusion is corrected in CHANGELOG.md — live measurement proved the variable fonts instantiated at the declared weight); desktop header reordered to wordmark left, navigation right, language selector far-right; no-JS failure notice added; 35 translation corrections across zh-TW / zh-CN / ko / ja (all four non-English languages provisionally reviewed — no human reviewer yet, final acceptance open); one minimal CJK adjustment (hero lede line-height 1.75). 279 keys in each of the five locales, unchanged count; assessment still inactive; no image integrated. See CHANGELOG.md for the change list. M4–M5 are not in this candidate. Nothing in this folder is deployed.

## This candidate: r3.1 — Stage B M2 (2026-11-18)

Stage B milestone M2 (Concept C cinematic layout), built on the accepted M1 candidate under founder approval of decisions D-M2-1–D-M2-5. Folder `vivinea-foundation-v1-2-r3-1/`, branch `r3.1-stage-b`, tag `v1.2-r3.1-m2`. Dark cinematic hero (Option 3 CSS placeholder composition only — no image) with a short black cut into white fashion-editorial sections; dark global header; VIVINEA wordmark and approved homepage copy unchanged from M1; 279 keys in each of the five locales, unchanged; assessment still inactive. Layout only — no copy, font, image, scoring, or routing change. See CHANGELOG.md for the change list. M3–M5 are not in this candidate. Nothing in this folder is deployed.

## This candidate: r3.1 — Stage B M1 (2026-11-18)

Stage B milestone M1 (global VIVINEA branding and approved homepage copy), built from the r3-remediation candidate under founder approval of decisions D-B1–D-B5. Folder `vivinea-foundation-v1-2-r3-1/`, branch `r3.1-stage-b`, tag `v1.2-r3.1-m1`. The header reads VIVINEA on all six pages; the homepage carries the approved copy ("Discover Yourself Through Art."); the footer reads "Preview — the assessment is not open yet." plus the localised disclaimer; the Foundation version sub-label and hero kicker are removed. Words only — no CSS, JS, font, or image change. 279 keys in each of the five locales. See CHANGELOG.md for the change list. M2–M5 are not in this candidate. Nothing in this folder is deployed.

## This candidate: r3-remediation (2026-11-18)

A controlled technical remediation of r3, built from the 2026-11-18 readiness audit (P0/P1/P2) under founder approval. Folder `vivinea-foundation-v1-2-r3-remediation/`. The baseline r3 is preserved untouched (ZIP SHA-256 `f60ccd440a56c7cb2d19c94aad1ef385b6904b825e6365a897ab5fd63bdc29ed`); this folder carries its own git history — tag `v1.2-r3` is the unmodified r3 baseline, tag `v1.2-r3-remediation` is this corrected candidate. See CHANGELOG.md for the change list and DEPLOYMENT.md for rollback. Stage B (VIVINEA header, approved homepage copy, Concept C redesign, Option 3 hero) is still pending separate approval and is NOT in this candidate. Nothing in this folder is deployed.

Multilingual website interface candidate. English (default) + Simplified Chinese + Traditional Chinese (Taiwan-oriented) + Korean + Japanese — five languages.

## Source

- Starting point: approved Foundation V1.1 / November 2026 beta candidate
  `vivinea-november-beta-2026-11/index.html` (63,015 bytes).
  That file was copied, never edited in place. Its SHA-256 and the original
  exported HTML SHA-256 are recorded in CHANGELOG.md.
- Original Muse artifact `ai-self-discovery-platform-foundation-v1-1` was not
  modified. The live GitHub Pages beta was not touched, deployed to, or
  reconfigured by this build.

## What V1.2 is

- The same six pages, same hash navigation
  `#home`, `#explore`, `#about`, `#aesthetic`, `#assessment`, `#result`.
- A working five-language interface: a compact language selector in the
  header, on all six pages. Switching does not reload the page. The manual
  choice is saved in `localStorage` (`vivinea-lang`) and takes precedence
  over browser-language detection, which is used only on the first visit.
  English is the source language and the fallback for any missing key.
  The page is readable in English if JavaScript fails: English text is in
  the HTML by default.
- Assessment prepared, not activated: the existing AES-Q001 placeholder pair
  plus a preview grid for Q002–Q016. All 32 image slots are pending
  (`assets/assessment/mapping.json`). No selection is stored, no result is
  generated, no image was generated or substituted.
- Result page remains an illustrative preview only.
- Brand (header wordmark): the header shows **VIVINEA** on all six pages
  (Stage B M1, founder-approved D-B1; the V1.1 original showed
  “AI Self-Discovery” — see CHANGELOG.md r2 for that correction).
  No logo was invented. See PENDING-ASSETS.md.

## Correction — domain, not logo (founder, 2026-11-15)

The earlier “Visual Design Archive / logo” discussion was misunderstood.
The founder was referring to the future public website URL and custom
domain, not to designing a logo or wordmark. Logo creation is therefore
not a prerequisite for this technical build. The working beta remains the
GitHub Pages URL the founder reported. This candidate is compatible with
a future custom domain: relative asset paths only, no hardcoded GitHub
Pages address anywhere in `index.html`, `css/`, or `js/`. No domain was
purchased, registered, or configured. Domain selection and configuration
will be handled separately by the founder, and a custom domain can later
be pointed at the same static files (see DEPLOYMENT.md).

## File structure

```
vivinea-foundation-v1-2-r3-remediation/
  index.html
  css/main.css
  js/i18n.js
  js/main.js
  locales/en.json
  locales/zh-CN.json
  locales/zh-TW.json
  locales/ko.json
  locales/ja.json
  fonts/                  24 WOFF2 files + OFL-Archivo.txt + OFL-Newsreader.txt
  assets/assessment/mapping.json
  assets/hero/            empty directory (M4 slot; no files yet)
  assets/social/          empty directory (M4 OG reservation; no files yet)
  README.md
  CHANGELOG.md
  DEPLOYMENT.md
  TESTING-CHECKLIST.md
  PENDING-ASSETS.md
```

## Fonts

- Latin: self-hosted Archivo + Newsreader (WOFF2, OFL 1.1), 24 files:
  18 true static instances (Archivo 400/500/600/700 and Newsreader
  500/600, × latin / latin-ext / vietnamese) built in M3 from the
  official Google Fonts variable sources, plus the 6 Newsreader 400
  variable files (normal + italic × 3 subsets) whose embedded weight
  already matched. Every @font-face declared weight equals its file's
  usWeightClass (verified, 0 mismatches). No Google Fonts at runtime.
  See CHANGELOG.md (M3) for provenance and the correction to the
  remediation's font-rendering conclusion.
- CJK: no CJK webfonts are bundled (a full CJK weight is ~10–16 MB).
  CSS uses system-font fallbacks:
  zh-CN: PingF SC, Hiragino Sans GB, Microsoft YaHei, Noto Sans CJK SC;
  zh-TW: PingFang TC, Hiragino Sans TC, Microsoft JhengHei, Noto Sans CJK TC;
  ko: Apple SD Gothic Neo, Malgun Gothic, Noto Sans CJK KR;
  ja: Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, Noto Sans CJK JP.
  `:lang(zh-CN)`, `:lang(zh-TW)`, `:lang(ko)`, `:lang(ja)` rules adjust line-height and
  wrapping. This is a deliberate, documented trade-off.

## Translation

- 279 keys in each locale file. Every key present in `index.html` exists
  in `en.json`, `zh-CN.json`, `zh-TW.json`, `ko.json`, and `ja.json` — verified by script,
  missing keys: 0.
- Traditional Chinese (`zh-TW.json`, added in r3) uses Taiwan-oriented
  terminology as the initial standard (e.g. 檢視、軟體、資訊、影片、
  小程式、未啟用). Browser preferences `zh-TW`, `zh-HK`, `zh-MO`, and
  `zh-Hant` map to Traditional Chinese for now; the architecture stays
  extensible for a separate Hong Kong locale later (add a `zh-HK.json`
  file and a `SUPPORTED` entry — no structural change needed).
- Translations were drafted from the approved English source by the
  assistant. Stage B M3 (2026-11-18) completed a full assistant draft
  review of all 279 keys × 5 languages and applied 35 corrections
  (see CHANGELOG.md and the M3 completion report); the four non-English
  languages are recorded as **provisionally reviewed** — no qualified
  human reviewer has reviewed any language yet, and final human-language
  acceptance stays open (see PENDING-ASSETS.md). Brand name VIVINEA and protected
  product / matrix names are unchanged in all languages. Question IDs
  (AES-Q001, AES_MIN_001, PER-Q001, etc.) are identical in all languages.

## What is NOT in V1.2

No scoring, no AI interpretation, no real assessment completion, no
personalised results, no user accounts, no community backend, no commerce
or checkout, no Cinema / Fashion Archive, no podcast section, no new
public navigation sections, no 32 assessment images.

## Validation (run before delivery — see TESTING-CHECKLIST.md)

Local HTTP server: `index.html`, `css/main.css`, `js/i18n.js`,
`js/main.js`, all 5 locale JSONs, and all 24 fonts returned HTTP 200.
JSON parses. Grep for external runtime URLs in `index.html` / CSS / JS:
0. Original export SHA-256 unchanged at the end of the build.
Cross-region testing from Mainland China and Russia without VPN has NOT
been done by Muse and must be done fresh before any deployment approval.
