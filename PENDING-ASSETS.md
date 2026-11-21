# PENDING ASSETS — Foundation V1.2

## Slot registry — authoritative record (Stage B M4, D-M4-1)

**This file is the authoritative registry for Hero, editorial, and social
assets** (founder decision D-M4-1, 2026-11-18). Every slot has one entry:
canonical path, dimensions, version, SHA-256, approval reference, status,
and replacement history. Code references the registry paths and nothing
else. The assessment mapping is recorded **separately** in
`assets/assessment/mapping.json` and is unchanged by M4 (§3 below).

### Approved adjustments to the M4 contract (M4 authorization, 2026-11-18)

The M4 Visual Asset Integration Contract
(`vivinea-stage-b-m4-visual-asset-integration-contract.md`) was approved
with these adjustments, which supersede the contract text where they differ:

- **D-M4-1 — format:** high-quality JPG is the **initial V1.2 default**,
  not a permanent prohibition on other founder-approved image formats. No
  WebP or AVIF implementation is required in M4. The registry records the
  format per slot (`JPG (default)` unless the founder approves otherwise).
- **D-M4-2 — focal values:** the specified dimensions and focal points are
  **starting specifications, not irreversible artistic constraints**. The
  final founder-approved image and its independently approved mobile
  composition take precedence over the temporary CSS Observer sketch.
- **D-M4-2 — empty state:** use whichever markup safely avoids invalid
  image requests and broken-image indicators. M4 was tested in Chromium:
  an `<img>` without `src` makes no request and shows no broken-image
  indicator; the `img:not([src]) { height: 0; }` rule is required (without
  it, the `width`/`height` attributes reserve a 234px empty gap above the
  mobile headline — verified). No active `<img>` without a source is
  required if testing had shown compatibility problems; testing showed
  none.
- **D-M4-3 — editorial:** no additional editorial visual has been formally
  named for M4. The four proposed locations stay `to_be_named`
  documentation entries only. No new visual elements, no permanent aspect
  ratios, no change to the editorial content hierarchy.
