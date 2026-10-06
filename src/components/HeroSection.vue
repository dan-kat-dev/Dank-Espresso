<script setup lang="ts">
import { gear } from '@/data/steps'
import { useParallax } from '@/composables/useParallax'

defineProps<{ total: number }>()

const titleEl = useParallax(-40)
const cardEl = useParallax(20)
</script>

<template>
  <header class="mx-auto max-w-5xl px-6 pt-24 pb-10 sm:pt-32 sm:pb-16">
    <div :ref="titleEl" class="parallax">
      <p class="text-xs tracking-[0.2em] text-ash uppercase">Welcome — help yourself</p>

      <h1 class="mt-4 font-display text-5xl leading-[1.05] text-balance sm:text-7xl">
        How to make espresso
      </h1>

      <p class="mt-6 max-w-xl text-lg leading-relaxed text-espresso/70 text-pretty">
        {{ total }} steps, about twenty minutes including warm-up. Scroll at your own pace —
        everything you need is already on the counter.
      </p>
    </div>

    <div :ref="cardEl" class="parallax mt-12">
      <dl
        class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-espresso/10 ring-1 ring-espresso/10 sm:grid-cols-4"
      >
        <div v-for="item in gear.settings" :key="item.label" class="bg-paper px-5 py-4">
          <dt class="text-xs tracking-[0.15em] text-ash uppercase">{{ item.label }}</dt>
          <dd class="mt-1 font-display text-2xl">{{ item.value }}</dd>
        </div>
      </dl>

      <p class="mt-3 text-sm text-ash">{{ gear.machine }} · {{ gear.grinder }}</p>
    </div>
  </header>
</template>
