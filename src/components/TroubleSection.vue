<script setup lang="ts">
/**
 * The appendix: things that aren't part of the routine, only for when it
 * isn't working. Always spelled out — nobody lands here in a hurry to skim.
 */
import { troubleshooting } from '@/data/steps'
import { useReveal } from '@/composables/useParallax'
import DetailList from './DetailList.vue'
import WarningNote from './WarningNote.vue'

const revealEl = useReveal()
</script>

<template>
  <section
    id="help"
    :ref="revealEl"
    class="reveal mx-auto grid max-w-5xl gap-8 px-6 pb-28 sm:pb-36 md:grid-cols-2 md:gap-14"
  >
    <div>
      <p class="text-xs tracking-[0.2em] text-steel uppercase">Just in case</p>

      <h2 class="mt-3 font-display text-3xl leading-tight text-balance sm:text-4xl">
        If something goes wrong
      </h2>

      <p class="mt-4 max-w-md text-lg leading-relaxed text-ink/90 text-pretty">
        Not part of the routine. You should only need this if something isn’t working.
      </p>
    </div>

    <div class="space-y-6">
      <article
        v-for="item in troubleshooting"
        :id="item.id"
        :key="item.id"
        class="rounded-2xl bg-paper p-6 shadow-sm"
      >
        <p class="text-xs tracking-[0.2em] text-steel uppercase">{{ item.problem }}</p>

        <h3 class="mt-2 font-display text-2xl leading-tight text-balance">{{ item.title }}</h3>

        <DetailList class="mt-4" :lines="item.details" />

        <WarningNote v-if="item.warning" class="mt-5">{{ item.warning }}</WarningNote>
      </article>
    </div>
  </section>
</template>
