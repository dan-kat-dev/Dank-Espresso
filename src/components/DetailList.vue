<script setup lang="ts">
import type { Detail } from '@/data/steps'

defineProps<{ lines: Detail[] }>()
</script>

<template>
  <ol class="space-y-3 text-lg leading-relaxed text-ink/90">
    <li v-for="(line, i) in lines" :key="i" class="flex gap-3 text-pretty">
      <span
        class="mt-[0.45em] grid size-5 shrink-0 place-items-center rounded-full bg-mignon text-[0.7rem] leading-none font-semibold text-ink"
        aria-hidden="true"
        >{{ i + 1 }}</span
      >
      <span v-if="typeof line === 'string'">{{ line }}</span>
      <div v-else>
        {{ line.text }}
        <!-- Unnumbered, a touch smaller and indented: it belongs to the line above. -->
        <ul class="mt-1.5 pl-2 text-base leading-relaxed">
          <li class="flex gap-2.5">
            <span class="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-mignon" aria-hidden="true" />
            <span>{{ line.note }}</span>
          </li>
        </ul>
      </div>
    </li>
  </ol>
</template>
