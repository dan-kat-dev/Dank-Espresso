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

**VS Code:** press **F5** (or pick *Dev server + Chrome* / *Dev server + Edge*
in Run and Debug). It runs `npm install` only if dependencies are missing or
changed, starts Vite on port 5173, and opens a browser with the VS Code
debugger attached, so breakpoints in `.vue` and `.ts` files work. Stopping
the debugger stops the server too.

## Editing the guide

Everything lives in [`src/data/steps.ts`](src/data/steps.ts). Add, remove or
reorder entries in the `steps` array; step numbers, the progress bar and the
alternating left/right layout all follow automatically.

```ts
{
  id: 'lock-in',                     // anchor, kebab-case
  title: 'Lock the portafilter in',  // the headline; must work on its own
  meta: '30 g',                      // optional little label
  details: [                         // sub-steps, one short line each
    'Handle pointing left, tabs parallel with the wall, lift it up into the machine.',
    'Turn the handle right until it points straight at you.',
  ],
  warning: 'Snug, not tight.',       // optional — ALWAYS shown
  tips: [                            // optional — behind a "Tip" bubble on the image
    'Look under the machine to see the slots.',
    { text: 'Pinned tip.', at: [62, 40] },  // own dot at x%, y% of the photo
  ],
  image: '/images/lock-in.png',      // optional — omit for a placeholder
  imageRatio: '3/4',                 // optional — portrait frame; default is 4/3
  imageAlt: 'The portafilter locked in.',
}
```

The `gear` export above it feeds the settings card at the top (dose, stop
weight, time, sugar) and the machine/grinder names.

### Modes, warnings and tips

- **First time / I've done this before.** A toggle in the hero, and again in the
  bar that sticks to the top once you scroll past the title. First time shows
  every step's `details`; the refresher shows only titles, with a "Show details"
  link per step. The choice is remembered per browser
  ([`useMode.ts`](src/composables/useMode.ts)).
- **`warning`** shows in both modes, every time. Keep it to things that damage
  the machine, hurt someone, or ruin the shot, in one short line.
- **`tips`** are nice-to-know extras like dialing in. Plain strings share one
  "Tip" pill in the image's corner. Add `at: [x, y]` (percent of the image) to
  pin a tip to a spot in the photo once the real pictures exist.

The original narrated walkthroughs the steps were written from are in
[`transcripts/`](transcripts/).

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
- `useScrollProgress()` — drives the thin line along the bottom of the sticky
  top bar.

All of it is transform-only (no layout thrash) and fully disabled under
`prefers-reduced-motion: reduce`.

To change how strong the effect is, adjust the pixel values passed in
`StepSection.vue` (`36` for the image, `-14` for the text — the opposite signs
are what create the depth).

## Theme

Six colors and two fonts at the top of [`src/style.css`](src/style.css). Change
them and the whole site follows.
