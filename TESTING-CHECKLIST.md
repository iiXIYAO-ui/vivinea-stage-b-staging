# TESTING CHECKLIST — Foundation V1.2 (r3.1, Stage B M4 + correction)

Run on a local HTTP server first, then again on each staging host.
Tick each box only after actually checking it. Do not claim a pass
that was not tested.

## M4 correction — placed hero image must be visible (2026-11-18, founder independent review finding)

Verification script: `~/workspace/pw-check/verify-m4-correction.js`.
**80 checks, ALL PASS** (final run log `/tmp/m4-corr-verify2.log`; first run
had 5 failures, all test artefacts — the art-centre topmost-element check
counted the transparent headline/lede boxes and a trailing-dot string bug —
fixed in the script, candidate unchanged). Evidence screenshots:
`m4-correction-full-1440.png` (red hero, headline/CTAs readable),
`m4-correction-full-375.png` (green hero, single image region),
`m4-correction-hero-{1440,1024,768,375,320}.png` in `m2-screenshots/`.

- [x] Source selection at 1440 / 1024 / 768 / 375 / 320: desktop file above 767px (`naturalWidth` 2400), mobile file at or below 767px (`naturalWidth` 1200).
- [x] Final image actually visible, not merely loaded: art-centre pixel sampled from the screenshot — exact red `[200,30,30]` desktop, `[30,179,59]` green mobile (JPEG rounding ±1); topmost element at the art centre is never a placeholder layer.
- [x] Placeholder no longer visible when replaced: both `.hero-art` layers compute `display: none` at all five widths.
- [x] No duplicate image region on mobile: filled hero height == empty hero height (1071 at 375, 1089 at 320); desktop hero height == picture height (900 at 1440, 640 at 1024, 530 at 768).
- [x] No headline or CTA clipping: H1 + both CTAs in viewport at all five widths.
- [x] No horizontal overflow or unexpected layout shift: `scrollWidth == innerWidth` everywhere; hero height identical loading → loaded at every width.
- [x] Empty-state behavior unchanged: 0 image requests, 0 failed requests, 0 console errors; placeholder visible; mobile picture height 0.
- [x] Failure recovery: a missing file removes `src` + `srcset`, placeholder returns, `naturalWidth` 0, hero height back to empty state (820 at 1440).
- [x] Static-HTML simulation (src/srcset baked into the file, the founder's method): with JS and without JS, image loads (`naturalWidth` 2400), placeholder hidden, hero height 900 — the `:has()` rule alone carries the no-JS path.
- [x] Five languages, 279 keys, all 32 assessment mappings intact (`mapping.json` SHA `ec6b28a8…`, 32 slots all `pending`, all `image: null`).
- [x] Temporary test images deleted before commit (verified in-script; `git status` shows no new binary files).

**Environment recovery (2026-11-18 ~17:53):** the VM was redeployed at
~16:53 and the environment recovered (Python writes, git writes, and the
local Chromium all work again). The full regression was re-run on the
corrected candidate: **`~/workspace/pw-check/verify-m4.js` — 441 checks,
ALL PASS** (final run log `/tmp/m4-verify5.log`, exit 0; 441 rather than
439 because the corrected swap test adds one check per width — placeholder
hidden + picture box vs expected art area). The 80-check correction suite
was also re-run after recovery: **80 checks, ALL PASS** (final run log
`/tmp/m4-corr-verify3.log`). The environment failure between ~16:02 and
~16:53 (non-shell binary writes denied, Chromium SIGTRAP, Firefox
fallback download dead at 0 bytes) is documented in the M4.1 correction
report §5.

## M4 — empty image slots (2026-11-18, founder-approved D-M4-1–D-M4-6)

Verification script: `~/workspace/pw-check/verify-m4.js` (full M3 regression
+ M4 checks). **439 checks, ALL PASS** (final run log `/tmp/m4-verify2.log`;
first run had 5 failures, all test artefacts — see the M4 completion
report §6). Full-page home screenshots: `m4-home-full-{1440,1024,768,375,320}.png`
in `m2-screenshots/` (hero visually identical to M3: CSS Observer
placeholder, no empty gap, no broken-image indicator).

- [x] Empty slot: 0 image requests, 0 failed requests, 0 console/page errors at 1440 and 375 (the `<img>` without `src` makes no request).
- [x] Empty slot takes no space: picture height 0 on mobile flex; on desktop the picture box equals the art area (1440×820); hero height identical with the picture removed (820 at 1440, 1071 at 375) — no layout shift.
- [x] Swap test (temporary files, deleted before commit): desktop file loads at 1440 (`naturalWidth` 2400, `object-position: 64% 55%`); mobile file loads at 375 (`naturalWidth` 1200, `object-position: 50% 45%`); picture box matches the art area when filled (1440×900 desktop, 375×469 mobile). Temp files deleted; `git status` shows no new binary files.
- [x] Hero label localised in all five languages (en "Hero visual", zh-CN "主视觉", zh-TW "主視覺", ko "히어로 비주얼", ja "ヒーロービジュアル"); no-JS default is English "Hero visual".
- [x] Exactly 1 `<img>` tag (the empty hero slot): no `src`/`srcset`, `width="2400" height="1500"`, `fetchpriority="high"`, `decoding="async"`, `alt=""`, `aria-hidden="true"`. Mobile `<source media="(max-width: 767px)">` present, no `srcset`.
- [x] No editorial slot element; no OG / Twitter / canonical tags; no hardcoded beta URL.
- [x] Registry: `PENDING-ASSETS.md` is the authoritative record (paths, dimensions, JPG default not a prohibition, editorial `to_be_named` ×4, git empty-directory note).
- [x] `assets/hero/` + `assets/social/` exist and are empty; `assets/editorial/` does not exist.
- [x] `mapping.json` SHA unchanged (`ec6b28a8…`); 32 slots, all `pending`, all `image: null`.
- [x] 279 keys in each locale, 0 empty; no locale file changed.
- [x] M3 regression re-run in the same script (fonts, header, five languages × five widths, six pages × five widths, reduced-motion, keyboard, aria, no-JS, 0 external requests) — all pass.

### M4 empty-state compatibility evidence (pre-implementation, Chromium)

- `<img>` without `src`: 0 requests, 0 errors at 1440 and 375 (script `m4-img-src-test2.js`; the first run's single 404 console error was the test page's missing favicon, confirmed by re-running with a favicon handler).
- Mobile flex test (script `m4-flex-test3.js`): no-attrs + `img:not([src]) { height: 0 }` rule → 0px gap; attrs + rule → 0px gap; attrs WITHOUT the rule → 234px empty gap. The rule is therefore required and is in `css/main.css`.

## M3 — font weights, header, translation review, CJK typography (2026-11-18, headless Chromium, local HTTP — script `~/workspace/pw-check/verify-m3.js`, 393 checks, ALL PASS)

- [x] Fonts: all 24 @font-face blocks — declared weight == file
      usWeightClass, 0 mismatches, all 24 referenced files exist;
      rendered widths at 32px progressive and matching the M2
      variable-font measurements (Archivo within 3px; Newsreader
      500/600 within 15px — static instances baked at opsz 18 vs the
      M2 variable at opsz auto 32px); `document.fonts.check` true for
      all 7 used faces.
- [x] Header: at 1440 / 1024 — brand left, nav toward the right,
      language selector at the far-right content edge; at 768 / 375 /
      320 — M2 mobile order preserved (brand, menu, selector), menu
      opens/closes, no overlap.
- [x] Five languages × five widths (1440 / 1024 / 768 / 375 / 320):
      H1, both CTAs, lede, brand in viewport; hero black / H1 white;
      header dark / body white; 0 missing keys; no overflow anywhere;
      CJK hero-lede line-height ratio 1.75 verified at every width.
- [x] Corrected translations render live: ja 決定的採点， zh-TW E01
      豐 (not 丰), zh-TW V01 歷史參照.
- [x] Six pages × five widths: no overflow, correct active page,
      assessment inactive; `mapping.json` SHA unchanged.
- [x] Reduced-motion: page animation and bar transition off when
      `prefers-reduced-motion: reduce`, navigation still works.
- [x] Keyboard: 12 tab stops all show a 2px solid focus outline;
      tab order is nav buttons then language selector.
- [x] Aria: hero has aria-label; placeholder art and cut band hidden
      from AT; current page marked; selector labelled; disabled
      buttons present; 0 `<img>` tags.
- [x] No-JS (JavaScript disabled): failure notice visible, home
      renders in English, title "VIVINEA — Discover Yourself Through
      Art."
- [x] 0 external requests; fonts requested locally.
- [x] Full-page home screenshots `m3-home-full-{1440,1024,768,375,320}.png`.
- [ ] Real-device and Safari checks: NOT DONE (headless Chromium only).

## M2 — Concept C layout (2026-11-18, headless Chromium, local HTTP)

- [ ] Six pages × 1440 / 1024 / 768 / 375 / 320 px, en and ja:
      `scrollWidth == innerWidth` everywhere; header dark on all pages;
      hero dark on Home; sections white below; footer `#FFFFFF` with
      `1px #111111` top border.
- [ ] Five languages: 279 keys each, 0 missing / extra / empty;
      `__vivineaMissingKeys` empty after every switch; saved choice
      persists; race-guard re-run; no overflow at 375 px in any language.
- [ ] Hero: H1, lede, brand line, both CTAs fully inside the viewport
      at 1440 / 375 / 320; copy never clipped; mobile order headline →
      art → copy at ≤767 px; desktop art 16:10, mobile art 4:5.
- [ ] Header/nav: full nav at 1440 / 1024; Menu button at 1023 / 768 /
      375 / 320; menu opens/closes; no nav/selector overlap at 768 px.
- [ ] Contrast (computed): `#F2F2F2` / `#FFFFFF` / `#9A9A9A` on
      `#0A0A0A`; `#111111` / `#6E6E6E` on `#FFFFFF`; focus rings visible
      on dark and light grounds (keyboard tab-through).
- [ ] Assessment inactive: "Question 1 of 16" visible, start disabled;
      `mapping.json` SHA unchanged; 0 `<img>`; 0 external requests;
      0 failed requests.
- [ ] Tokens: 0 warm hex values in `css/main.css`; 0 `999px` radii;
      0 `box-shadow`; `.cut` is 28 px desktop / 20 px mobile, no text.
- [ ] Real-device and Safari checks: NOT DONE (headless Chromium only).

## 0. Revision r3 — verified 2026-11-15 (local HTTP + jsdom)

- [x] Five languages: en, zh-CN, zh-TW, ko, ja — 277 keys each, 0
      missing, 0 extra, 0 empty. Selector shows 5 options on all six
      pages; switching works in all five with 0 missing keys; saved
      choice persists.
- [x] Traditional Chinese: `locales/zh-TW.json` present; zh-TW nav
      reads 首頁 / 探索 / 美學; no Simplified-only characters in any
      zh-TW value; Taiwan-oriented terms used (檢視、軟體、資訊、影片、
      小程式、未啟用).
- [x] Detection mapping: saved `zh-HK`, `zh-MO`, `zh-Hant`, `zh-TW`
      all load as zh-TW; `zh-CN`, `zh-SG` load as zh-CN.
- [x] Race guard re-checked with zh-TW slow (300 ms) vs ja fast
      (30 ms): last selection (ja) wins everywhere, including after
      reload.
- [x] `:lang(zh-TW)` typography rules present (PingFang TC, Hiragino
      Sans TC, Microsoft JhengHei, Noto Sans CJK TC). Real-device
      rendering of zh-TW wrapping still not checked (see §2).
- [x] r2 fixes retained: font paths `../fonts/…` (9/9 WOFF2 200),
      preview copy in all five languages, header “AI Self-Discovery”.
- [x] Six pages activate via hash; no external runtime URLs in code;
      assessment inactive, 32 slots pending; original V1.1 export
      SHA-256 unchanged.

Run on a local HTTP server first, then again on each staging host.
Tick each box only after actually checking it. Do not claim a pass
that was not tested.

## 0. Revision r2 — verified 2026-11-15 (local HTTP + jsdom)

- [x] Language-switch race: ko request delayed 300 ms, ja 30 ms, pick
      ko then ja → page, selector, and `vivinea-lang` all stay Japanese
      after both resolve; refresh shows Japanese. Reversed test (ja
      slow, ko fast, pick ja then ko) ends in Korean. r1 failed this
      test (ended in Korean); r2 passes.
- [x] Preview copy in all five languages: home/Explore chip reads
      “Aesthetic Identity · Preview” (zh 美学身份 · 预览); home hero
      button “View the Aesthetic Identity preview”; Aesthetic-page
      button “View the assessment preview” (zh 查看测评预览); Result
      heading “Aesthetic portrait — example” (zh 美学画像示例). No
      “Open · MVP” wording remains in the UI or locales.
- [x] Wordmark: header “AI Self-Discovery” matches the V1.1 original
      (line 299); “VIVINEA” occurs 0 times in the original, the
      November beta, and this candidate's UI. Brand name is
      untranslated in all five locales.
- [x] Font-path fix retained from r1: 24 × `url('../fonts/…')` in
      `css/main.css`; 9/9 unique WOFF2 files return 200 with
      `font/woff2` resolved from the CSS location.
- [x] Six pages activate via hash; five languages switch with 0
      missing keys; saved-language persistence verified.
- [x] No external runtime URLs in code; assessment inactive, 32 slots
      pending; original V1.1 export SHA-256 unchanged.

Run on a local HTTP server first, then again on each staging host.
Tick each box only after actually checking it. Do not claim a pass
that was not tested.

## 1. Serving

- [ ] `index.html` loads over HTTP (not `file://`)
- [ ] `css/main.css` returns 200
- [ ] `js/i18n.js` returns 200
- [ ] `js/main.js` returns 200
- [ ] `locales/en.json`, `locales/zh-CN.json`, `locales/ko.json`,
      `locales/ja.json` each return 200 and parse as JSON
- [ ] All 24 WOFF2 files in `fonts/` return 200
- [ ] `assets/assessment/mapping.json` returns 200 and parses as JSON

## 2. Six pages (each language)

For each page — Home, Explore, About, Aesthetic Identity, Assessment,
Result — check:
- [ ] Page opens via its hash: `#home`, `#explore`, `#about`,
      `#aesthetic`, `#assessment`, `#result`
- [ ] Top / bottom navigation returns from every page
- [ ] Back / forward browser buttons work
- [ ] No horizontal scroll at 360px width
- [ ] No horizontal scroll at iPad width (768–1024px)
- [ ] No horizontal scroll at desktop width

## 3. Languages (all five: en, zh-CN, zh-TW, ko, ja)

- [ ] Language selector is visible in the header on desktop
- [x] Five languages in the selector (verified r3, 2026-11-15):
      English, 简体中文, 繁體中文, 한국어, 日本語 — on all six pages.
- [x] Browser-language mapping (verified r3, 2026-11-15): `zh-TW`,
      `zh-HK`, `zh-MO`, `zh-Hant` → Traditional Chinese; `zh-CN`,
      `zh-SG`, `zh-Hans` → Simplified Chinese; bare `zh` → Simplified
      Chinese. A separate Hong Kong locale can be added later without
      structural change.
- [ ] Language selector is usable on iPhone and iPad
- [ ] Switching language does not reload the page and does not change
      the current page/hash
- [ ] All navigation labels translate
- [ ] All headings, paragraphs, buttons, labels, and footer text translate
- [ ] Assessment and Result preview labels translate
- [ ] No English string remains untranslated in zh-CN / ko / ja
      (except protected names: VIVINEA, AES-Q001, AES_MIN_001, PER-Q001,
      and other IDs/codes, which are intentionally identical)
- [x] Preview wording is consistent before clicking (verified r2,
      2026-11-15): the Aesthetic card chip, home hero button, and
      assessment-entry button all say “preview” in all five languages;
      nothing promises that answering is open. (New strings still need
      founder review — see PENDING-ASSETS.md §4.)
- [ ] Language preference persists across page navigation (same session)
- [ ] Language preference persists after a page reload
      (`localStorage` key `vivinea-lang`)
- [x] Fast switching does not race (verified r2, 2026-11-15): pick a
      slow language then a fast one — the last selection wins in the
      page, the selector, and `vivinea-lang`, including after reload.
      Re-test on staging with throttled network if possible.
- [ ] First visit with no saved preference follows the browser language
      (test by clearing site data and setting the browser language)
- [ ] Manual choice takes precedence over browser detection
- [ ] Unsupported browser language falls back to English
- [x] Page is readable in English with JavaScript disabled
      (verified M3, 2026-11-18): home renders in English and a
      `<noscript>` failure notice is shown ("JavaScript is off in this
      browser. This preview needs JavaScript for page navigation and
      language switching — the home page below is shown in English.").
- [ ] CJK text renders correctly (no tofu boxes) in zh-CN, ko, and ja
- [ ] No text overflows buttons or cards in any language at 360px

## 4. Fonts

- [ ] Archivo / Newsreader render for Latin text
- [ ] No request to Google Fonts (`fonts.googleapis.com` /
      `fonts.gstatic.com`) in the network panel
- [ ] No external runtime request at all in the network panel
- [ ] CJK text falls back to system fonts (no large webfont download)
- [x] **Correction verified 2026-11-15 (first code review):** all 24
      font URLs in `css/main.css` use `../fonts/…` (CSS-relative);
      all 9 unique WOFF2 files return 200 with `font/woff2` when
      resolved from the CSS file's location; the old `css/fonts/…`
      path returns 404 and is referenced by nothing. The defect was
      that the URLs were `fonts/…`, which resolves to `css/fonts/…`.
      Re-verify on staging by checking the network panel for 200s on
      every WOFF2, not by requesting `/fonts/…` directly.
- [x] **Font weights corrected and replaced in M3 (verified
      2026-11-18):** 18 true static instances (Archivo 400/500/600/700,
      Newsreader 500/600 × 3 subsets) from the official Google Fonts
      variable sources (SIL OFL 1.1) + 6 kept Newsreader 400 variable
      files; all 24 @font-face blocks match their files' usWeightClass
      (0 mismatches); rendered widths match the M2 measurements (see
      the M3 section above). The remediation's "renders in SemiBold"
      conclusion is corrected in CHANGELOG.md (M3): live measurement
      proved the old variable files instantiated at the declared weight.

## 5. Assessment (must stay inactive)

- [ ] Assessment page shows the AES-Q001 placeholder pair
- [ ] Preview grid shows Q002–Q016, each with display ID, pairing
      (Q002–Q005 confirmed, Q006–Q016 “Pairing to be determined”),
      and “Image pending” for both A and B slots
- [ ] Every assessment control is disabled and labelled
      “Preview — not active” (translated)
- [ ] No selection can be made; nothing is stored
      (check: no assessment data in `localStorage` beyond `vivinea-lang`)
- [ ] No result is generated from the Assessment page
- [ ] `assets/assessment/mapping.json` has 32 slots, all
      `status: "pending"`, `image: null`

## 6. Result (must stay illustrative)

- [ ] Result page is clearly labelled as a preview
- [ ] Values are presented as illustrative placeholders only
- [ ] No scoring, AI report, or personalised result is produced

## 7. Accessibility

- [ ] Language selector is keyboard-accessible with a visible focus
- [ ] Navigation buttons are keyboard-accessible with visible focus
- [ ] `aria-label`s are present and translated (Pages, hero image,
      language selector)
- [ ] `prefers-reduced-motion` is respected (no page animation when set)
- [ ] Text contrast is sufficient in light mode
- [ ] Semantic HTML is preserved (header, nav, main, footer, headings)

## 8. Cross-region (fresh test required before deployment approval)

- [ ] Staging URL opens without VPN in Mainland China — all six pages
- [ ] Staging URL opens without VPN in Russia — all six pages
- [ ] Typography renders in both regions
- [ ] Failures recorded with page, region, and observed behaviour

## 9. No-regression

- [ ] Original Muse artifact untouched
- [ ] Original exported HTML SHA-256 unchanged
- [ ] November beta candidate untouched
- [ ] Live GitHub Pages beta untouched / not reconfigured
- [ ] No hardcoded beta URL or GitHub Pages address in `index.html`,
      `css/`, or `js/`
