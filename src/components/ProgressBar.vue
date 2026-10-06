<script setup lang="ts">
import { useScrollProgress } from '@/composables/useParallax'

const progress = useScrollProgress()
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-50 h-0.5 bg-ink/8" aria-hidden="true">
    <div
      class="h-full origin-left bg-mignon"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
