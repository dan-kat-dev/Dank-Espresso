# Espresso Instructions

A one-page, phone-friendly guide guests can scroll through to make espresso on
your machine. Vue 3 + TypeScript + Tailwind v4 + Vite. No component library, no
router, no state management — it's one page.

```bash
npm install
npm run dev
```

Vite prints a **Network** URL — open that on your phone to test on the real
device.

## Editing the guide

Everything lives in [`src/data/steps.ts`](src/data/steps.ts). Add, remove or
reorder entries in the `steps` array; step numbers, the progress bar and the
alternating left/right layout all follow automatically.

```ts
{
  id: 'tamp',                        // anchor, kebab-case
  title: 'Tamp it flat',
  meta: '18 g',                      // optional little label
  body: 'One or two sentences.',
  tip: 'Optional aside.',            // optional, gets the accent rule
  image: '/images/tamp.png',         // optional — omit for a placeholder
  imageAlt: 'Tamping the coffee bed.',
}
```

The `gear` export above it feeds the settings card at the top (grind, dose,
yield, time) and the machine/grinder names.

## Images

Drop files in `public/images/` and point `image` at `/images/<file>`. Until
then each step draws a numbered placeholder, so the layout is already final.
See [`public/images/README.md`](public/images/README.md) for framing notes —
the short version is keep the subject out of the outer ~8% of the frame,
because the parallax drift crops slightly.

## Motion

[`src/composables/useParallax.ts`](src/composables/useParallax.ts) is the whole
animation system, ~150 lines:

- `useParallax(shift)` — drifts an element as it scrolls past. One shared
  `requestAnimationFrame` loop and one `IntersectionObserver` serve every step
  on the page, and only on-screen elements are measured.
- `useReveal()` — fades + lifts an element the first time it's seen.
- `useScrollProgress()` — drives the thin bar at the top.

All of it is transform-only (no layout thrash) and fully disabled under
`prefers-reduced-motion: reduce`.

To change how strong the effect is, adjust the pixel values passed in
`StepSection.vue` (`36` for the image, `-14` for the text — the opposite signs
are what create the depth).

## Theme

Six colors and two fonts at the top of [`src/style.css`](src/style.css). Change
them and the whole site follows.
