<script setup lang="ts">
/**
 * The "First time / I've done this before" switch. Full-size in the hero,
 * `compact` (smaller, shorter labels) in the bar that sticks to the top.
 */
import { useMode, type Mode } from '@/composables/useMode'

defineProps<{ compact?: boolean }>()

const mode = useMode()
const modes: { value: Mode; label: string; short: string }[] = [
  { value: 'first', label: 'First time', short: 'First time' },
  { value: 'refresher', label: 'I’ve done this before', short: 'Refresher' },
]
</script>

<template>
  <div role="radiogroup" aria-label="How much detail" class="inline-flex rounded-full bg-ink/15 p-1">
    <button
      v-for="option in modes"
      :key="option.value"
      type="button"
      role="radio"
      :aria-checked="mode === option.value"
      class="rounded-full transition-colors"
      :class="[
        compact ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm',
        mode === option.value ? 'bg-paper text-ink shadow-sm' : 'text-ink/80 hover:text-ink',
      ]"
      @click="mode = option.value"
    >
      {{ compact ? option.short : option.label }}
    </button>
  </div>
</template>
