# Atualize — Landing Page UI kit

High-fidelity, interactive recreation of the Atualize Soluções Tecnológicas
marketing landing page, built from the brief and the official brand. It is a
**design recreation** (cosmetic, click-thru), not production code.

## Run
Open `index.html`. It loads `../../colors_and_type.css` (brand tokens) +
`kit.css` (kit styles), React 18 + Babel (inline JSX), and Lucide icons.

## Structure
- `ui.jsx` — shared atoms: `Icon` (Lucide wrapper + inline Instagram fallback),
  `Btn`, `Eyebrow`, `IconTile`, `Stars`, `Photo` (scene placeholder), `Reveal` /
  `useReveal` (scroll-in).
- `Header.jsx` — sticky nav; transparent over the petrol hero, frosted-white
  once scrolled; mobile menu.
- `Hero.jsx` — headline, sub, WhatsApp + "Solicitar atendimento" CTAs, 4 quick
  highlights, hero photo + rating badge.
- `ServiceModel.jsx` — "Como funciona" copy + 4 model cards.
- `Services.jsx` — "Serviços especializados": 8 **dark elegant** cards on petrol.
- `Differentials.jsx` — "Por que escolher a Atualize?": 6 differentials.
- `Reviews.jsx` — Google-style simulated reviews + 5,0 score (neutral
  "verified" badge, **not** Google's trademarked logo).
- `Gallery.jsx` — "Ambiente": bento grid of environment scenes.
- `FinalCTA.jsx` — "Precisa de suporte técnico?" + WhatsApp / Instagram + contact.
- `Footer.jsx` — logo, slogan, contact, social, scheduled-hours note.
- `App.jsx` — composes sections; "Solicitar atendimento" **modal** form
  (fake submit → success) and a WhatsApp **toast**.

## Interactions
- Nav links smooth-scroll to sections. Header condenses on scroll.
- "Solicitar atendimento" opens a modal form with a success state.
- WhatsApp buttons fire a toast (wire to `wa.me/5562995118380` in production).
- Cards lift on hover; sections reveal on scroll.

## Placeholders / to replace
- **Photos** — every `Photo` block is a labelled placeholder describing the
  exact scene the brief calls for. Swap for real photography.
- **Wordmark font** — the header/footer wordmark uses **Oxanium** (closest
  Google match to the logo lettering).
- **Reviews** — names/text are simulated. Replace with real Google reviews.
