<script setup lang="ts">
defineProps<{ lines: string[] }>()
</script>

<template>
  <ol class="space-y-3 text-lg leading-relaxed text-ink/90">
    <li v-for="(line, i) in lines" :key="i" class="flex gap-3 text-pretty">
      <span
        class="mt-[0.45em] grid size-5 shrink-0 place-items-center rounded-full bg-mignon text-[0.7rem] leading-none font-semibold text-ink"
        aria-hidden="true"
        >{{ i + 1 }}</span
      >
      <span>{{ line }}</span>
    </li>
  </ol>
</template>
