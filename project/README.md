# Atualize Soluções Tecnológicas — Design System

A brand + UI design system for **Atualize Soluções Tecnológicas**, a modern
technical-support company in Brazil (Goiânia region). Atualize provides
specialized technical support for computers, notebooks, printers and businesses.
Its core differentiator is the **service model**: in-home visits, on-site
business support, and specialized bench assistance by scheduled appointment —
*not* a traditional walk-in computer shop.

The brand must read as **modern tech-support & IT consultancy**: trustworthy,
organized, premium, approachable. It should NOT look like a virtual store or a
cluttered electronics-shop flyer.

> **Contact (from brief):** WhatsApp (62) 99511-8380 · Instagram
> @atualize.solucoestecnologicas
> **Slogan:** "Assistência especializada em computadores e suporte
> personalizado em hardware."

---

## ⚠️ Provenance & substitutions (READ ME)

Built from a written brief + the **official logo** (provided as artwork).
The palette below is **sampled directly from the logo**. Remaining items are
still **placeholders pending your real assets**:

- **Logo** — REAL. `assets/logo-full.png` (transparent, white wordmark — for
  dark/petrol surfaces), `assets/logo-mark.png` (transparent swirl — works on
  any surface), `assets/logo-original.jpeg` (source). For light surfaces, pair
  the mark with an "ATUALIZE" wordmark set in **Oxanium**.
- **Fonts** — **Sora** (display) + **Manrope** (text) + **Oxanium** (logo
  wordmark / techy accents), all from Google Fonts. Sora/Manrope are chosen
  brand faces; **Oxanium is the closest Google match to the logo's squared,
  cut-corner wordmark** — swap if you obtain the original face.
- **Photography** — every photo is a labelled placeholder (`<image-slot>` /
  tinted blocks). The brief describes the exact scenes needed (organized tech
  bench, open notebook, technician at work, matte-blue wall with lit logo, light
  laminate floor, soft LED). Supply real photos in those scenes.
- **Colors** — sampled from the logo: petrol blue `#004368`, lime `#8DC81F`,
  cyan-teal `#00DDAD`. The brief's "madeira clara" (light wood) is treated as an
  *imagery/environment* accent (wood floors, bench detail), not a core UI color.

---

## CONTENT FUNDAMENTALS

**Language:** Portuguese (Brazil). All copy is pt-BR.

**Voice:** Calm, confident, human and close ("atendimento humano"). We sell
*confidence, organization, convenience and a premium personal experience* — not
gadgets or discounts. Avoid hype.

**Person:** Speaks as **"nós/nosso"** (the company) addressing the customer
implicitly. Warm but professional — like a trusted specialist, never salesy.
Example: *"Nosso foco é trazer mais praticidade e atenção em cada atendimento."*

**Casing:** Sentence case for headings and body. UPPERCASE only for small
eyebrow labels and the wordmark's tagline. Never ALL-CAPS headlines.

