# CHANGELOG — vivinea-foundation-v1-2-r3-2 (six-language release, based on M4.1)

## 2026-11-20 — Six-language release r3.2: Russian as the sixth language (founder implementation authorization)

New working copy `vivinea-foundation-v1-2-r3-2/`, branch `r3.2-six-lang`,
from the protected M4.1 baseline (commit `e8d3149`, tag `v1.2-r3.1-m4.1`).
The M4.1 candidate, its tag, and its ZIP are preserved untouched as the
rollback point. Nothing pushed, nothing deployed; the current staging
repository is not modified by this release.

**Translation:** new `locales/ru.json` — all 279 keys translated from the
English source (same key order, 0 missing / 0 extra / 0 empty, verified by
script). The translation is an **assistant draft for founder review** —
it has NOT been reviewed by a qualified Russian reviewer and must not be
described as professionally verified. One draft error found and fixed
during verification: a Chinese word (框架) left in the `html.
why_only_one_is_open_each` value, corrected to «структура» and re-verified
(279 keys, 0 CJK characters remain). The five existing locales are
byte-identical to M4.1. Brand and product names preserved (VIVINEA,
Aesthetic Identity → «Эстетическая идентичность», BEFORE BECOMING kept in
English).

**Detection and selector:** `js/i18n.js` — `'ru'` added to `SUPPORTED`;
`normalize()` gains the `base === 'ru'` branch (so `ru`, `ru-RU`, `ru-*`
all resolve to `ru`); `index.html` selector gains
`<option value="ru">Русский</option>`. `localStorage` key `vivinea-lang`,
first-visit browser detection, English fallback, and manual-choice-wins
are unchanged.

**Fonts — the material finding:** Archivo and Newsreader have **no
Cyrillic subsets** (verified twice: Google Fonts css2 returns only latin /
latin-ext / vietnamese for both families — a Roboto control returns
cyrillic — and both served files contain 0/66 Russian codepoints). The
six-language proposal's §3.3 assumed otherwise; it is corrected in the
proposal file. Per the founder's decision (Option 1), the `ru` locale uses
Cyrillic-capable OFL companion fonts: **Inter** (sans, 400/500/600/700)
and **Noto Serif** (serif, 400/500/600 + italic 400) — 8 new self-hosted
static WOFF2 files (cyrillic subset only) + licence files `OFL-Inter.txt`
and `OFL-NotoSerif.txt`. Each file verified: declared weight ==
usWeightClass, no `fvar`, 66/66 Russian codepoints in cmap. Neither family
has an `opsz` axis, so no opsz pinning was needed. `css/main.css` gains 8
`@font-face` blocks (cyrillic unicode-range
`U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116`) and `:lang(ru)`
font-family rules scoped to the `ru` locale only (body → Inter first,
all Newsreader usages → Noto Serif first). Archivo and Newsreader are
untouched for the other five languages. The 7 punctuation glyphs the
cyrillic subsets do not contain (« · » × – — →) fall back to the hosted
Latin faces / system fonts, exactly as in the other languages (→ already
falls back to a system font in English today). No runtime Google Fonts
requests: 0 external requests, verified live.

**Verification:** 1,137 checks, ALL PASS, reported as four separate
suites (they overlap; not independent requirements) — full regression
`verify-r3-2.js` **667 checks** (base 441 + Russian section), hero
correction suite **80**, M5 page probe **73**, Stage C gap probe **297**,
plus the Russian typography screenshot script **20** (5 screenshots in
`r3-2-screenshots/`). First regression run had 56 failures, all probe
artefacts (the new section read `.page.active` by `id` — pages use
`data-page` — and read the H1 unscoped, always returning the home H1);
fixed in the script, candidate unchanged, re-run ALL PASS. Second run
crashed on a Playwright API misuse (two arguments to `page.evaluate`);
fixed in the script, candidate unchanged, re-run ALL PASS. Screenshots
eyeballed: Russian home 1440/375/320, Aesthetic 1440, About 375 — correct
Russian copy, Inter body / Noto Serif headings, no overflow, no clipping,
no missing glyphs. See the r3.2 completion report for the full record.

**Unresolved:** qualified human Russian review (translation stays
provisional); real-device QA (P0-5); cross-region no-VPN (P0-4);
final imagery; editorial review; social assets. Staging of this
candidate needs its own separate approval.

## 2026-11-18 — Stage B M4 correction: placed hero image must be visible (founder independent review finding)

Targeted M4 correction only, on the same working copy (branch
`r3.1-stage-b`, from tag `v1.2-r3.1-m4`). The pre-correction M4 ZIP and tag
are preserved as the rollback point. No image integrated; no M5; nothing
pushed, nothing deployed.

**Completion note (2026-11-18 ~17:53): the environment recovered** (the
VM was redeployed at ~16:53; Python writes, git writes, and the local
Chromium all work again). The correction was committed on branch
`r3.1-stage-b` and tagged `v1.2-r3.1-m4.1`; the corrected ZIP was exported
(see the M4.1 correction report for the commit hash and SHA-256). The full
regression was re-run on the corrected candidate: **441 checks, ALL PASS**
(script `~/workspace/pw-check/verify-m4.js`, final run log
`/tmp/m4-verify5.log`; the count is 441 rather than 439 because the
corrected swap test adds one check per width). The 80-check correction
suite was also re-run after recovery: **80 checks, ALL PASS** (final run
log `/tmp/m4-corr-verify3.log`). The environment failure that blocked the
commit, tag, ZIP, and regression between ~16:02 and ~16:53 is documented
in the correction report §5. Changed files: `css/main.css`, `js/main.js`
(code, 51 insertions, 0 deletions), `CHANGELOG.md`, `README.md`,
`TESTING-CHECKLIST.md` (documentation).

**Finding (founder-side independent review, temp red/green images):** the
approved-image simulation loaded (`naturalWidth` 2400 / 1200) but was not
visible — on desktop the `.hero-art--desktop` CSS composition covered the
loaded image; on mobile the `.hero-art--mobile` placeholder stayed visible
below the loaded image (two image regions, +469px). Root cause: M4's swap
test verified the file *loaded* (currentSrc/naturalWidth) but never verified
it was *visible*; the placement procedure said to remove the CSS-art divs in
the same commit as placement, but the candidate itself made no distinction
between the empty and placed states.

**Fix (2 files, 51 insertions, 0 deletions):**
- `css/main.css` — `.hero:has(.hero-picture img[src]) .hero-art { display:
  none; }`: the placeholder layers disappear the moment `src` is set, with
  or without JS (Safari 15.4+, Chrome 105+, Firefox 121+). `.hero--has-image
  .hero-art { display: none; }` is the same rule driven by JS for browsers
  without `:has()`. `.hero-picture:has(img[src]) { aspect-ratio: 4 / 5; }`
  (≤767px) holds the 4:5 art box from the moment `src` is set, so the mobile
  hero does not shift from the img's 16:10 attribute ratio (234px) to the
  loaded 4:5 file (469px) during load. The empty state is unaffected: with
  no `src`, no rule matches and the placeholder stays visible.
- `js/main.js` — new IIFE: adds `.hero--has-image` to `.hero` on successful
  image load (or immediately if already complete with `naturalWidth > 0`);
  on load failure removes the img's `src` and the source's `srcset`, so the
  slot reverts to the empty state (placeholder returns, no broken-image
  icon). Listeners are attached even in the empty state, so a `src` set
  later at runtime is covered.

