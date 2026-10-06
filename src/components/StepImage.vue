<script setup lang="ts">
/**
 * The framed picture for a step. Falls back to a numbered placeholder card
 * so the layout is final before any artwork exists — swap in real images by
 * setting `image` in src/data/steps.ts and nothing else changes.
 *
 * Pro tips ride on top as tap-to-open bubbles: plain tips share one "Tip"
 * pill in the corner, tips with `at: [x, y]` get their own dot on that spot.
 */
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { Tip } from '@/data/steps'

const props = defineProps<{
  index: number
  src?: string
  alt?: string
  tips?: Tip[]
}>()

const normalized = computed(() =>
  (props.tips ?? []).map((tip) => (typeof tip === 'string' ? { text: tip } : tip)),
)
const cornerTips = computed(() => normalized.value.filter((tip) => !tip.at).map((tip) => tip.text))
const pinnedTips = computed(() =>
  normalized.value.flatMap((tip) => (tip.at ? [{ text: tip.text, at: tip.at }] : [])),
)

/** 'corner' for the shared pill, a number for a pinned tip, null when closed. */
const open = ref<'corner' | number | null>(null)
const openTips = computed(() => {
  if (open.value === 'corner') return cornerTips.value
  if (typeof open.value === 'number') return [pinnedTips.value[open.value]!.text]
  return []
})

function toggle(key: 'corner' | number) {
  open.value = open.value === key ? null : key
}

/**
 * Photos are drawn at 110% (so parallax never shows an edge), so map a
 * position on the image to the same spot inside the frame.
 */
function pinStyle([x, y]: [number, number]) {
  const scale = props.src ? 1.1 : 1
  const toFrame = (v: number) => `${50 + (v - 50) * scale}%`
  return { left: toFrame(x), top: toFrame(y) }
}

// Close on a tap anywhere else, or Escape.
const figureEl = ref<HTMLElement>()
function onPointerDown(event: PointerEvent) {
  if (!figureEl.value?.contains(event.target as Node)) open.value = null
}
function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = null
}
function listen(on: boolean) {
  if (on) {
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
  } else {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeyDown)
  }
}
watch(open, (value, previous) => {
  if ((value === null) !== (previous === null)) listen(value !== null)
})
onBeforeUnmount(() => listen(false))
</script>

<template>
  <figure
    ref="figureEl"
    class="relative aspect-4/3 overflow-hidden rounded-2xl bg-paper ring-1 ring-espresso/10 sm:aspect-3/2"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt ?? ''"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full scale-110 object-cover"
    />

    <!-- Placeholder: quiet, on-palette, obviously temporary. -->
    <div v-else class="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div class="text-center">
        <span class="block font-display text-8xl leading-none text-espresso/12 sm:text-9xl">
          {{ String(index).padStart(2, '0') }}
        </span>
        <span class="mt-3 block text-xs tracking-[0.2em] text-ash uppercase">image here</span>
      </div>
    </div>

    <!-- Pinned tips: a small dot on the spot in the photo they're about. -->
    <button
      v-for="(tip, i) in pinnedTips"
      :key="`pin-${i}`"
      type="button"
      class="tip-bubble absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
      :style="pinStyle(tip.at)"
      :aria-expanded="open === i"
      aria-label="Pro tip"
      @click="toggle(i)"
    >
      <svg viewBox="0 0 16 16" class="size-4 text-crema" aria-hidden="true">
        <path
          d="M8 1.75a4.25 4.25 0 0 0-2.5 7.69V11h5V9.44A4.25 4.25 0 0 0 8 1.75ZM6 13h4M6.75 14.75h2.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <!-- Everything else shares one pill in the corner. -->
    <button
      v-if="cornerTips.length"
      type="button"
      class="tip-bubble absolute right-3 bottom-3 inline-flex h-8 items-center gap-1.5 rounded-full pr-3.5 pl-2.5 text-xs font-medium text-espresso"
      :aria-expanded="open === 'corner'"
      @click="toggle('corner')"
    >
      <svg viewBox="0 0 16 16" class="size-4 text-crema" aria-hidden="true">
        <path
          d="M8 1.75a4.25 4.25 0 0 0-2.5 7.69V11h5V9.44A4.25 4.25 0 0 0 8 1.75ZM6 13h4M6.75 14.75h2.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {{ cornerTips.length > 1 ? `${cornerTips.length} tips` : 'Tip' }}
    </button>

    <Transition name="tip">
      <div
        v-if="openTips.length"
        class="absolute inset-x-3 bottom-3 max-h-[calc(100%-1.5rem)] overflow-y-auto rounded-xl bg-paper p-4 pr-10 shadow-lg ring-1 ring-espresso/10"
        role="note"
      >
        <p class="text-[0.7rem] tracking-[0.18em] text-crema uppercase">Pro tip</p>
        <ul class="mt-1.5 space-y-2 text-[0.95rem] leading-snug text-espresso/85">
          <li v-for="(text, i) in openTips" :key="i" class="text-pretty">{{ text }}</li>
        </ul>
        <button
          type="button"
          class="absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-full text-ash transition-colors hover:text-espresso"
          aria-label="Close tip"
          @click="open = null"
        >
          <svg viewBox="0 0 12 12" class="size-3" aria-hidden="true">
            <path d="m2.5 2.5 7 7m0-7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </Transition>
  </figure>
</template>

<style scoped>
.tip-bubble {
  background-color: color-mix(in srgb, var(--color-paper) 90%, transparent);
  box-shadow:
    0 1px 2px rgb(43 29 22 / 0.12),
    0 0 0 1px rgb(43 29 22 / 0.1);
  backdrop-filter: blur(4px);
  transition: scale 0.2s var(--ease-soft);
}

.tip-bubble:active {
  scale: 0.94;
}

.tip-enter-active,
.tip-leave-active {
  transition:
    opacity 0.25s var(--ease-soft),
    transform 0.25s var(--ease-soft);
}

.tip-enter-from,
.tip-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .tip-enter-active,
  .tip-leave-active {
    transition: none;
  }
}
</style>
