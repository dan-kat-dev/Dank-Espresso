<script setup lang="ts">
/**
 * The framed picture for a step. Falls back to a numbered placeholder card
 * so the layout is final before any artwork exists — swap in real images by
 * setting `image` in src/data/steps.ts and nothing else changes.
 */
defineProps<{
  index: number
  src?: string
  alt?: string
}>()
</script>

<template>
  <figure
    class="relative aspect-4/3 overflow-hidden rounded-2xl bg-paper ring-1 ring-espresso/10 sm:aspect-3/2"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt ?? ''"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full scale-110 object-cover"
    />

    <!-- Placeholder: quiet, on-palette, obviously temporary. -->
    <div v-else class="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div class="text-center">
        <span class="block font-display text-8xl leading-none text-espresso/12 sm:text-9xl">
          {{ String(index).padStart(2, '0') }}
        </span>
        <span class="mt-3 block text-xs tracking-[0.2em] text-ash uppercase">image here</span>
      </div>
    </div>
  </figure>
</template>