**Tone do's:**
- Lead with the service model and reassurance ("atendimento em domicílio e
  empresas", "horário agendado", "tudo é explicado antes da execução").
- Short, plain sentences. Minimal jargon — "linguagem técnica excessiva" is
  explicitly to be avoided.
- Headlines are descriptive, not clever: *"Suporte técnico especializado com
  atendimento em domicílio e empresas."*

**Tone don'ts:** no exclamation-heavy promo copy, no "promoções", no virtual-store
language, no clutter, no emoji in production copy (emoji appear in the brief only
as shorthand; in the UI use proper line icons instead).

**Microcopy examples:**
- Primary CTA: **"Chamar no WhatsApp"**
- Secondary CTA: **"Solicitar atendimento"**
- Section eyebrows: "COMO FUNCIONA", "SERVIÇOS", "DIFERENCIAIS".
- Final CTA: *"Precisa de suporte técnico?"* → *"Atendimento especializado em
  domicílio, empresas e assistência técnica."*

---

## VISUAL FOUNDATIONS

**Overall feel:** clean, minimal, technological, elegant; premium with soft
lighting. Generous whitespace, calm rhythm, never busy.

**Color** (see `colors_and_type.css`):
- **Petrol blue** (`--navy-800 #004368`, the logo field) is the anchor: hero,
  dark feature sections, footer. Conveys trust + tech. Darker `--navy-900` for
  footer, `--navy-700` for raised cards on petrol.
- **Lime → cyan gradient** is the signature brand expression (`--grad-brand`,
  lime `#8DC81F` → cyan `#00DDAD`), taken straight from the swirl mark. Use it
  sparingly on focal elements (CTA fills, key accents, the eyebrow rule).
- **Cyan-teal** (`--cyan-500 #02A49E`) is the primary solid action/accent on
  light; **lime** (`--lime-500/600`) is the secondary energy accent. On petrol,
  use the brighter `--cyan-400 #00DDAD` / `--lime-400` so accents pop.
- **Neutrals:** white + `--paper #F4F7F8` for light pages; `--fg-1/2/3` text
  ramp on light, `--fg-on-dk-*` on petrol.
- **Light wood** is NOT a UI color — it lives only in *photography/environment*
  (wood floor, bench detail) to add the "acolhedor" warmth the brief asks for.
- Max **two** background "moods" on a page (light paper + one petrol section).
  Never rainbow; the gradient is an accent, not a background wash.

**Type:** **Sora** for display/headings (geometric, modern, a touch of
character), **Manrope** for body/UI (humanist, highly legible). Headings are
bold (700) with tight negative tracking; body is 400–500. Eyebrows are 13px
bold, uppercase, 0.14em tracking, in cyan-teal.

**Spacing:** 8pt-based scale (`--sp-*`). Sections breathe: 96–128px vertical
padding on desktop. Container max 1200px (820px for text-only).

**Backgrounds:** predominantly solid (white / paper / petrol). NO loud washes.
Permitted subtle treatments: a faint petrol radial glow behind the hero, a
soft cyan/lime glow behind a focal element, a barely-there dot grid or hairline
geometry on petrol. Photography is full-bleed or in soft-rounded cards.

**Corner radii:** soft and consistent. Cards `--r-lg (20px)`, large media/hero
panels `--r-xl (28px)`, inputs/small chips `--r-md (14px)`, pills `--r-pill`.

**Cards:** white surface, 1px `--line` hairline border, `--shadow-sm/md`, 20px
radius, ~24–32px padding. On petrol, cards use `--navy-700` fill with a
`--line-dk` hairline (no heavy shadow — use a subtle inner highlight instead).

**Borders:** 1px hairlines (`--line` on light, `--line-dk` on petrol). A thin
gradient or cyan rule is the signature accent line for dividers/details.

**Shadows / elevation:** soft, petrol-tinted, never harsh black. `--shadow-xs →
lg`. Action buttons get `--shadow-green` (cyan) glow on hover only.

**Motion:** purposeful and quiet. Fades + small transl(8–16px) on scroll-in,
`--dur 240ms` with `--ease-out`. No bounces, no spin. Hover lifts cards 2–4px.

**Hover states:** buttons darken (cyan→`--cyan-600`) and gain a soft cyan
glow; cards raise + border tightens to `--line-2`; links get a cyan underline.
**Press states:** scale 0.98 + remove glow (settle).

**Transparency / blur:** sticky header is white at ~85% opacity with
`backdrop-filter: blur(12px)` once scrolled. Glass is used only for the header
and overlay chrome — not decoratively.

**Imagery mood:** warm-cool balance — cool petrol environment with warm wood +
soft LED accents. Clean, realistic, sophisticated, NOT stocky-corporate. Slight
warmth; no heavy grain, no b&w.

**Iconography:** see ICONOGRAPHY below.

---

## ICONOGRAPHY

- **System:** **Lucide** (https://lucide.dev) — clean 2px-stroke, rounded,
  minimal line icons. Loaded from CDN (`lucide@latest`). This matches the brand's
  "ícones minimalistas / modernos" requirement and pairs well with Sora/Manrope.
  *(Substitution note: no icon set was provided; Lucide is the chosen match.)*
- **Style rules:** stroke (not filled), 2px weight, 24px default box, rendered
  in `currentColor`. Accent icons use `--cyan-500` (or `--cyan-400` on petrol);
  default icons inherit text color. Inside petrol feature tiles, icons sit in a
  soft cyan/lime-tinted rounded square.
- **Emoji:** **not used** in production UI. (The brief uses emoji only as
  shorthand for which icon to pick.)
- **Unicode glyphs:** avoided as icons — use Lucide instead.
- Common icons in use: `house` (domicílio), `building-2` (empresas),
  `wrench` / `settings-2` (assistência/reparo), `calendar-check` (agendado),
  `cpu` / `hard-drive` (upgrade), `gauge` (otimização), `network` (redes),
  `printer`, `gamepad-2` (montagem gamer), `shield-check`, `message-circle`
  (WhatsApp), `instagram`, `star`.

---

## INDEX — what's in this system

**Foundations**
- `colors_and_type.css` — all color + type + spacing + radius + shadow + motion
  tokens, plus semantic `.t-*` type classes. Import this everywhere.
- `assets/logo-full.png` (transparent, dark surfaces), `assets/logo-mark.png`
  (transparent swirl, any surface), `assets/logo-original.jpeg` (source artwork).

**Design System preview cards** (`preview/`) — small specimen cards surfaced in
the Design System tab: color palettes, type scale, spacing/radius/shadow tokens,
buttons, cards, icon tiles, logo.

**UI kit** (`ui_kits/landing-page/`) — high-fidelity recreation of the Atualize
marketing landing page.
- `index.html` — full assembled, scrollable landing page (interactive).
- `*.jsx` — modular section/components (Header, Hero, ServiceModel, Services,
  Differentials, Reviews, Gallery, FinalCTA, Footer, plus shared UI atoms).
- `README.md` — kit-specific notes.

**`SKILL.md`** — Agent-Skills-compatible entry point for reuse in Claude Code.

> No slide template was provided, so `slides/` is intentionally omitted.
