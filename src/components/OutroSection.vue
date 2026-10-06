<script setup lang="ts">
import { useReveal } from '@/composables/useParallax'

const revealEl = useReveal()
</script>

<template>
  <footer :ref="revealEl" class="reveal mx-auto max-w-5xl px-6 pt-8 pb-28 text-center sm:pb-36">
    <hr class="mx-auto mb-14 w-16 border-t border-espresso/15" />

    <h2 class="font-display text-3xl text-balance sm:text-4xl">That's it. Enjoy.</h2>

    <p class="mx-auto mt-4 max-w-md text-lg leading-relaxed text-espresso/70 text-pretty">
      Ran fast and sour? Grind finer. Slow and bitter? Grind coarser. One notch at a time.
    </p>

    <a
      href="#top"
      class="mt-10 inline-block rounded-full px-6 py-3 text-sm tracking-[0.15em] text-ash uppercase ring-1 ring-espresso/15 transition-colors hover:text-espresso hover:ring-espresso/40"
    >
      Start over
    </a>
  </footer>
</template>
