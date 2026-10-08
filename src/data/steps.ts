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
 * looks finished before the art exists. Frames are 4:3; for portrait art add
 * `imageRatio: '3/4'` so the frame follows the picture instead of cropping it.
 *
 * Not part of the routine? Things a guest should only check when it isn't
 * working go in `troubleshooting` at the bottom of this file instead.
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

/**
 * One sub-step. Usually a plain string. Give it a `note` to hang an unnumbered
 * sub-bullet under it — for what you should see happen, not another thing to do.
 */
export type Detail = string | { text: string; note: string }

export interface Step {
  /** Used for the URL hash / anchor link. Keep it kebab-case. */
  id: string
  /** Short imperative headline. */
  title: string
  /** Optional short label shown next to the step number, e.g. a time or weight. */
  meta?: string
  /** The sub-steps, in order. One short sentence each. */
  details: Detail[]
  /** Always shown. Equipment damage, safety, or "this ruins it" only. */
  warning?: string
  /** Optional pro tips, tucked behind a bubble on the image. */
  tips?: Tip[]
  /** Path under /public, e.g. '/images/grind.png'. Omit for a placeholder. */
  image?: string
  /** Frame shape, as a CSS aspect-ratio. Defaults to '4/3'; use '3/4' for portrait art. */
  imageRatio?: string
  /** Describe the picture for screen readers. */
  imageAlt?: string
}

/**
 * A "what went wrong" entry. These sit in their own section after the steps:
 * things a guest shouldn't normally have to do, but can check if it isn't
 * working. Always shown in full, in both modes.
 */
export interface Fix {
  /** Used for the URL hash / anchor link. Keep it kebab-case. */
  id: string
  /** What the guest is seeing, as a short question. */
  problem: string
  /** What to do about it. Short imperative headline. */
  title: string
  /** The sub-steps, in order. One short sentence each. */
  details: Detail[]
  /** Equipment damage, safety, or "this ruins it" only. */
  warning?: string
}

export const gear = {
  /** Listed under the settings card, each linked to the maker's own page. */
  equipment: [
    {
      label: 'Espresso machine',
      name: 'Gaggia Classic Pro',
      url: 'https://www.gaggia-na.com/products/gaggia-classic-pro',
    },
    {
      label: 'Grinder',
      name: 'Eureka Mignon Specialità',
      url: 'https://www.eureka.co.it/en/products/eureka+1920/prosumer+grinders/silent+range/20/',
    },
  ],
  /** Shown in the little settings card at the top. Edit freely. */
  settings: [
    { label: 'Beans', value: '17.9 g' },
    { label: 'Output', value: '35.8 g' },
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
      {
        text: 'Flip the left of the three front switches down.',
        note: 'The light under the left switch should turn on immediately. This means the power is on.',
      },
      'Wait for the light under the middle switch to come on too, about 1–2 minutes. That means the machine is hot enough to brew.',
    ],
    image: '/images/power-on.jpg',
    imageAlt:
      'The three switches on the front of the espresso machine. An arrow points to the left one, with its light glowing underneath.',
  },
  {
    id: 'weigh',
    title: 'Weigh out the beans',
    meta: '17.9 g',
    details: [
      { text: 'Turn on the scale.', note: 'It’s the bottom-right button.' },
      {
        text: 'Lift the clear square lid off the top of the orange grinder. Set it upside down on the scale and tare.',
        note: 'Tare is the top-right button. It resets the scale to zero.',
      },
      {
        text: 'Get the beans from the freezer and pour in 17.9 g.',
        note: 'If you’re using a different bean than the regular Kaladi Trieste roast, the right weight may be different.',
      },
      {
        text: 'Close the bag and put it back in the freezer.',
        note: 'If you leave it out, the cats may try to eat the bag.',
      },
    ],
    tips: [
      'The beans live in the freezer on purpose — the roaster says it keeps them fresh longest.',
      'Using different beans? 17.9 g is right for our usual ones; others may need dialing in. See the tip on “Pull the shot”.',
    ],
    image: '/images/weigh.jpg',
    imageAlt:
      'Beans pouring from the bag into the grinder’s clear lid, upside down on the scale, which reads 17.9 g.',
  },
  {
    id: 'load-grinder',
    title: 'Switch on the grinder and add the beans',
    details: [
      'The grinder’s power switch is at the bottom back corner of the right side. Flip it on.',
      'Pour the weighed beans into the grinder.',
      'Place the lid back on top of the hopper.',
    ],
    warning:
      'Leave the black knob on the top right alone — it should already be set. Using a different bean? Turning it even a fraction of a millimeter makes a big difference.',
    tips: [
      'The grind knob is only for dialing in or switching beans. Move it a little at a time.',
    ],
    image: '/images/load-grinder.jpg',
    imageAlt:
      'Pouring beans from the corner of the lid into the orange grinder’s hopper. An arrow points to the power switch at the back, bottom right.',
  },
  {
    id: 'portafilter',
    title: 'Set up the portafilter',
    details: [
      'Take the portafilter with the open bottom — just a ring on a handle.',
      'Drop in a clean basket. Right way up = the two locking tabs face up.',
      'Fit the funnel on top with its gap facing forward, away from the handle.',
    ],
    image: '/images/portafilter.jpg',
    imageRatio: '3/4',
    imageAlt:
      'Exploded view: the funnel above the basket above the open portafilter. Beside it, all three assembled, with the funnel’s gap facing away from the handle.',
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
    image: '/images/grind.jpg',
    imageRatio: '3/4',
    imageAlt:
      'The portafilter in the grinder fork, pressing the black button, with grounds falling into the basket and the display reading 15.0.',
  },
  {
    id: 'pre-tamp',
    title: 'Press lightly, then lift off the funnel',
    details: [
      'Set the portafilter flat on the counter, funnel still on.',
      'Rest the tamper on the grounds and press gently — just enough to get them below the funnel’s lip, so nothing spills.',
      'Lift the funnel off.',
    ],
    image: '/images/pre-tamp.jpg',
    imageRatio: '3/4',
    imageAlt:
      'Two panels. Left: the tamper resting on the grounds inside the funnel, with a feather above it and the words “place gently, no force”. Right: the tamper and funnel lifted off, the grounds sitting below the basket rim.',
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
    image: '/images/level.jpg',
    imageRatio: '3/4',
    imageAlt:
      'The leveler set down on the basket, with arrows showing it spun around on the rim and then lifted straight off.',
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
    meta: '35.8 g · ~30 s',
    details: [
      'At the same time: start the scale’s timer and push the middle switch down.',
      'Watch the weight. At 35.8 g, flip the middle switch back up.',
      'A couple more grams drip out after — that’s normal. The whole thing takes about 30 seconds.',
    ],
    tips: [
      'Nothing coming out? The water tank may be low — see “If something goes wrong” at the bottom of the page.',
      'Dialing in: well over 30 s to reach 35.8 g? Grind coarser or use a bit less coffee. Done way before 30 s? Grind finer or use a bit more. Change one thing, a little at a time.',
    ],
    imageAlt: 'Espresso pouring into the cup with the scale reading close to 35.8 g.',
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
    tips: ['2.4 g is the house sweet spot for a 35.8 g shot: less tastes harsh, more is too sweet.'],
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

export const troubleshooting: Fix[] = [
  {
    id: 'water',
    problem: 'No water coming out?',
    title: 'Check the water tank',
    details: [
      'Look at the clear tank on the machine.',
      'The water should be above the end of the hose inside it. Top it up if not.',
    ],
    warning: 'Water must cover the hose. Running dry can damage the pump.',
  },
]
