/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ONLY FILE YOU NEED TO EDIT.
 *
 * Add, remove or reorder items in `steps` and the page follows: numbering,
 * the progress bar, the left/right alternating layout, all automatic.
 *
 * Writing a step:
 *   title    — the headline. In "I've done this before" mode it's all you see,
 *              so it should work as a reminder on its own.
 *   details  — the sub-steps. Shown in "First time" mode, one tap away in the
 *              other. Keep each one short; the picture does the describing.
 *   warning  — ALWAYS visible in both modes. Only for things that break the
 *              equipment, hurt someone, or ruin the shot if missed. One line.
 *   tips     — optional pro tips. Hidden behind a little "Tip" bubble on the
 *              picture. Nice-to-know, never required.
 *
 * Images: drop files into `public/images/` and set `image: '/images/foo.png'`.
 * Leave `image` off and a numbered placeholder is drawn instead, so the site
 * looks finished before the art exists.
 *
 * Source material: the narrated walkthroughs in /transcripts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * A pro tip. A plain string goes in the step's shared "Tip" bubble (bottom
 * right of the picture). Give it `at: [x, y]` — percent across / down the
 * image — to pin its own bubble on a spot in the photo instead.
 */
export type Tip = string | { text: string; at?: [number, number] }

export interface Step {
  /** Used for the URL hash / anchor link. Keep it kebab-case. */
  id: string
  /** Short imperative headline. */
  title: string
  /** Optional short label shown next to the step number, e.g. a time or weight. */
  meta?: string
  /** The sub-steps, in order. Plain text, one short sentence each. */
  details: string[]
  /** Always shown. Equipment damage, safety, or "this ruins it" only. */
  warning?: string
  /** Optional pro tips, tucked behind a bubble on the image. */
  tips?: Tip[]
  /** Path under /public, e.g. '/images/grind.png'. Omit for a placeholder. */
  image?: string
  /** Describe the picture for screen readers. */
  imageAlt?: string
}

export const gear = {
  machine: 'Your Espresso Machine',
  grinder: 'The orange grinder',
  /** Shown in the little settings card at the top. Edit freely. */
  settings: [
    { label: 'Beans', value: '18 g' },
    { label: 'Stop at', value: '30 g' },
    { label: 'Shot time', value: '~30 s' },
    { label: 'Sugar', value: '2.4 g' },
  ],
}