**Verification (script `~/workspace/pw-check/verify-m4-correction.js`, 80
checks, ALL PASS — run before the VM's local Chromium stopped launching;
see the correction report §5 for the environment note):** temp red desktop /
green mobile images at 1440, 1024, 768, 375, 320 — correct source selection
(desktop >767px, mobile ≤767px), placeholder hidden (both layers
`display: none`), image actually visible (art-centre pixel sampled: exact
red `[200,30,30]` desktop, `[30,179,59]` green mobile), no duplicate region
(filled mobile hero height == empty hero height: 1071 at 375, 1089 at 320),
no layout shift loading → loaded at any width, H1/CTAs in viewport, no
overflow, empty state unchanged, failure recovery (missing file reverts the
slot, hero height back to 820), static-HTML simulation with JS and without
JS (`:has()`-only path — placeholder hidden, hero 900). Screenshots:
`m4-correction-full-1440.png`, `m4-correction-full-375.png`,
`m4-correction-hero-{1440,1024,768,375,320}.png` in `m2-screenshots/`.
Full 439-check M4 regression re-run is recorded as blocked in the
correction report §5 (local Chromium stopped launching at ~16:02; the
correction script's own empty-state checks at all five widths plus
`node --check` and the unchanged mapping/keys cover the regression risk of
this 2-file change).

## 2026-11-18 — Stage B M4: empty, founder-controlled image slots (founder-approved D-M4-1–D-M4-6, empty-slot implementation only)

M4 continues in the same working copy on branch `r3.1-stage-b`, from the
accepted M3 candidate (tag `v1.2-r3.1-m3`). **No image was integrated.**
M4 builds empty slots only; every future image needs its own separate
approval before placement. `assets/assessment/mapping.json` untouched
(SHA-256 `ec6b28a82d26d6efe479a7838d20831a26ee67d7e0a4b15000daefa110958e62`,
unchanged); all 32 slots still `pending`. 279 keys in each locale, 0
missing / extra / empty; **no locale file changed**. M1 branding, M2
layout, and M3 typography preserved. Nothing pushed, nothing deployed.

### What changed (M4)

- **Hero image slot — empty (D-M4-2).** A single `<picture
  class="hero-picture">` element in the hero art grid area, mobile
  `<source media="(max-width: 767px)">` first, `<img>` fallback for
  desktop. Registry paths: desktop
  `assets/hero/hero-desktop-16x10.jpg` (2400 × 1500, 16:10), mobile
  `assets/hero/hero-mobile-4x5.jpg` (1200 × 1500, 4:5) — independently
  replaceable. The `<img>` carries `width="2400" height="1500"`,
  `fetchpriority="high"`, `decoding="async"`, `alt=""`,
  `aria-hidden="true"`, and **no `src`/`srcset`** (the paths are recorded
  in an HTML comment and in the slot registry); `src`/`srcset` are set
  only when a founder-approved file is placed. CSS: `.hero-picture`
  grid area + sizing, `object-fit: cover`, `object-position: 64% 55%`
  desktop / `50% 45%` mobile (starting values from the Option 3 brief
  §5, not irreversible constraints), mobile `order: 2`. The empty slot
  renders the existing CSS Observer placeholder composition; the final
  approved image and its mobile composition take precedence over the CSS
  sketch. **Empty-state safety, tested in Chromium before implementing:**
  an `<img>` without `src` makes no request and shows no broken-image
  indicator; the `.hero-picture img:not([src]) { height: 0; }` rule is
  required — without it, the `width`/`height` attributes reserve a 234px
  empty gap above the mobile headline (verified with a three-variant
  flex test: no-attrs + rule = 0px gap, attrs + rule = 0px gap, attrs
  without rule = 234px gap). The Option 3 brief was used as-is as the
  initial composition reference; it was not recreated or reinterpreted
  in M4.
