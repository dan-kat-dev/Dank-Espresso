<script setup lang="ts">
import { computed } from 'vue'
import type { Step } from '@/data/steps'
import { useParallax, useReveal } from '@/composables/useParallax'
import StepImage from './StepImage.vue'

const props = defineProps<{
  step: Step
  index: number
  total: number
}>()

/** Even steps put the picture on the right, odd ones on the left. */
const flipped = computed(() => props.index % 2 === 0)

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
      <StepImage :index="index" :src="step.image" :alt="step.imageAlt" />
    </div>

    <div :ref="textEl" class="parallax" :class="flipped ? 'md:order-1' : 'md:order-2'">
      <p class="flex items-baseline gap-3 text-xs tracking-[0.2em] text-ash uppercase">
        <span>Step {{ index }} / {{ total }}</span>
        <span v-if="step.meta" class="text-clay normal-case tracking-normal">{{ step.meta }}</span>
      </p>

      <h2 class="mt-3 font-display text-3xl leading-tight text-balance sm:text-4xl">
        {{ step.title }}
      </h2>

      <p class="mt-4 text-lg leading-relaxed text-espresso/75 text-pretty">
        {{ step.body }}
      </p>

      <p
        v-if="step.tip"
        class="mt-6 border-l-2 border-crema py-1 pl-4 text-base leading-relaxed text-espresso/65"
      >
        {{ step.tip }}
      </p>
    </div>
  </section>
</template>
