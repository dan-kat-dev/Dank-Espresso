<script setup lang="ts">
import { steps } from '@/data/steps'
import HeroSection from '@/components/HeroSection.vue'
import StepSection from '@/components/StepSection.vue'
import OutroSection from '@/components/OutroSection.vue'
</script>

<template>
  <main id="top">
    <HeroSection :total="steps.length" />

    <StepSection
      v-for="(step, i) in steps"
      :key="step.id"
      :step="step"
      :index="i + 1"
      :total="steps.length"
    />

    <OutroSection />
  </main>
</template>