- **Hero section label — localised (D-M4-4).** The hardcoded English
  `aria-label` ("Hero: The Observer — a quiet figure within a monumental
  architectural interior.") is replaced by `aria-label="Hero visual"`
  with `data-i18n-aria="hero_visual"`, served from the active locale
  dictionary in all five languages (en "Hero visual", zh-CN "主视觉",
  zh-TW "主視覺", ko "히어로 비주얼", ja "ヒーロービジュアル"). The hero
  image is treated as decorative (message carried by the heading and
  accompanying text); the picture stays `aria-hidden` with `alt=""`.
  The key `hero.img.aria` ("Placeholder for the hero visual, to be
  replaced by an approved original image") is **not** used as a
  user-facing label — per D-M4-4 it exposes internal asset-production
  language; it remains in the locales as the internal placeholder-state
  record.
- **Slot registry (D-M4-1).** `PENDING-ASSETS.md` is rewritten as the
  authoritative registry for Hero, editorial, and social assets:
  canonical paths, dimensions, format, focal point, status, version,
  SHA-256, approval reference, replacement history, alt rule. High-quality
  JPG is the **initial V1.2 default, not a permanent prohibition** on
  other founder-approved formats (D-M4-1 adjustment — this supersedes the
  contract's "JPG only" wording); no WebP/AVIF implementation in M4.
  The assessment mapping stays recorded separately and unchanged.
- **Asset directories.** `assets/hero/` and `assets/social/` created
  **empty** (no image files). `assets/editorial/` is **not** created —
  no editorial visual has been named (D-M4-3). **Git note:** empty
  directories are not retained by Git; the directories exist on disk and
  in the deliverable ZIP (which stores empty-directory entries), but a
  fresh Git clone will not contain them — the placement procedure creates
  the directory if absent. No `.gitkeep`-style marker is used, so nothing
  implies a file exists where none does.
- **Editorial slots (D-M4-3).** No editorial visual named; the four
  proposed locations (home §01/§02/§03, About) stay `to_be_named`
  documentation entries only. No new visual elements, no permanent aspect
  ratios, no change to the editorial content hierarchy.
- **Social slot (D-M4-6).** OG path `assets/social/og-image-1200x630.jpg`
  (1200 × 630, 1.91:1) reserved only. No image, no OG meta tags, no
  canonical URLs, no analytics, no marketing code.

### Deliberately not changed in M4

- No locale value changed (279 keys/locale); no JS change; no font
  change; no token change. No image integrated (0 image files in the
  candidate). No scoring, no AI code, no backend, no routing change, no
  new page, no new editorial section. No OG/social metadata. M5 not
  started.
- The Option 3 — The Observer visual brief was not recreated or
  reinterpreted; it stands as the initial composition reference, and the
  final founder-approved images (supplied separately) take precedence
  over the initial CSS study.
- P2 items not addressed (P2-2, P2-3, P2-4, P2-5) — still open.

### Verification (live, headless Chromium, 2026-11-18 — script `~/workspace/pw-check/verify-m4.js`, see the M4 completion report §6)

- M3 regression re-run (fonts, header, five languages × five widths, six
  pages × five widths, reduced-motion, keyboard, aria, no-JS, 0 external
  requests) plus M4 checks: empty slot makes 0 image requests and 0
  failed requests; hero section label localised in all five languages;
  `<picture>` swap verified with temporary local test files (never
  committed, deleted before commit); no layout shift from the empty slot
  (hero height identical to M3 at 1440/375); no editorial elements; no OG
  tags; mapping SHA unchanged. Full results in
  `vivinea-stage-b-m4-completion-report.md`.

## 2026-11-18 — Stage B M3: font weights, header, translation review, CJK typography (founder-approved D-M3-1–D-M3-6)

M3 continues in the same working copy on branch `r3.1-stage-b`, from the
accepted M2 candidate (tag `v1.2-r3.1-m2`). No image integrated; no
assessment activation, no scoring, no AI code, no backend, no routing
change, no new page, no deployment, no push. `assets/assessment/mapping.json`
untouched (SHA-256 `ec6b28a82d26d6efe479a7838d20831a26ee67d7e0a4b15000daefa110958e62`,
unchanged); all 32 slots still `pending`. 279 keys in each locale, 0
missing / extra / empty after the corrections. M1 copy and M2 visual
structure preserved.

### What changed (M3)

- **Font weights — corrected and replaced (D-M3-1, Option A).**
  Source: Google Fonts css2 API (official Google Fonts service) for
  Archivo and Newsreader; both fonts SIL OFL 1.1 (licence files
  `OFL-Archivo.txt` / `OFL-Newsreader.txt` already in the bundle;
  headers verified: "Copyright 2020 The Archivo Project Authors
  (https://github.com/Omnibus-Type/Archivo)", "Copyright 2020 The
  Newsreader Project Authors (http://github.com/productiontype/Newsreader)").
  **Correction to the remediation record:** the remediation report said
  body text declared at weight 400 "currently renders in SemiBold"
  because the three `archivo-normal-400-*.woff2` files report name
  "Archivo SemiBold", usWeightClass 600. That rendering conclusion was
  wrong. The three files are **variable fonts** (fvar present; Archivo
  wght axis min 100 / default 600 / max 900; Newsreader wght default
  400 with an opsz axis). Live browser measurement on the M2 candidate
  (Playwright Chromium) showed progressive widths at 32px — Archivo
  400 = 607.23, 500 = 618, 600 = 629.86, 700 = 650.75 — so the browser
  instantiates the variable font at the @font-face declared weight and
  body text was rendering at true Regular 400 all along. The defect was
  misleading file metadata (a variable font whose default instance is
  SemiBold 600, shared by four @font-face rules under a "400" filename),
  not wrong rendering. The remediation's file-metadata finding stands;
  its rendering conclusion is corrected here and in the M3 report.
  **Fix applied anyway, because the metadata was genuinely wrong and a
  declared weight must match its file:** the bundle now holds **18 true
  static files** built with fontTools `varLib.instancer` from the css2
  variable sources — Archivo static 400/500/600/700 × latin / latin-ext /
  vietnamese (12 files, replacing the 3 Archivo variable files) and
  Newsreader normal static 500/600 × 3 subsets (6 new files) — plus the
  **6 kept Newsreader 400 files (normal + italic × 3 subsets)**, whose
  embedded usWeightClass (400) already equals their declared weight.
  Family names normalised after instancing (instancer had kept "Archivo
  SemiBold" as the family base): name IDs now read family
  "Archivo"/"Newsreader", subfamily Regular/Medium/SemiBold/Bold.
  CSS: every @font-face src URL rewritten so the filename weight matches
  the declared weight. **Verified: all 24 @font-face blocks — declared
  weight == file usWeightClass, 0 mismatches, all 24 referenced files
  exist.** Live re-verification (393 checks, all pass): rendered widths
  at 32px match the M2 variable-font measurements (Archivo within 3px;
  Newsreader 500/600 within 15px — the static instances are baked at
  opsz 18, Google's pinned value, while the M2 variable rendered at
  opsz auto = 32px at that test size; same design, fixed optical size).
  The single `<em>` in the site is in a `.lede` paragraph (Archivo
  italic is synthesised oblique — pre-existing, out of M3 scope); the
  `.hero-head h1 em` rule has no matching element.
- **Header (D-M3-2)** — header children reordered in `index.html` to
  brand, nav, lang-wrap, menu-btn. CSS: `.brand` `margin-right: auto`
  removed; `.main-nav` gained `margin-left: auto`; `.lang-wrap`
  desktop `margin-left: auto` → `16px`; in the ≤1023px media query
  `.menu-btn { order: 2; }` and `.lang-wrap { order: 3; margin-left:
  auto; }` restore the M2 mobile visual order (brand, menu, selector).
  JS is ID/attribute-based and order-independent. The menu button sits
  between nav and lang-wrap in the DOM (order 2 / order 3 in the mobile
  media query) so the mobile keyboard tab order (menu, then selector)
  matches the mobile visual order. Verified live at
  1440/1024 (brand left, nav toward the right, selector at the far-right
  content edge) and 768/375/320 (M2 mobile order preserved, menu works).
- **No-JS fallback (D-M3-4, deferred)** — architecture preserved. A
  `<noscript>` block added immediately after `<body>` in `index.html`:
  "JavaScript is off in this browser. This preview needs JavaScript for
  page navigation and language switching — the home page below is shown
  in English." Plus a `.noscript-notice` rule in `css/main.css`
  (background `#FFF3CD`, color `#111111`, padding 12px 20px,
  border-bottom 1px solid `#111111`). No routing change, no separate
  no-JS application. Verified live with JavaScript disabled: notice
  visible, home renders in English, title "VIVINEA — Discover Yourself
  Through Art."
- **Translation review (D-M3-3)** — complete technical and linguistic
  draft review of all 279 keys × 5 languages (working table
  `/tmp/m3_i18n_table.txt`, 1954 lines; English: no errors, no EN values
  changed). **35 value replacements applied (31 distinct keys):**
  zh-TW 15, zh-CN 6, ko 8, ja 6 — full log in the M3 completion report
  (§5). Highlights: zh-TW Simplified-word errors removed (丰 in 3
  places, 制作 in 2 places; 0 remain); zh-TW 程式碼 → 代碼/編碼 for
  indicator/matrix codes (4 places); zh-TW + zh-CN R04 "細膩裝飾" →
  "細膩細節", V01 "時代引用" → "歷史參照", "低裝飾" → "裝飾剋制",
  "非尋常材料" → "不尋常的材料"; ko trade-off mistranslation fixed
  (교환 → 트레이드오프), 기술 → 역량 for "skills", dangling fragments
  completed (one_matrix_first_done_properly, the_ai_self_discovery_platform_exists);
  ja 決定論的採点 → 決定的採点 (philosophical determinism → the CS
  term), 姿勢 → 態度, dangling fragments completed. **T2 settled:**
  only ONE 五大身份矩陣 occurrence remains (key
  `five_identity_matrices`; M1's lede replacement removed the other);
  **身份 is kept** for consistency with the approved product term
  美學身份 (13 zh-TW keys use 身份 as product terminology; the 3
  generic keys use 身分）. Taiwan-reader confirmation remains open —
  recorded as an unresolved item. **Uncertain terminology reviewed and
  kept, documented:** zh-TW 對映 (scoring maps), 剋制， 舞臺； ko 자리
  표시자 (placeholder); ja エビデンスの連鎖 (evidence trail); ko
  결정적 채점 (standard CS term); zh-CN 指标代码. **Status: all four
  non-English languages are recorded as "provisionally reviewed"**
  (assistant draft review only). **No qualified human reviewer has
  reviewed any language; no native-speaker validation is claimed;
  final human-language acceptance stays open.** Do not block unrelated
  work on this: per D-M3-3 the font and responsive work proceeded.
- **CJK typography (D-M3-6)** — inspected all four CJK languages at
  1440 and 375 (screenshots `m3-home-{zh-CN,zh-TW,ko,ja}-{1440,375}.png`;
  measurements: no horizontal overflow anywhere; hero H1 line-height
  computes to 86.4px at 64px font (1.35 — the `:lang()` heading rule
  already wins over the hero's 1.06); kicker letter-spacing .16em reads
  as intentional editorial spacing). **One minimal, language-specific
  adjustment applied:** the hero lede is body text, so in CJK languages
  it now follows the same 1.75 body line-height as the rest of the page
  instead of the Latin 1.6 (`:lang(zh-CN|zh-TW|ko|ja) .hero-body .lede
  { line-height: 1.75; }`). The hero is content-driven, so the taller
  lede cannot clip. No other CJK adjustment was required; no new font
  family, no copy rewrite, no change to the approved artistic direction.

### Deliberately not changed in M3

- Editorial hierarchy (D-M3-5, deferred): no approved homepage content
  rewritten, no Concept C hierarchy changed — the M2 observation that
  the white sections feel like product documentation stays flagged for
  a separate future design review.
- No image integrated (M4 scope); 0 `<img>` tags; Option 3 CSS
  placeholder unchanged. No scoring, no AI code, no backend, no routing
  change, no OG tags, no `?lang=`, no domain, no staging, no push.
- P2 items not addressed (P2-2 anchor navigation semantics, P2-3
  invalid-hash normalisation, P2-4 single-fetch locale loading, P2-5
  dead CSS) — still open, listed in the M3 report.
- The two deprecated M1 Foundation label keys remain in the locales
  (unchanged, unreferenced).

### Verification (live, headless Chromium, 2026-11-18 — script `~/workspace/pw-check/verify-m3.js`, 393 checks, ALL PASS)

- Fonts: all 24 @font-face blocks match file weights; rendered widths
  progressive and matching M2 (see above); `document.fonts.check`
  true for all 7 used faces.
- Header order at 1440/1024/768/375/320; mobile menu works.
- Five languages × five widths: H1, both CTAs, lede, brand, hero
  black / H1 white, header dark / body white, 0 missing keys, no
  overflow; CJK hero-lede line-height ratio 1.75 verified at every
  width.
- Corrected translations render live (ja 決定的採点， zh-TW E01 豐，
  zh-TW V01 歷史參照）.
- Six pages × five widths: no overflow, correct active page,
  assessment inactive.
- Reduced-motion (page animation and bar transition off, navigation
  still works), 12 keyboard tab stops all showing a 2px solid focus
  outline, tab order nav-then-selector, aria (hero label, art/cut
  hidden from AT, current page marked, selector labelled).
- No-JS: notice visible, English home, English title.
- 0 external requests; fonts requested locally.
- Full-page home screenshots `m3-home-full-{1440,1024,768,375,320}.png`.

## 2026-11-18 — Stage B M2: Concept C cinematic layout (founder-approved D-M2-1–D-M2-5)

M2 continues in the same working copy on branch `r3.1-stage-b`, from the
accepted M1 candidate (tag `v1.2-r3.1-m1`). No locale file changed (279
keys, 0 missing/extra/empty); no copy changed; no image integrated; no
font, JS, or routing change. `assets/assessment/mapping.json` untouched
(SHA unchanged); all 32 slots still `pending`. Assessment still inactive.

### What changed (M2 — layout only)

- **Tokens (`css/main.css` `:root`)** — warm ivory removed: `--bg #F5F2EC`
  → `#FFFFFF`, `--surface #FCFAF5` → `#FFFFFF`, `--surface-2 #EFE9DC` →
  `#F4F4F4`, `--ink #222222` → `#111111`, `--muted #6E675C` →
  `#6E6E6E`, `--line #DCD3C1` → `#E8E8E8` (hairline), `--accent #8C4A2F`
  → `#111111`, `--accent-ink #FCFAF5` → `#FFFFFF`, `--btn #222222` →
  `#111111`, `--btn-ink #F5F2EC` → `#FFFFFF`, `--good #5F7050` →
  `#111111`, `--radius 14px` → `0`. New tokens: `--rule #111111`
  (strong rules), `--dark #0A0A0A`, `--dark-ink #F2F2F2`, `--dark-muted
  #9A9A9A`, `--dark-line #2A2A2A`, `--black #000000`. Post-M2 grep for
  the seven warm hex values in `css/main.css` returns 0 matches.
- **Header (all six pages)** — solid `#0A0A0A` ground (translucent
  warm header + blur removed), `1px #2A2A2A` bottom border; VIVINEA
  wordmark `#FFFFFF`; nav `#F2F2F2`, active item white text + `1px
  #FFFFFF` bottom border (pill background removed); hover `#1C1C1C`;
  language selector dark (`#0A0A0A` bg, `#2A2A2A` border, `#F2F2F2`
  text, square corners); Menu button dark with `#2A2A2A` border.
- **Nav collapse `860px` → `1023px`** (the Option 3 responsive fix for
  the 768px nav/selector overlap); the header-wrap breakpoint moves to
  `1023px` with it. Other `860px` layout breakpoints (hero-grid
  removed, grids, steps, split) are unchanged.
- **Hero (home, full-bleed, Option 3)** — the two-column `.hero-grid`
  and the dashed `.ph` hero placeholder are removed. New content-driven
  grid (`minmax(120px, 1fr) auto auto`; art spans all rows; headline
  row 2; lede/buttons row 3) so the hero height follows the copy and
  nothing can be clipped. Art layers are the Option 3 **CSS placeholder
  composition only** (corridor perspective, light shaft, mid-ground
  figure) — desktop 16:10, mobile 4:5, swapped at `767px`; mobile order
  headline → art → lede/buttons, no text overlaid on the small image.
  No `<img>` added. The desktop and mobile layers are separate elements
  so M4 can replace each independently. H1 `clamp(40px, 4.6vw, 64px)`
  (38px at ≤767px), `#FFFFFF`; lede `#F2F2F2`; brand line and small
  print `#9A9A9A`; hero buttons white-on-dark (`#FFFFFF` bg /
  `#0A0A0A` text, secondary transparent / `#FFFFFF` text and border).
- **Cinematic cut (D-M2-1)** — a short black band (`.cut`, `28px`
  desktop / `20px` mobile, `#000000`) between the dark hero and the
  white sections. No text, no unapproved intertitle copy, no tall
  empty band.
- **Light sections (all six pages)** — ground `#FFFFFF`, text
  `#111111`, secondary `#6E6E6E`. Every `.block` now opens with a `2px
  #111111` top rule (the bottom hairline is removed; the separator is
  the next section's top rule). Home below-fold sections carry numbered
  labels `01` / `02` / `03` (presentational, `aria-hidden`). Cards are
  flat white panels with `1px #111111` borders and square corners;
  chips square with `1px #111111` borders (the green/terracotta state
  colours are removed — state is carried by the label text); steps keep
  their `2px` top rule; matrix rows keep ruled hairlines.
- **Focus (D-M2-4)** — ground-aware: `2px #111111` on light,
  `2px #FFFFFF` on the dark header and hero. Dark-ground small text
  uses `#9A9A9A` (≈7.4:1 on `#0A0A0A`, passes WCAG AA) — the preview's
  `#6E6E6E` (≈3.8:1 on dark) is **not** used on dark grounds.
- **Square corners everywhere** — `999px` pill radii occur 0 times in
  the CSS after M2; `box-shadow` occurs 0 times (none existed before).
- **Motion (D-M2-5)** — the three existing lightweight transitions are
  preserved unchanged (`.page.active` fade + `translateY(6px)` `.35s`,
  `.bar-fill` width `.9s`, `.chev` rotate `.25s`) with the
  `prefers-reduced-motion` rules. No ripple, spring, touch-bounce, or
  decorative motion added.

### Deliberately not changed in M2

- No locale value changed (279 keys/locale); the hero placeholder keys
  (`hero_visual`, `placeholder_final_imagery_not_yet_produced`,
  `hero.img.aria`) are now unreferenced from HTML — they are **not**
  deprecated; they return in M4 with the `<picture>` slot (their
  values are unchanged in the locales).
- No font file, family, or weight changed (M3, D-B6). No `js/main.js`
  change (the nav collapse is CSS-driven). No assessment activation, no
  scoring, no AI code, no backend, no routing change, no new page.
- The naive HTML-parser "stray /body" note is pre-existing in M1 (same
  finding on the M1 file) and is not a browser finding; live Chromium
  rendering is the verification authority (see the M2 report).

## 2026-11-18 — Stage B M1: global VIVINEA branding and approved homepage copy (founder-approved D-B1–D-B5)

Working copy created 2026-11-18 from the r3-remediation folder (verified byte-identical by `diff -r`), on branch `r3.1-stage-b`. The r3 folder, r3 ZIP, November beta ZIP, V1.1 export, remediation folder/ZIP and live beta were not modified. This candidate is named `vivinea-foundation-v1-2-r3-1`. Git history lives inside this folder: tags `v1.2-r3` (unmodified r3 baseline) and `v1.2-r3-remediation` (remediation baseline) are preserved; M1 is committed on branch `r3.1-stage-b` and tagged `v1.2-r3.1-m1`. Nothing deployed. M2–M5 not started.

### What changed (M1 — words only; no CSS, JS, font, or image change)

- **Header wordmark (D-B1 + M1 brand change)** — key `ai_self_discovery` is now "VIVINEA" in all five locales (untranslated, same Newsreader serif / size / weight / spacing). The header sub-label element (`<span class="brand-sub">`, key `foundation_v1_1_preview`) was removed from `index.html` on all six pages. The header carries VIVINEA alone.
- **Footer notice (D-B2)** — key `ai_self_discovery_platform_foundation_v1` is now "Preview — the assessment is not open yet." in English, with drafted equivalents in zh-CN / zh-TW / ko / ja (see "Unreviewed drafts" below). The footer disclaimer (key `for_self_exploration_and_entertainment_not`) and the home small-print disclaimer (key `english_first_web_app_opens_in`) are unchanged in all five languages.
- **Hero kicker removed (D-B3)** — the `<p class="kicker">` element (key `foundation_v1_1_international_edition`) was removed from the home hero. The H1 is now the first hero element.
- **Browser title (D-B4)** — key `meta.title` is now "VIVINEA — Discover Yourself Through Art." in English, with the localised tagline per language (zh-CN approved, zh-TW / ko / ja drafts — see below). This supersedes the Stage B proposal's recommendation of "VIVINEA — Foundation V1.2", per the founder's approved decision.
- **Homepage copy (approved, verbatim)** — H1 key `html.discover_what_you_love_understand_what` is now "Discover Yourself Through Art." (zh-CN 「通过艺术，发现自己。」, etc.); lede key `an_ai_powered_self_discovery_platform` is now the approved platform description in each language (the zh-CN lede is the founder-supplied text in full — not shortened to match the English length); supporting paragraph added as a new key `hero_supporting` and placed as the intro of the "One matrix first, done properly" section below the fold; brand-expression line added as a new key `brand_expression` under the hero buttons ("Explore Yourself · Discover Aesthetics · Create Meaning").
- **About page (brand reference only)** — key `the_ai_self_discovery_platform_exists` now reads "VIVINEA exists…" (rest verbatim, including the remediation's future-tense ending ", once they are live."); key `html.it_is_also_the_foundation_of` now reads the podcast sentence (zh-CN founder-supplied, EN draft, zh-TW / ko / ja drafts — see below).
- **Key names preserved (D-B5)** — no existing active key was renamed. Two new keys added (`hero_supporting`, `brand_expression`): **277 → 279 keys in each locale, 0 missing / extra / empty**, verified by script and live. The two removed-from-HTML Foundation label keys (`foundation_v1_1_preview`, `foundation_v1_1_international_edition`) are **kept in all five locale files with their values unchanged**, for traceability, with no references from rendered HTML; they are marked deprecated in PENDING-ASSETS.md for later cleanup.

### Unreviewed drafts (flagged for the M3 translation review — no native-speaker review claimed)

- zh-TW / ko / ja hero equivalents (tagline, lede, supporting, brand expression — Stage A v1 drafts), zh-CN brand-expression line (draft), EN podcast sentence (draft), zh-TW / ko / ja podcast sentences (drafts), and the footer notice translations in zh-CN / zh-TW / ko / ja (new drafts in M1). Founder-supplied text (EN + zh-CN tagline, lede, supporting, podcast sentence) is verbatim and is not a draft.

### Deliberately not changed in M1

- `css/main.css`, `js/i18n.js`, `js/main.js` untouched (no Concept C redesign, no font change, no routing change). `assets/assessment/mapping.json` untouched (SHA unchanged); all 32 slots still `pending`. No image added or integrated; 0 `<img>` tags. Assessment still inactive; no scoring or AI code activated. "Foundation V1.2" still appears in two places outside the D-B1–D-B5 scope (the About "Foundation V1.2" section kicker and the Result page's placeholder text) — intentionally unchanged in M1.

## 2026-11-18 — Controlled technical remediation (founder-approved, audit-driven)

Working copy of Foundation V1.2 r3, created 2026-11-18 from the r3 folder (verified byte-identical by `diff -r`). The r3 folder, r3 ZIP (SHA-256 `f60ccd440a56c7cb2d19c94aad1ef385b6904b825e6365a897ab5fd63bdc29ed`), November beta ZIP, V1.1 export and live beta were not modified. This candidate is named `vivinea-foundation-v1-2-r3-remediation` — deliberately NOT "r3.1", because r3.1 is the founder's name for the separate Stage B brand/copy build. Git history lives inside this folder (see DEPLOYMENT.md): commit 1 = unmodified r3 baseline, tagged `v1.2-r3`; commit 2 = this remediation, tagged `v1.2-r3-remediation`. Nothing deployed.

### What changed

- **Homepage overflow fixed (audit P0-1)** — `css/main.css`: removed `white-space: nowrap` from `.chip`; `.card-top` now wraps (`flex-wrap: wrap`) with `min-width: 0` on its children. The "Aesthetic Identity · Preview" chip may wrap to two lines on narrow screens. Measured live (headless Chromium): before, home `scrollWidth` 395 at 375 px and 320 px; after, `scrollWidth == innerWidth` on all six pages at 1440 / 1024 / 768 / 375 / 320 px in English and in Japanese.
- **Traditional Chinese corrections (audit P0-2)** — `locales/zh-TW.json`, 19 keys changed (full log in the remediation report): 佔點陣圖 → 佔位圖 (4 short labels) / 佔位示意 (4 sentences); 聯絡 → 關聯 (1 key); 平臺 → 平台 (6 keys); 創始人 → 創辦人 (1 key). Generic-identity review: 身份 → 身分 in 3 keys (文化身份, 固定的身份, 永久的身份標籤); 身份 preserved in 14 keys — all approved product terminology (美學身份 and the four matrix names) and the framework term 五大身份矩陣 — with the two framework uses logged as pending Taiwan-reader confirmation.
- **Present-tense AI/scoring copy (audit §3.5)** — reworded to future tense in all five locales (`ai_reads_the_scored_profile_draws`, `the_ai_self_discovery_platform_exists`) and in the English fallback text in `index.html`. Assistant-drafted, unreviewed.
- **iPad Safari claim corrected (audit §3.5)** — `foundation_v1_1_checked_on_ipad` in all five locales (and the English fallback in `index.html`) now says the check is pending / not yet verified, instead of stating it as completed.
- **Disabled-button markup (audit P2-1)** — `index.html`: all 5 `disabled="None"` replaced with bare `disabled`. Behaviour unchanged (verified live: all five buttons still `disabled`).
- **Automatic dark mode removed (founder decision)** — deleted the `@media (prefers-color-scheme: dark)` block in `css/main.css` and the `<meta name="color-scheme" content="light dark">` in `index.html`. Verified live under dark-mode emulation: body background stays `#F5F2EC`. The future Concept C implementation will use a fixed dark-hero / light-editorial design, not whole-site dark mode.
- **Fonts investigated, not changed (audit P1-4)** — inspected all 9 WOFF2 files with fontTools. Finding: the three `archivo-normal-400-*.woff2` files are actually **Archivo SemiBold, weight 600** (name table "Archivo SemiBold", OS/2 usWeightClass 600), not weight 400 as their filenames say — so body text declared at weight 400 currently renders in SemiBold. The six Newsreader files are truly weight 400. CSS declares 24 @font-face rules (Archivo 400/500/600/700 and Newsreader 400/500/600, all pointing at the 400-named files), so Newsreader 500/600 is browser-synthesised bold and Archivo 700 is synthesised on top of a 600 file. Recommendation (for a later, separately approved step): obtain true Archivo 400/500/600/700 and Newsreader 500/600 WOFF2 files (same OFL licence), verify their embedded weights, and replace — or, alternatively, drop the CSS to the weights actually present. No font file was added or changed in this round.

### Deliberately not changed

- No VIVINEA header, no approved headline/copy, no Concept C tokens, no hero markup or image slots, no new images, no motion/ripple/spring effects (Stage A.6 stays deferred to the future app).
- `assets/assessment/mapping.json` untouched (SHA-256 unchanged); all 32 slots still `pending`.
- No i18n key renamed, added, or deleted: 277 keys in each locale, 0 missing/empty, verified by script and live (`__vivineaMissingKeys` empty after every switch).
- Navigation, six-page structure, and accessibility features unchanged. Version strings unchanged ("Foundation V1.2").

### Verification (live, headless Chromium, 2026-11-18)

- All six pages × five widths, en and ja: `scrollWidth == innerWidth` everywhere.
- Back/Forward, direct `#assessment`, invalid `#bogus` (shows home, leaves `#bogus` in the URL — known P2-3, unchanged).
- Mobile menu opens/closes at 375 px; choosing a page closes it.
- All five languages switch with 0 missing keys; persistence after reload verified for all five; rapid-switch race test (ko delayed 300 ms, ja 30 ms, pick ko then ja) ends in Japanese and stays Japanese after reload.
- Initial load: 8 requests, 0 failed, 0 external URLs; subresource transfer 292,061 bytes plus the 55,707-byte document.
- All five disabled buttons still disabled; assessment still inactive ("Question 1 of 16", start control disabled); no scoring/AI code activated.
- Not done in this round (still pending): native-speaker translation review; cross-region no-VPN test (Mainland China, Russia); real-device checks; Stage B.

## 2026-11-15 — Revision r3: Traditional Chinese added (founder-approved change request)

Five languages now: English (en, default), Simplified Chinese (zh-CN),
Traditional Chinese (zh-TW, new), Korean (ko), Japanese (ja). Based on
r2 (SHA-256 `e2124f1cc8caf3ce4cc60b3d370aac92d09b6ec6a4bdcd5a8110a81efcaada6`).
All r2 fixes retained: font paths (`../fonts/…`, 24 refs), language-switch
race guard (request-id in `js/i18n.js`), unified preview copy, header
brand “AI Self-Discovery” matching the V1.1 original. Nothing deployed;
the live beta is untouched.

### What changed

- **New `locales/zh-TW.json`** (24,460 bytes, 277 keys): every key from
  the English source, translated into natural Traditional Chinese with
  Taiwan-oriented terminology as the initial locale standard. It was
  produced by converting the approved zh-CN text with OpenCC `s2twp`
  (Simplified → Traditional, Taiwan phrases), then spot-checked key by
  key. Taiwan usage applied includes: 查看→檢視, 軟件→軟體, 信息→資訊,
  視頻→影片, 網絡→網路, 小程序→小程式, 激活→啟用, 交互→互動,
  測驗/測評 wording kept as 測評. No Simplified-only characters remain
  in any zh-TW value (checked by script). Protected names unchanged:
  VIVINEA, AI Self-Discovery, Aesthetic Identity, Before Becoming,
  Foundation V1.2, and all question / indicator IDs.
- **Language selector** (`index.html`, on all six pages via the shared
  header): added `<option value="zh-TW">繁體中文</option>` after
  简体中文. Five options now: English, 简体中文, 繁體中文, 한국어,
  日本語.
- **Detection** (`js/i18n.js`): `SUPPORTED` is now `['en', 'zh-CN',
  'zh-TW', 'ko', 'ja']`. `normalize()` maps `zh-TW`, `zh-HK`, `zh-MO`,
  and `zh-Hant*` to Traditional Chinese for now; `zh-CN`, `zh-SG`,
  and `zh-Hans*` map to Simplified Chinese; a bare `zh` still falls
  back to Simplified Chinese. Manual selection and `localStorage`
  persistence (`vivinea-lang`) are unchanged, and the r2 race guard
  still applies to all five languages.
- **Typography** (`css/main.css`): added `:lang(zh-TW)` rules —
  PingFang TC, Hiragino Sans TC, Microsoft JhengHei, Noto Sans CJK TC
  fallbacks, line-height 1.75 (headings 1.35), matching the zh-CN
  treatment. No CJK webfonts bundled, no external font requests.
- **Extensibility**: a separate Hong Kong locale needs only a new
  `locales/zh-HK.json` file plus one `SUPPORTED` entry and a
  `normalize()` line — no structural change. Documented in README.md.

### Verification (local HTTP server + jsdom, 2026-11-15)

- Key identity: **277 keys in each of the five locale files, 0 missing,
  0 extra, 0 empty** (checked by script against the English keys).
- Selector shows 5 options; switching en → zh-CN → zh-TW → ko → ja →
  en works, nav translates in all five (zh-TW: 首頁 / 探索 / 美學),
  missing keys `[]` after every switch; saved-language persistence
  verified.
- Detection mapping verified via saved preferences: `zh-HK`, `zh-MO`,
  `zh-Hant`, `zh-TW` all load as zh-TW; `zh-CN`, `zh-SG` load as zh-CN.
- Race guard re-checked with zh-TW slow (300 ms) vs ja fast (30 ms),
  pick zh-TW then ja: ends in Japanese everywhere, refresh shows
  Japanese.
- Six pages activate via hash in all languages tested; HTTP 200 for
  `index.html`, CSS, both JS files, all 5 locale JSONs, mapping, and
  all 9 fonts (resolved from the CSS location).
- External runtime URLs in code: 0. Assessment still inactive: 32
  slots, all pending, no images, no selections stored, no results.
- Original V1.1 export SHA-256 verified unchanged at the end:
  `d77bd49d8cffba24cd21d54d61f5b12d4644a193d8d718537a6f5907c00ab918`;
  r2 ZIP unchanged
  (`e2124f1cc8caf3ce4cc60b3d370aac92d09b6ec6a4bdcd5a8110a81efcaada6`).

### Still pending (progress)

- zh-TW copy review: **not started** — the Traditional text was
  converted from approved zh-CN and spot-checked, but has NOT been
  reviewed by a Traditional Chinese / Taiwan reader. Founder /
  native-speaker review required before the candidate is considered
  complete (see PENDING-ASSETS.md §4).
- 360px / real-device rendering: **not started** — CSS inspected only;
  no real iPhone / iPad / desktop rendering check in any language yet,
  including zh-TW line wrapping.
- Cross-region no-VPN access (Mainland China, Russia): **not started**
  — fresh testing required before any deployment approval.
- zh-CN / ko / ja copy review: **not started** (unchanged from r2).
- 32 assessment images: **pending** — all slots unfilled; Q001-B redo
  still outstanding.
- Public domain: **pending founder decision**; nothing purchased,
  registered, or configured.

## 2026-11-15 — Revision r2 (second code review)

Based on the font-fixed V1.2 ZIP (SHA-256
`7954eeea113998532013fcaccd2da0b0151d3534054f0cb28e31a858f503d4c2`).
The font-path fix is retained unchanged: all 24 font URLs in
`css/main.css` are `url('../fonts/…')`, re-verified 9/9 unique WOFF2
files returning 200 with `font/woff2` when resolved from the CSS
file's location. Nothing was deployed; the live beta is untouched.

### 1. Language-switch race — fixed (`js/i18n.js`)

Defect: `setLang()` had no ordering guard, so two overlapping locale
loads resolved in arrival order — the *earlier* selection won if its
request was slower. Reproduced on r1 with a delayed-fetch harness
(ko delayed 300 ms, ja delayed 30 ms, user picks ko then ja): the page
ended in Korean (`html lang=ko`, selector `ko`, `localStorage
vivinea-lang=ko`) and a refresh stayed Korean — wrong.

Fix: a monotonically increasing request id. Each `setLang()` call
takes the next id; only the newest request may apply its dictionary,
set the selector, or write `localStorage`. A superseded response —
including its error fallback to English — is ignored entirely.

Verified on r2 with the same harness, both directions:
- ko slow (300 ms) → ja fast (30 ms), pick ko then ja: after both
  resolve, `html lang=ja`, selector `ja`, stored `vivinea-lang=ja`,
  nav ホーム / 探索 / 美学, missing keys `[]`; fresh load with the
  stored value shows Japanese.
- Reversed (ja slow 300 ms → ko fast 30 ms, pick ja then ko): ends in
  Korean everywhere, fresh load shows Korean.

### 2. Assessment-preview copy — unified in all four languages

Audit finding: the Assessment and Result pages already said clearly
that they are previews (“The assessment is not open yet”,
“Preview — not active”, “Result · Preview”, “Layout preview only”),
but the places a visitor sees *before* clicking said the opposite:
the Aesthetic card chip read “Open · MVP” / “已开放 · MVP”, the home
hero button read “Start with Aesthetic Identity” / “从美学身份开始”,
and the How-it-works step said “the only matrix open in this
release”. Those implied the assessment was open. Changed keys
(English HTML defaults updated to match; 277 keys per locale, 0
missing, 0 empty after the change):

| Key | en | zh-CN | ko | ja |
|---|---|---|---|---|
| `open_mvp` (card chip, home + Explore) | Aesthetic Identity · Preview | 美学身份 · 预览 | 미학 정체성 · 미리보기 | 美学アイデンティティ · プレビュー |
| `start_with_aesthetic_identity` (home hero button) | View the Aesthetic Identity preview | 查看美学身份预览 | 미학 정체성 미리보기 | 美学アイデンティティのプレビューを見る |
| `see_the_assessment_format` (button into Assessment) | View the assessment preview | 查看测评预览 | 평가 미리보기 보기 | アセスメントのプレビューを見る |
| `start_with_aesthetic_identity_the_only` (How-it-works step) | Start with Aesthetic Identity — the only matrix available as a preview in this release. | 从美学身份开始——这是本版本唯一可预览的矩阵。 | 미학 정체성으로 시작하세요 — 이번 릴리스에서 미리보기로 제공되는 유일한 매트릭스입니다. | 美学アイデンティティから始めましょう — 今回のリリースでプレビューとして提供される唯一のマトリックスです。 |
| `aesthetic_identity_result_layout` (Result page heading) | Aesthetic portrait — example | 美学画像示例 | 미학 프로필 예시 | 美学ポートレートの例 |

Unchanged because already clear: `assessment_placeholder`
(“Assessment · Placeholder”), `the_assessment_is_not_open_yet`,
`assessment.preview_not_active`, `result_preview` (“Result ·
Preview”), `preview_the_result_layout`, `preview_the_result_layout_instead`,
`html.layout_preview_only_the_values_below`. No remaining “Open ·
MVP” / “only matrix open” wording in the UI or locales. New
preview strings were drafted by the assistant and still need founder
review (see PENDING-ASSETS.md §4).

### 3. Wordmark — correction, no header change

Earlier delivery reports said this candidate “preserved the existing
VIVINEA text wordmark”. That was wrong, and is corrected here.
Checked against the approved V1.1 original export
(`workspace/your_files/ai-self-discovery-platform-foundation-v1-1/
ai-self-discovery-platform-foundation-v1-1.html`, SHA-256
`d77bd49d8cffba24cd21d54d61f5b12d4644a193d8d718537a6f5907c00ab918`):
- Original header (line 299): `<span class="brand-name">AI
  Self-Discovery</span>`, subtitle “Foundation V1.1 · Preview”,
  `<title>` “AI Self-Discovery Platform — Foundation V1.1”, footer
  “AI Self-Discovery Platform — Foundation V1.1 preview”.
- “VIVINEA” occurs **0 times** in the V1.1 original export, **0
  times** in the November beta index, and **0 times** in this
  candidate's `index.html` and locale files.
- Conclusion: the candidate header already matches the original
  exactly, so it was **not changed** in r2. The one related change:
  the brand name is no longer translated in the zh-CN / ko / ja
  locale files (it previously became “AI 自我发现” / “AI 자기 발견” /
  “AI セルフディスカバリー”); it now reads “AI Self-Discovery” in all
  four languages, as in the original. The page `<title>` translation
  was left as in r1 and is flagged for translation review.
- Open founder decision, not a defect: whether the header brand should
  become VIVINEA in a future revision (see PENDING-ASSETS.md §1).

### Verification after r2 (local HTTP server, 2026-11-15)

- DOM test (jsdom over local HTTP): all six pages activate via hash;
  en → zh-CN → ko → ja → en switching works, nav translates, missing
  keys `[]` after every switch; saved-language persistence verified.
- HTTP: `index.html`, CSS, both JS files, all 4 locale JSONs, mapping,
  and all 9 fonts return 200.
- External runtime URLs in `index.html` / `css/` / `js/` / `locales/` /
  `assets/`: `https://` / `http://` / Google Fonts / `github.io` = 0.
- Assessment still inactive: 32 slots in `mapping.json`, all
  `status: "pending"`, `image: null`; no selections stored, no results
  generated, no images generated or substituted.
- Original V1.1 export SHA-256 verified unchanged at the end:
  `d77bd49d8cffba24cd21d54d61f5b12d4644a193d8d718537a6f5907c00ab918`;
  r1 ZIP SHA-256 unchanged
  (`7954eeea113998532013fcaccd2da0b0151d3534054f0cb28e31a858f503d4c2`);
  November beta ZIP unchanged
  (`a3a0a6065e67c58f5ac087b53dee46f30a0414bc9f3eb7e4c9c51152d0e3f1fd`).

### Still pending (progress)

- 360px / real-device rendering: **not started** — CSS inspected
  only (grids collapse to one column at small widths); no real
  iPhone / iPad / desktop rendering check in any language yet.
- Cross-region no-VPN access (Mainland China, Russia): **not started**
  — fresh testing required before any deployment approval.
- zh-CN / ko / ja copy review (including the new preview strings in
  §2 above): **not started** — founder / native-speaker review
  required before the candidate is considered complete.
- 32 assessment images: **pending** — all slots unfilled; Q001-B redo
  still outstanding.
- Public domain: **pending founder decision**; nothing purchased,
  registered, or configured.

## 2026-11-15 — Font path correction (first code review)

Defect found by the founder on first code review of the V1.2 ZIP
(SHA-256 `6ab98e707e6b9cf119cb58cc1739246a16a6efb3a96f2b2498649cce50b90496`,
now superseded): `css/main.css` referenced fonts as
`url('fonts/…woff2')`, which resolves relative to the CSS file to the
non-existent `css/fonts/…` — every `@font-face` file would 404 in a
browser. The earlier HTTP check had requested `/fonts/…` directly, so
it missed this; the correction was verified from the CSS file's
location this time.

Fix (targeted correction only, no redesign):
- All 24 `url('fonts/…')` references in `css/main.css` changed to
  `url('../fonts/…')`. `css/main.css` grew from 27,564 to 27,636 bytes
  (+72 bytes = 24 × 3 characters). No other file changed except this
  changelog and TESTING-CHECKLIST.md.
- No remaining `url('fonts/` reference in the candidate; the only
  `url()` values in the CSS are the 24 corrected font URLs (9 unique
  files).

Verification after the fix (local HTTP server, 2026-11-15):
- Defect reproduced before the fix: `css/fonts/archivo-normal-400-latin.woff2`
  returned 404; after the fix the same check is no longer referenced by
  any file, and all 9 unique WOFF2 files resolve from the CSS location
  as `/fonts/…` with HTTP 200 and `font/woff2` (24/24 references resolve
  on disk from `css/`).
- All relative asset paths rechecked: `index.html` → `css/main.css`,
  `js/i18n.js`, `js/main.js`; `js/i18n.js` fetches
  `locales/<lang>.json` via `document.baseURI` — all return 200, as do
  all 4 locale JSONs and `assets/assessment/mapping.json`.
- DOM test (jsdom over local HTTP): all six pages activate via hash
  (`#home`, `#explore`, `#about`, `#aesthetic`, `#assessment`,
  `#result`); language switching en → zh-CN → ko → ja → en works, nav
  translates (e.g. zh-CN 首页 / 探索 / 美学, ko 홈 / 탐색 / 미학,
  ja ホーム / 探索 / 美学), `localStorage vivinea-lang` persists, a
  fresh load with a saved Korean choice loads Korean, missing keys `[]`
  after every switch. (jsdom reports its own unimplemented `scrollTo`;
  unrelated to the site.)
- No external runtime font requests: `https://` / `http://` /
  `fonts.googleapis.com` / `fonts.gstatic.com` / `github.io` = 0 in
  `index.html`, `css/`, `js/`, `locales/`, `assets/`; the only network
  call in JS is the local locale fetch.
- i18n coverage unchanged: 277 keys per locale, 0 missing, 0 empty;
  mapping still 32 slots, all pending.
- Original exported HTML SHA-256 verified unchanged at the end:
  `d77bd49d8cffba24cd21d54d61f5b12d4644a193d8d718537a6f5907c00ab918`.
- Still not verified: 360px real-device rendering; cross-region
  no-VPN testing in Mainland China and Russia; founder review of
  zh-CN / ko / ja translations. Nothing deployed; live beta untouched.

## 2026-11-15 — Foundation V1.2 candidate (conditionally approved build)

Source: November 2026 beta candidate
`vivinea-november-beta-2026-11/index.html`, 63,015 bytes.
Original exported HTML (Foundation V1.1):
`workspace/your_files/ai-self-discovery-platform-foundation-v1-1/ai-self-discovery-platform-foundation-v1-1.html`,
53,917 bytes,
SHA-256 `d77bd49d8cffba24cd21d54d61f5b12d4644a193d8d718537a6f5907c00ab918`
— verified unchanged at the start and at the end of this build.

### Correction applied (founder, 2026-11-15)

The earlier “Visual Design Archive / logo” discussion was misunderstood.
The founder was referring to the future public website URL and custom
domain, NOT to designing a logo or wordmark. Consequences in this build:
- Existing VIVINEA brand name and V1.1 text wordmark preserved; no logo
  invented; logo creation is not a prerequisite for technical development.
- No hardcoded GitHub Pages address anywhere in `index.html`, `css/`, or
  `js/`; relative asset paths only. A custom domain can later be pointed
  at the same static files. No domain purchased, registered, or configured.
- Visual Design Archive / logo remains listed as pending for later
  integration in PENDING-ASSETS.md, but the build was not blocked on it.

### Split from a single file

- `index.html` (55,608 bytes) + `css/main.css` (27,564 bytes) +
  `js/i18n.js` + `js/main.js` (original navigation logic, unchanged in
  behaviour). The inline `<style>` and `<script>` from V1.1 were moved
  out, not rewritten, except for the V1.2 additions listed below.
- Version labels updated to V1.2 where they identify the current
  candidate (brand sub, title, footer, About kicker, Sample chip, layout
  preview banner). The historical roadmap step “Foundation V1.1 checked
  on iPad Safari” was kept as V1.1.

### Multilingual (new)

- 277 translation keys in each of `locales/en.json`, `locales/zh-CN.json`,
  `locales/ko.json`, `locales/ja.json`. Missing keys across the four files:
  0 (verified by script against the keys used in `index.html`).
- Language selector: compact `<select id="langSelect">` in the header,
  on all six pages, keyboard-accessible, `aria-label` translated.
  No-reload switching; `localStorage` key `vivinea-lang`; first-visit
  detection from `navigator.language` only; manual choice takes
  precedence; English fallback for missing keys (missing keys are logged
  to `window.__vivineaMissingKeys`).
- English text remains in the HTML as the default, so the page is readable
  if JavaScript fails.
- Translations drafted from the approved English source; founder review
  required before the candidate is considered complete.

### Fonts

- Archivo + Newsreader WOFF2 files copied unchanged from the November
  beta candidate (9 files) with both OFL licence files. No Google Fonts.
- CJK: no webfonts bundled. System-font fallbacks added in CSS, plus
  `:lang(zh-CN)`, `:lang(ko)`, `:lang(ja)` line-height / wrapping rules.

### Assessment (prepared, not activated)

- Existing AES-Q001 placeholder pair kept unchanged.
- Added a preview grid for Q002–Q016: question number, display ID,
  pairing (Q002–Q005 confirmed, Q006–Q016 “Pairing to be determined”),
  and “Image pending” for both A and B slots. Every row is labelled
  “Preview — not active”.
- `assets/assessment/mapping.json`: 32 slots AES-Q001-A … AES-Q016-B,
  all `status: "pending"`, `image: null`. Pairings: Q001 M01×E01,
  Q002 M02×E02, Q003 M03×E03, Q004 M04×E04, Q005 H01×V01 confirmed;
  Q006–Q016 TBD.
- No selection is stored, no result is generated, no image was generated
  or substituted.

### CSS additions (V1.2 only)

- `.lang-wrap` / language selector styles, including a mobile layout
  (label hidden under 860px, selector kept usable).
- `.q-grid`, `.q-row`, `.q-head`, `.q-slots`, `.q-slot` for the
  assessment preview grid.
- CJK `:lang()` font and line-height rules.
- Existing V1.1 CSS (tokens, layout, focus-visible, reduced-motion) kept.

- `js/i18n.js` resolves locale files with
  `new URL('locales/' + lang + '.json', document.baseURI)` (not a bare
  relative `fetch`), so loading works from a domain root, a GitHub Pages
  subdirectory, and in test harnesses that require absolute URLs.
- DOM-tested (jsdom over local HTTP): language switching en → zh-CN →
  ko → ja → en, persistence of a saved Korean choice on a fresh load,
  hash navigation to Assessment, and 15 preview rows / 30 pending slots.

### Not changed

- Six pages, hash navigation, Design System V1.0 tokens, locked / Coming
  Soon states, Assessment placeholder state, Result illustrative state.
- No scoring, AI interpretation, real assessment, personalised results,
  accounts, community, commerce, new sections, or new images.
- Original Muse artifact, original exported HTML, November beta candidate,
  and live GitHub Pages beta: untouched, not deployed to, not reconfigured.
