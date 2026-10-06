<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Step } from '@/data/steps'
import { useParallax, useReveal } from '@/composables/useParallax'
import { useMode } from '@/composables/useMode'
import StepImage from './StepImage.vue'

const props = defineProps<{
  step: Step
  index: number
  total: number
}>()

/** Even steps put the picture on the right, odd ones on the left. */
const flipped = computed(() => props.index % 2 === 0)

/**
 * Details follow the page mode, but each step can be opened/closed on its
 * own. Switching modes resets those one-off choices.
 */
const mode = useMode()
const override = ref<boolean | null>(null)
watch(mode, () => (override.value = null))
const expanded = computed(() => override.value ?? mode.value === 'first')
const detailsId = computed(() => `${props.step.id}-details`)

const imageEl = useParallax(36)
const textEl = useParallax(-14)
const revealEl = useReveal()
</script>

<template>
  <section
    :id="step.id"
    :ref="revealEl"
    class="reveal mx-auto grid max-w-5xl items-center gap-8 px-6 py-16 sm:py-24 md:grid-cols-2 md:gap-14"
  >
    <div :ref="imageEl" class="parallax" :class="flipped ? 'md:order-2' : 'md:order-1'">
      <StepImage :index="index" :src="step.image" :alt="step.imageAlt" :tips="step.tips" />
    </div>

    <div :ref="textEl" class="parallax" :class="flipped ? 'md:order-1' : 'md:order-2'">
      <p class="flex items-baseline gap-3 text-xs tracking-[0.2em] text-ash uppercase">
        <span>Step {{ index }} / {{ total }}</span>
        <span v-if="step.meta" class="text-clay normal-case tracking-normal">{{ step.meta }}</span>
      </p>

      <h2 class="mt-3 font-display text-3xl leading-tight text-balance sm:text-4xl">
        {{ step.title }}
      </h2>

      <!-- Warnings show in every mode. Short, loud, nothing else. -->
      <p
        v-if="step.warning"
        role="note"
        class="mt-5 flex items-start gap-3 rounded-xl bg-paper px-4 py-3 ring-1 ring-clay/45"
      >
        <svg viewBox="0 0 24 24" class="mt-px size-5 shrink-0" aria-hidden="true">
          <path d="M12 2.5 23 21.5H1Z" class="fill-clay" stroke-linejoin="round" />
          <path d="M12 9v6" class="stroke-paper" stroke-width="2.2" stroke-linecap="round" />
          <circle cx="12" cy="18.2" r="1.25" class="fill-paper" />
        </svg>
        <span class="leading-snug font-medium text-pretty">
          <span class="sr-only">Warning: </span>{{ step.warning }}
        </span>
      </p>

      <div
        v-if="step.details.length"
        :id="detailsId"
        class="grid transition-[grid-template-rows] duration-500 ease-soft"
        :class="expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        :inert="!expanded"
      >
        <div class="overflow-hidden">
          <ol class="mt-5 space-y-3 text-lg leading-relaxed text-espresso/75">
            <li v-for="(line, i) in step.details" :key="i" class="flex gap-3 text-pretty">
              <span
                class="mt-[0.45em] grid size-5 shrink-0 place-items-center rounded-full text-[0.7rem] leading-none font-semibold text-ash ring-1 ring-espresso/15"
                aria-hidden="true"
                >{{ i + 1 }}</span
              >
              <span>{{ line }}</span>
            </li>
          </ol>
        </div>
      </div>

      <button
        v-if="step.details.length"
        type="button"
        class="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-ash uppercase transition-colors hover:text-espresso"
        :aria-expanded="expanded"
        :aria-controls="detailsId"
        @click="override = !expanded"
      >
        {{ expanded ? 'Hide details' : 'Show details' }}
        <svg
          viewBox="0 0 12 12"
          class="size-3 transition-transform duration-300"
          :class="expanded && 'rotate-180'"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </section>
</template>
