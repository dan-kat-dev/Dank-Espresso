<script setup lang="ts">
import { gear } from '@/data/steps'
import { useParallax } from '@/composables/useParallax'
import { useMode, type Mode } from '@/composables/useMode'

defineProps<{ total: number }>()

const mode = useMode()
const modes: { value: Mode; label: string }[] = [
  { value: 'first', label: 'First time' },
  { value: 'refresher', label: 'I’ve done this before' },
]

const titleEl = useParallax(-40)
const cardEl = useParallax(20)
</script>

<template>
  <header class="mx-auto max-w-5xl px-6 pt-24 pb-10 sm:pt-32 sm:pb-16">
    <div :ref="titleEl" class="parallax">
      <p class="text-xs tracking-[0.2em] text-steel uppercase">Welcome — help yourself</p>

      <h1 class="mt-4 font-display text-5xl leading-[1.05] text-balance sm:text-7xl">
        How to make espresso
      </h1>

      <div
        role="radiogroup"
        aria-label="How much detail"
        class="mt-8 inline-flex rounded-full bg-ink/5 p-1 ring-1 ring-silver"
      >
        <button
          v-for="option in modes"
          :key="option.value"
          type="button"
          role="radio"
          :aria-checked="mode === option.value"
          class="rounded-full px-4 py-2 text-sm transition-colors"
          :class="
            mode === option.value
              ? 'bg-paper text-ink shadow-sm ring-1 ring-silver'
              : 'text-steel hover:text-ink'
          "
          @click="mode = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink/70 text-pretty">
        <template v-if="mode === 'first'">
          {{ total }} steps, about ten minutes. Every step is spelled out — scroll at your own
          pace.
        </template>
        <template v-else>
          Just the headlines. Tap “Show details” on any step you’re unsure of.
        </template>
        Warnings always show. Tap a
        <span class="whitespace-nowrap font-medium text-ink">Tip</span> bubble on a picture
        for extras.
      </p>
    </div>

    <div :ref="cardEl" class="parallax mt-12">
      <dl
        class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-silver sm:grid-cols-4"
      >
        <div v-for="item in gear.settings" :key="item.label" class="bg-paper px-5 py-4">
          <dt class="text-xs tracking-[0.15em] text-steel uppercase">{{ item.label }}</dt>
          <dd class="mt-1 font-display text-2xl">{{ item.value }}</dd>
        </div>
      </dl>

      <p class="mt-3 text-sm text-steel">{{ gear.machine }} · {{ gear.grinder }}</p>
    </div>
  </header>
</template>