- **D-M4-4 — accessibility:** the Hero image is treated as decorative
  (its message is carried by the heading and accompanying text). The
  visible section label uses `hero_visual` ("Hero visual" / 主视觉 /
  主視覺 / 히어로 비주얼 / ヒーロービジュアル) — a meaningful localised
  label **without** internal asset-production language. The key
  `hero.img.aria` ("Placeholder for the hero visual, to be replaced by an
  approved original image") is **not** used as a user-facing label,
  because it exposes production language; it remains in the locales as the
  internal placeholder-state record. Assessment-image accessibility stays
  open for the separate assessment production gate; no label may reveal
  scoring indicators.
- **D-M4-5 — replacement / rollback:** every placement and replacement is
  recorded with a registry version, file hash, Git commit and tag; a
  recoverable pre-image state is maintained (the M4 empty-slot ZIP and tag
  `v1.2-r3.1-m4`); restoration procedures are documented in the M4
  completion report §7. The protected M3 baseline is never changed or
  overwritten.
- **D-M4-6 — social:** the 1200 × 630 social-image specification is
  reserved only. No image, social metadata, canonical URLs, analytics, or
  marketing code is added in M4. These remain subject to separate Social
  Traffic approval.

### Registry entries

Registry entry fields: `slot`, `path`, `dimensions`, `format`, `focal_point`,
`status` (`pending` / `reserved` / `to_be_named` / `filled`), `version`,
`sha256`, `file_size`, `approved` (date + approval reference), `replaces`
(previous version SHA, if any), `alt_rule`.

| Slot | Path | Dimensions | Format | Focal point | Status | Version | SHA-256 | Approved |
|---|---|---|---|---|---|---|---|---|
| Hero — desktop | `assets/hero/hero-desktop-16x10.jpg` | 2400 × 1500, 16:10 | JPG (default) | 64% across / 55% down (`object-position: 64% 55%`) — starting value | **pending** (empty slot, M4) | — | — | — |
| Hero — mobile | `assets/hero/hero-mobile-4x5.jpg` | 1200 × 1500, 4:5 | JPG (default) | 50% across / 45% down (`object-position: 50% 45%`) — starting value | **pending** (empty slot, M4) | — | — | — |
| OG / social image | `assets/social/og-image-1200x630.jpg` | 1200 × 630, 1.91:1 | JPG (default) | n/a (no crop; the whole frame is the card) | **reserved** (no file, no OG tags — D-M4-6) | — | — | — |
| Editorial — home §01 "One matrix first" | `to_be_named` | `to_be_named` | `to_be_named` | n/a | **to_be_named** (D-M4-3) | — | — | — |
| Editorial — home §02 "How it works" | `to_be_named` | `to_be_named` | `to_be_named` | n/a | **to_be_named** (D-M4-3) | — | — | — |
| Editorial — home §03 "Question numbering" | `to_be_named` | `to_be_named` | `to_be_named` | n/a | **to_be_named** (D-M4-3) | — | — | — |
| Editorial — About | `to_be_named` | `to_be_named` | `to_be_named` | n/a | **to_be_named** (D-M4-3) | — | — | — |
| Assessment — 32 slots (AES-Q001-A … AES-Q016-B) | `assets/assessment/mapping.json` (paths recorded per slot when produced) | Per the Visual Coding Manual (image-production gate) | Per-slot, at production | Per-slot, at production | **pending, unchanged in M4** (see §3) | — | mapping SHA `ec6b28a8…` | — |

Alt rules (D-M4-4): hero — decorative, `aria-hidden` + `alt=""`, section
label `hero_visual` (localised, five languages); future informative
editorial images — accurate localised `alt` text; future decorative
editorial images — empty `alt`; assessment images — policy open for the
image-production gate (no label may reveal scoring indicators).

Replacement history: none yet (all slots empty or reserved as of M4).
Every future placement/replacement adds a version row here with its SHA,
approval reference, and `replaces` value.

**Git note (founder requirement, M4 authorization item 5):** empty
directories are **not retained by Git**. `assets/hero/` and
`assets/social/` exist on disk and in the deliverable ZIP (the ZIP stores
empty-directory entries), but a fresh Git clone will not contain them — the
placement procedure creates the directory if absent. The registry above,
not the Git tree, is the authoritative record that the paths exist. No
`.gitkeep`-style marker file is used, so nothing implies a file exists
where none does.

---

## 0. M1 — deprecated locale keys (kept for traceability, 2026-11-18)

Stage B M1 (founder-approved D-B1–D-B5, clarification D-B5): the two
Foundation label keys are **kept in all five locale files with their
values unchanged**, but **no element in `index.html` references them
anymore** — they render nowhere.

- `foundation_v1_1_preview` ("Foundation V1.2 · Preview" / 预览版 /
  預覽版 / 미리보기 / プレビュー) — header sub-label, removed from HTML
  in M1 (D-B1).
- `foundation_v1_1_international_edition` ("Foundation V1.2 ·
  International Edition" / 国际版 / 國際版 / 국제판 / 国際版) — hero
  kicker, removed from HTML in M1 (D-B3).

Status: **deprecated**. Scheduled for cleanup in a later milestone
(delete from all five locale files together, with the key-identity
check re-run). Do not reuse these keys for new strings and do not
delete only some of them.

## 0a. Font weights — resolved in Stage B M3 (2026-11-18)

The remediation's font investigation (audit P1-4) found the three
`archivo-normal-400-*.woff2` files reported name "Archivo SemiBold",
usWeightClass 600, and concluded body text rendered in SemiBold. M3
proved that rendering conclusion wrong (live measurement: the files
are variable fonts and the browser instantiates them at the declared
weight — body text was rendering at true Regular 400 all along) and
replaced the bundle anyway, because the file metadata was genuinely
wrong: 18 true static instances (Archivo 400/500/600/700, Newsreader
500/600 × 3 subsets) built from the official Google Fonts variable
sources (SIL OFL 1.1), plus the 6 kept Newsreader 400 variable files.
All 24 @font-face blocks now match their files' usWeightClass
(verified, 0 mismatches). Status: **resolved** — see CHANGELOG.md (M3)
and the M3 completion report §4 for provenance and the correction.

## 0b. Russian companion fonts — added in r3.2 (2026-11-20)

Archivo and Newsreader have **no Cyrillic subsets** (Google Fonts css2
returns only latin / latin-ext / vietnamese for both families; both
served files contain 0/66 Russian codepoints — verified twice). Per the
founder's decision (Option 1), the `ru` locale uses self-hosted OFL
companion fonts: **Inter** (sans, 400/500/600/700) and **Noto Serif**
(serif, 400/500/600 + italic 400) — 8 static WOFF2 files, cyrillic
subset only, licences `fonts/OFL-Inter.txt` and
`fonts/OFL-NotoSerif.txt`. Each file verified: declared weight ==
usWeightClass, no `fvar`, 66/66 Russian codepoints. Neither family has
an `opsz` axis. The CSS wires them via 8 cyrillic `@font-face` blocks
(unicode-range `U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116`)
and `:lang(ru)`-scoped font-family rules only; Archivo/Newsreader are
untouched for the other five languages. The 7 punctuation glyphs the
cyrillic subsets do not contain (« · » × – — →) fall back to the hosted
Latin faces / system fonts, as in the other languages. Status:
**implemented in r3.2** — see CHANGELOG.md (r3.2) and the r3.2 completion
report §4 for provenance and verification.

## 1. Visual Design Archive / logo — corrected understanding

Founder correction (2026-11-15): the earlier “Visual Design Archive /
logo” discussion was misunderstood. The founder was referring to the
future public website URL and custom domain, NOT to designing a logo or
wordmark.

### Wordmark correction (second code review, 2026-11-15)

Earlier delivery reports said this candidate “preserved the existing
VIVINEA text wordmark”. That was wrong, and is corrected here.
Checked against the approved V1.1 original export
(`workspace/your_files/ai-self-discovery-platform-foundation-v1-1/
ai-self-discovery-platform-foundation-v1-1.html`, SHA-256
`d77bd49d8cffba24cd21d54d61f5b12d4644a193d8d718537a6f5907c00ab918`):
- The original header brand is `<span class="brand-name">AI
  Self-Discovery</span>` (line 299), subtitle “Foundation V1.1 ·
  Preview”, title “AI Self-Discovery Platform — Foundation V1.1”,
  footer “AI Self-Discovery Platform — Foundation V1.1 preview”.
- The string “VIVINEA” occurs **0 times** in the V1.1 original export,
  **0 times** in the November beta (`vivinea-november-beta-2026-11/
  index.html`), and **0 times** in this candidate's `index.html` and
  locale files.
- This candidate's header therefore already matches the original
  exactly, and was **not changed** in r2. The only related change in r2
  is that the brand name is no longer translated in the zh-CN / ko / ja
  locale files (it previously became “AI 自我发现” / “AI 자기 발견” /
  “AI セルフディスカバリー”); it now reads “AI Self-Discovery” in all
  five languages, as in the original.
- Open founder decision (not a defect): whether the header brand should
  become VIVINEA in a future revision. That needs a visual-identity
  decision and, if approved, a separate change; it is not part of V1.2.

- Logo creation is not a prerequisite for technical development, and
  this build was not blocked waiting for a Visual Design Archive.
- If a Visual Design Archive is supplied later, it can be integrated
  without rebuilding the technical foundation (localisation, routing,
  and assessment structure are independent of the logo asset).
- Status: pending for later integration, not blocking.

## 2. Future public website URL / custom domain

- Working beta (founder-reported): the GitHub Pages URL reported by the
  founder. It is deliberately not hardcoded anywhere in this candidate.
- No domain was purchased, registered, or configured in this build.
- Domain selection and configuration will be handled separately by the
  founder. A custom domain can later be pointed at the same static
  files; see DEPLOYMENT.md.
- Status: pending founder decision, not blocking.

## 3. Assessment images — 32 slots, all pending

- `assets/assessment/mapping.json` lists 32 slots, AES-Q001-A …
  AES-Q016-B, all `status: "pending"`, `image: null`.
- Q001–Q005 pairings confirmed; Q006–Q016 pairings to be determined.
- No image was generated, substituted, or taken from stock/AI sources.
- The 8 Q001–Q004 validation images exist separately in the goal files
  and are not yet integrated; Q001-B still awaits its redo (same chair,
  decoration on the chair itself, no extra props).
- **M4: unchanged.** The mapping file is byte-identical before and after
  M4 (SHA-256 `ec6b28a82d26d6efe479a7838d20831a26ee67d7e0a4b15000daefa110958e62`);
  no assessment image was integrated, and no assessment slot was touched.
- Status: pending separate approval and production.

## 4. Translation review — assistant draft review done in M3; human review still required before the candidate is complete

- 279 keys × 6 languages (Russian added in r3.2, 2026-11-20). All keys
  are present in all six locale files (missing keys: 0, verified by
  script). The five pre-existing locales are byte-identical to M4.1.
- Russian (r3.2) is recorded as **provisionally reviewed** — an
  assistant draft for founder review only. It has NOT been reviewed by
  a qualified Russian reviewer and must not be described as
  professionally verified. One draft error was found and fixed during
  verification (a Chinese word, 框架, left in the
  `html.why_only_one_is_open_each` value, corrected to «структура»;
  re-verified: 279 keys, 0 CJK characters). Qualified human Russian
  review of all 279 keys against the English source is still required,
  including the hero tagline, the 32 indicator names and descriptions,
  the assessment-inactive copy, and the disclaimer.
- Stage B M3 (2026-11-18) completed a full assistant draft review of
  all 279 keys × 5 languages and applied 35 corrections across 33
  distinct keys (zh-TW 15 replacements / 13 keys, zh-CN 6, ko 8, ja 6 —
  full log in the M3 completion report §5; the semantic diff against tag
  `v1.2-r3.1-m2` confirms exactly these keys changed). The four
  non-English languages are recorded as
  **provisionally reviewed**. They have NOT been reviewed by the
  founder or a qualified human / native-speaker reviewer, and must be
  reviewed before the candidate is considered complete — especially:
  - zh-CN / zh-TW / ko / ja tone and register;
  - Traditional Chinese (added in r3): converted from the approved
    zh-CN text with Taiwan-oriented terminology (檢視、軟體、資訊、
    影片、小程式、未啟用) as the initial standard. It has NOT been
    reviewed by a Traditional Chinese / Taiwan reader; that review is
    still required, including the T2 decision recorded in M3 (the single
    remaining 五大身份矩陣 use keeps 身份 for product-term consistency
    with 美學身份 — Taiwan-reader confirmation still open) and whether
    any term should follow Hong Kong usage instead (a separate zh-HK
    locale can be added later if so);
  - disclaimers (“not a psychological assessment / diagnosis”);
  - dimension and indicator names;
  - the Assessment / Result preview labels;
  - the M1 draft translations (footer notice, podcast sentence, hero
    equivalents in zh-TW / ko / ja) and the M3 corrections themselves.
- Protected names kept unchanged: VIVINEA, Aesthetic Identity,
  Personality Identity, Lifestyle Identity, Pet Identity, Future
  Identity, Before Becoming, and all question / indicator IDs.
- If a translation is found wrong, fix the locale JSON only — no
  structural change is needed.

## 5. Visual assets awaiting founder approval

- **Hero visual:** the M4 empty `<picture>` slot is in place (desktop
  `assets/hero/hero-desktop-16x10.jpg`, mobile
  `assets/hero/hero-mobile-4x5.jpg` — both paths documented in the slot
  registry above, no files exist yet). The visible hero is still the CSS
  Observer placeholder composition only. The final image — desktop and
  mobile crops supplied separately by the founder — needs its own
  approval before placement. The Option 3 — The Observer visual brief
  (`vivinea-r3-1-stage-a5-option-3-observer-brief.md`) is the initial
  composition reference; it is not recreated or reinterpreted in M4, and
  the final approved compositions, focal points, and crops take precedence
  over the initial CSS study.
- **OG / social image:** reserved only (`assets/social/og-image-1200x630.jpg`,
  1200 × 630, 1.91:1). No approved asset exists; no file, no OG tags.
- **Editorial visuals:** none named (registry `to_be_named`).
- Aesthetic Identity Q001 pair: placeholder blocks only.
- No other imagery was added in V1.2.

## 6. Future modules — not built, architecture-ready only

- Cinema Archive, Fashion Archive, Visual Studio, BEFORE BECOMING
  podcast section, Creative Community, Creative Resources.
- Additional languages (Russian, French, Spanish) are architecture-ready
  (add a locale JSON file) but are NOT in the interface.
- Scoring, AI interpretation, real assessment, personalised results,
  accounts, commerce: not built, not authorised in this phase.

## 7. Testing not yet done

- Cross-region access from Mainland China and Russia without VPN:
  not tested by Muse for V1.2. Fresh testing is required before any
  deployment approval.
- Founder review of translations (see §4).
- iPhone / iPad / desktop rendering checks in all five languages
  (see TESTING-CHECKLIST.md).
