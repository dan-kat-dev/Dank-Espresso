<script setup lang="ts">
import { gear } from '@/data/steps'
import { useParallax } from '@/composables/useParallax'
import { useMode, type Mode } from '@/composables/useMode'
import cover from '@/assets/cover.jpg'

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
  <!--
    Mignon-orange band with the cover illustration melting into it: across the
    top on phones (the title sits on the fade), down the right half from `lg:`.
    Black text only on this orange.
  -->
  <header class="relative isolate overflow-hidden bg-mignon">
    <div
      class="absolute inset-x-0 top-0 -z-10 h-[min(120vw,48rem)] overflow-hidden lg:inset-y-0 lg:left-1/2 lg:h-auto"
      aria-hidden="true"
    >
      <!-- Scaled up a touch to crop the rounded corners baked into the file. -->
      <img :src="cover" alt="" class="h-full w-full scale-[1.06] object-cover object-bottom sm:object-[50%_40%] lg:object-top" />
      <div
        class="absolute inset-0 bg-linear-to-b from-mignon/0 from-72% via-mignon/85 via-92% to-mignon to-100% lg:bg-linear-to-r lg:from-mignon lg:from-0% lg:via-mignon/0 lg:via-20% lg:to-mignon/0 lg:to-100%"
      ></div>
    </div>

    <div class="mx-auto max-w-5xl px-6 pt-[min(112vw,45rem)] pb-14 sm:pb-20 lg:pt-32">
      <div :ref="titleEl" class="parallax lg:w-1/2 lg:pr-12">
        <p class="text-xs font-medium tracking-[0.2em] text-ink uppercase">Welcome — help yourself</p>

        <h1 class="mt-4 font-display text-5xl leading-[1.05] text-balance sm:text-7xl">
          How to make espresso
        </h1>

        <div
          role="radiogroup"
          aria-label="How much detail"
          class="mt-8 inline-flex rounded-full bg-ink/15 p-1"
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
                ? 'bg-paper text-ink shadow-sm'
                : 'text-ink/80 hover:text-ink'
            "
            @click="mode = option.value"
          >
            {{ option.label }}
          </button>
        </div>

        <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink text-pretty">
          <template v-if="mode === 'first'">
            {{ total }} steps, about ten minutes. Every step is spelled out — scroll at your own
            pace.
          </template>
          <template v-else>
            Just the headlines. Tap “Show details” on any step you’re unsure of.
          </template>
          Warnings always show. Tap a
          <span class="whitespace-nowrap font-semibold">Tip</span> bubble on a picture
          for extras.
        </p>
      </div>

      <div :ref="cardEl" class="parallax mt-12 lg:w-1/2 lg:pr-12">
        <dl
          class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-silver shadow-sm sm:grid-cols-4 lg:grid-cols-2"
        >
          <div v-for="item in gear.settings" :key="item.label" class="bg-paper px-5 py-4">
            <dt class="text-xs tracking-[0.15em] text-steel uppercase">{{ item.label }}</dt>
            <dd class="mt-1 font-display text-2xl">{{ item.value }}</dd>
          </div>
        </dl>

        <p class="mt-3 text-sm text-ink">{{ gear.machine }} · {{ gear.grinder }}</p>
      </div>
    </div>
  </header>
</template>
