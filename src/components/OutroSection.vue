<script setup lang="ts">
import { useReveal } from '@/composables/useParallax'

const revealEl = useReveal()
</script>

<template>
  <footer :ref="revealEl" class="reveal mx-auto max-w-5xl px-6 pt-8 pb-28 text-center sm:pb-36">
    <hr class="mx-auto mb-14 w-16 border-t border-silver" />

    <h2 class="font-display text-3xl text-balance sm:text-4xl">That's it. Enjoy.</h2>

    <p class="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink/70 text-pretty">
      Machine off? Grinder off? Basket scrubbed? Then you're done.
    </p>

    <a
      href="#top"
      class="mt-10 inline-block rounded-full px-6 py-3 text-sm tracking-[0.15em] text-steel uppercase ring-1 ring-silver transition-colors hover:text-ink hover:ring-ink/40"
    >
      Start over
    </a>
  </footer>
</template>
