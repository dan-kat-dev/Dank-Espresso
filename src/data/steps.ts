/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ONLY FILE YOU NEED TO EDIT.
 *
 * Add, remove or reorder items in `steps` and the page follows: numbering,
 * the progress bar, the left/right alternating layout, all automatic.
 *
 * Images: drop files into `public/images/` and set `image: '/images/foo.png'`.
 * Leave `image` off and a numbered placeholder is drawn instead, so the site
 * looks finished before the art exists.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Step {
  /** Used for the URL hash / anchor link. Keep it kebab-case. */
  id: string
  title: string
  /** One or two sentences. Plain text. */
  body: string
  /** Optional short label shown next to the step number, e.g. a time or weight. */
  meta?: string
  /** Optional highlighted aside. Great for "don't do this" warnings. */
  tip?: string
  /** Path under /public, e.g. '/images/grind.png'. Omit for a placeholder. */
  image?: string
  /** Describe the picture for screen readers. */
  imageAlt?: string
}

export const gear = {
  machine: 'Your Espresso Machine',
  grinder: 'Your Grinder',
  /** Shown in the little settings card at the top. Edit freely. */
  settings: [
    { label: 'Grind setting', value: '12' },
    { label: 'Dose', value: '18 g' },
    { label: 'Yield', value: '36 g' },
    { label: 'Shot time', value: '25–30 s' },
  ],
}

export const steps: Step[] = [
  {
    id: 'warm-up',
    title: 'Turn it on and let it warm up',
    meta: '15 min',
    body: 'Flip the power switch on the front. The light blinks while it heats and goes steady when it is ready. Give it a full fifteen minutes — a cold machine makes sour espresso.',
    tip: 'Leave the portafilter locked into the group head while it warms so the metal comes up to temperature too.',
    imageAlt: 'The espresso machine warming up on the counter.',
  },
  {
    id: 'weigh-beans',
    title: 'Weigh out your beans',
    meta: '18 g',
    body: 'Put the empty portafilter on the scale and press tare, then add beans until it reads eighteen grams. Whole beans go in the grinder, not the portafilter.',
    imageAlt: 'Coffee beans on a small kitchen scale.',
  },
  {
    id: 'grind',
    title: 'Grind fresh',
    meta: 'Setting 12',
    body: 'Pour the beans into the hopper and run the grinder into the portafilter. The grounds should look like fine sand — clumpy and damp is normal.',
    tip: 'Only grind what you are about to use. Ground coffee goes flat within minutes.',
    imageAlt: 'The grinder dosing coffee into the portafilter.',
  },
  {
    id: 'distribute',
    title: 'Level the grounds',
    body: 'Tap the portafilter gently on the counter and sweep a finger across the top until the bed is flat. No craters, no mound in the middle.',
    imageAlt: 'A hand levelling coffee grounds in the portafilter basket.',
  },
  {
    id: 'tamp',
    title: 'Tamp it flat',
    body: 'Set the portafilter on the edge of the counter, press straight down with the tamper until the grounds stop moving, then lift away without twisting. Level matters far more than strength.',
    tip: 'If the tamp is crooked, water finds the thin side and the shot runs fast and sour.',
    imageAlt: 'Tamping the coffee bed level with a tamper.',
  },
  {
    id: 'pull',
    title: 'Lock in and pull the shot',
    meta: '25–30 s',
    body: 'Twist the portafilter into the group head until it is snug, put a cup underneath, and press the brew button. The first drops should appear around seven seconds in.',
    imageAlt: 'Espresso streaming from the portafilter into a cup.',
  },
  {
    id: 'stop',
    title: 'Stop at 36 grams',
    meta: '36 g',
    body: 'Press the button again when the scale reads thirty-six grams, or when the stream turns pale and thin. Drink it while the crema is still on top.',
    imageAlt: 'A finished espresso with a thin layer of crema.',
  },
  {
    id: 'clean',
    title: 'Clean up for the next person',
    body: 'Knock the puck into the bin, rinse the basket, and run the brew button for two seconds to flush the group head. Wipe the steam wand if you used it.',
    tip: 'This is the whole rent for using the machine. Please do it.',
    imageAlt: 'Knocking the spent coffee puck out of the portafilter.',
  },
]