export const steps: Step[] = [
  {
    id: 'power-on',
    title: 'Turn on the machine',
    meta: 'Left switch',
    details: [
      'Flip the left of the three front switches down.',
      'The left light means it’s on. The middle light, under the cup icon, means it’s hot — it warms up while you do the next steps.',
    ],
    imageAlt: 'The three switches on the front of the espresso machine.',
  },
  {
    id: 'water',
    title: 'Check the water tank',
    details: [
      'Look at the clear tank on the machine.',
      'The water should be above the end of the hose inside it. Top it up if not.',
    ],
    warning: 'Water must cover the hose. Running dry can damage the pump.',
    imageAlt: 'The clear water tank, with the water line above the hose.',
  },
  {
    id: 'weigh',
    title: 'Weigh out the beans',
    meta: '18.0 g',
    details: [
      'Turn on the scale.',
      'Lift the clear square lid off the top of the orange grinder. Set it upside down on the scale and tare.',
      'Get the beans from the freezer and pour in 18.0 g.',
      'Close the bag and put it straight back in the freezer.',
    ],
    tips: [
      'The beans live in the freezer on purpose — the roaster says it keeps them fresh longest.',
      'Using different beans? 18 g is right for our usual ones; others may need dialing in. See the tip on “Pull the shot”.',
    ],
    imageAlt: 'The grinder’s clear lid upside down on the scale, holding beans.',
  },
  {
    id: 'load-grinder',
    title: 'Switch on the grinder and add the beans',
    details: [
      'The grinder switch is at the back, bottom right. Flip it on.',
      'Hold the lid corner-down, like a diamond, and pour the beans into the clear hopper on top.',
    ],
    warning: 'Leave the grind knob (front, top right) alone — it’s already set.',
    tips: [
      'The grind knob is only for dialing in or switching beans. Move it a little at a time.',
    ],
    imageAlt: 'Pouring beans from the corner of the lid into the grinder hopper.',
  },
  {
    id: 'portafilter',
    title: 'Set up the portafilter',
    details: [
      'Take the portafilter with the open bottom — just a ring on a handle.',
      'Drop in a clean basket. Right way up = the two locking tabs face up.',
      'Fit the funnel on top with its gap facing forward, away from the handle.',
    ],
    imageAlt: 'Portafilter with basket and funnel, funnel gap facing away from the handle.',
  },
  {
    id: 'grind',
    title: 'Grind',
    meta: '~15 s',
    details: [
      'Rest the portafilter in the fork under the grinder. The funnel’s gap lines up with the spout.',
      'Hold it level and nudge it forward until the basket rim presses the black rubber button. Grinding starts.',
      'It runs about 15 seconds. The sound changes once all the beans are through.',
    ],
    tips: [
      'Beans hanging up in the hopper? Rock the grinder a little or tap the top until they all go through.',
      'When it stops, keep the portafilter still and rock the grinder forward and back once or twice — a few more grounds fall out.',
    ],
    imageAlt: 'The portafilter in the grinder fork, pressing the black button.',
  },
  {
    id: 'pre-tamp',
    title: 'Press lightly, then lift off the funnel',
    details: [
      'Set the portafilter flat on the counter, funnel still on.',
      'Rest the tamper on the grounds and press gently — just enough to get them below the funnel’s lip, so nothing spills.',
      'Lift the funnel off.',
    ],
    imageAlt: 'The tamper resting on the grounds inside the funnel.',
  },
  {
    id: 'level',
    title: 'Level',
    details: [
      'Set the leveler gently on the basket.',
      'Spin it counterclockwise until it stops and sits on the basket rim.',
      'Lift it off.',
    ],
    tips: ['The leveler’s depth is already set. Only change it when dialing in a new bean.'],
    imageAlt: 'The leveler sitting on the basket rim.',
  },
  {
    id: 'tamp',
    title: 'Tamp',
    details: [
      'Put the tamper back on the grounds.',
      'Press straight down, evenly. Firm, but you’re not trying to break the counter.',
    ],
    imageAlt: 'Pressing the tamper straight down into the basket.',
  },
  {
    id: 'lock-in',
    title: 'Lock the portafilter in',
    details: [
      'Check the middle light is on — the machine is hot.',
      'Handle pointing left, tabs parallel with the wall, lift it up into the machine.',
      'Turn the handle right until it points straight at you, or a little past. Steady the machine with your other hand.',
    ],
    warning: 'Snug, not tight. Too tight can break it; too loose and it leaks.',
    tips: ['Not sure where the tabs go? Look up under the machine to see the slots.'],
    imageAlt: 'The portafilter locked in, handle pointing straight out.',
  },
  {
    id: 'scale-and-cup',
    title: 'Scale and cup under the spout',
    details: [
      'Put the scale right under where the espresso comes out.',
      'Set the cup on it, centered under the basket.',
      'Tare the scale.',
    ],
    imageAlt: 'The cup on the scale, centered under the portafilter.',
  },
  {
    id: 'pull',
    title: 'Pull the shot',
    meta: '30 g · ~30 s',
    details: [
      'At the same time: start the scale’s timer and push the middle switch down.',
      'Watch the weight. At 30 g, flip the middle switch back up.',
      'A couple more grams drip out after — that’s normal. The whole thing takes about 30 seconds.',
    ],
    tips: [
      'Dialing in: well over 30 s to reach 30 g? Grind coarser or use a bit less coffee. Done way before 30 s? Grind finer or use a bit more. Change one thing, a little at a time.',
    ],
    imageAlt: 'Espresso pouring into the cup with the scale reading close to 30 g.',
  },
  {
    id: 'rinse',
    title: 'Take the portafilter out and rinse',
    details: [
      'Move the cup and scale out of the way.',
      'Turn the handle left until the portafilter drops free.',
      'Rest it upside down on the drip tray.',
      'Middle switch down for 1–2 seconds to rinse the back with hot water, then up.',
    ],
    warning: 'It’s hot — hold it by the handle only.',
    imageAlt: 'The portafilter upside down on the drip tray under running water.',
  },
  {
    id: 'sweeten',
    title: 'Sweeten and stir',
    meta: 'Optional · 2.4 g',
    details: [
      'Cup back on the scale, tare.',
      'Spoon in about 2.4 g of sugar.',
      'Stir for 20–30 seconds, scraping the bottom — it’s slow to dissolve.',
      'Drink it within a minute or so.',
    ],
    tips: ['2.4 g is the house sweet spot for a 30 g shot: less tastes harsh, more is too sweet.'],
    imageAlt: 'Spooning sugar into the espresso on the scale.',
  },
  {
    id: 'clean',
    title: 'Clean up',
    details: [
      'Once the puck has cooled, knock it into the silver compost bin in the kitchen.',
      'Wash the portafilter and basket in the sink. Scrub the basket with a kitchen brush.',
    ],
    warning: 'Brush the basket. Grounds left in the tiny holes ruin the next shot.',
    imageAlt: 'Scrubbing the basket with a kitchen brush.',
  },
  {
    id: 'power-off',
    title: 'Turn everything off',
    details: [
      'Machine: flip the left switch back up.',
      'Grinder: same switch at the back, flip it off.',
    ],
    warning: 'Always turn the machine off. Left on, it stays hot all day.',
    imageAlt: 'Flipping the machine’s left switch up.',
  },
]
