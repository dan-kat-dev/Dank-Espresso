<script setup lang="ts">
import { useReveal } from '@/composables/useParallax'

const revealEl = useReveal()
</script>

<template>
  <footer :ref="revealEl" class="reveal mx-auto max-w-5xl px-6 pt-8 pb-28 text-center sm:pb-36">
    <hr class="mx-auto mb-14 w-16 border-t-2 border-mignon" />

    <h2 class="font-display text-3xl text-balance sm:text-4xl">That's it. Enjoy.</h2>

    <p class="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink/90 text-pretty">
      Machine off? Grinder off? Basket scrubbed? Then you're done.
    </p>

    <a
      href="#top"
      class="mt-10 inline-block rounded-full bg-mignon px-6 py-3 text-sm font-medium tracking-[0.15em] text-ink uppercase transition-colors hover:bg-ink hover:text-paper"
    >
      Start over
    </a>
  </footer>
</template>
