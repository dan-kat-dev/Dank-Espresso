<script setup lang="ts">
/**
 * Up/down arrows on the right edge that jump between steps. Shows up once
 * the first step reaches the middle of the screen and goes away after the
 * last one. "Up" from partway down a step goes back to that step's top first,
 * like a music player's back button.
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { steps } from '@/data/steps'

/** Space kept above a step's content for the top bar. */
const BAR_CLEARANCE = 80
/** Close enough to count as "at" a step. */
const SLACK = 8

const visible = ref(false)
const current = ref(-1)
const atStepTop = ref(true)

/**
 * Where the window scrolls to show a step: its content just under the top
 * bar. `offsetTop` ignores the reveal/parallax transforms, so the target
 * doesn't move while a step animates in.
 */
function targetOf(el: HTMLElement) {
  const padding = parseFloat(getComputedStyle(el).paddingTop) || 0
  return Math.max(0, el.offsetTop + padding - BAR_CLEARANCE)
}

const sections = () =>
  steps.map((step) => document.getElementById(step.id)).filter((el): el is HTMLElement => !!el)

let raf = 0

function measure() {
  raf = 0
  const els = sections()
  const first = els[0]
  const last = els.at(-1)
  if (!first || !last) return

  const y = window.scrollY
  const middle = y + window.innerHeight / 2
  visible.value = middle >= first.offsetTop && middle <= last.offsetTop + last.offsetHeight

  let index = -1
  els.forEach((el, i) => {
    if (targetOf(el) <= y + SLACK) index = i
  })
  current.value = index
  atStepTop.value = index < 0 || y <= targetOf(els[index]!) + SLACK
}

const onScroll = () => {
  if (!raf) raf = requestAnimationFrame(measure)
}

const canGoUp = computed(() => current.value > 0 || (current.value === 0 && !atStepTop.value))
const canGoDown = computed(() => current.value < steps.length - 1)

function go(direction: 1 | -1) {
  const els = sections()
  const index =
    direction === 1 ? current.value + 1 : atStepTop.value ? current.value - 1 : current.value
  const el = els[index]
  // No `behavior`: the CSS `scroll-behavior` decides, so reduced motion jumps.
  if (el) window.scrollTo({ top: targetOf(el) })
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <nav
    aria-label="Steps"
    class="fixed top-1/2 right-2 z-40 flex -translate-y-1/2 flex-col gap-2 transition-[opacity,translate] duration-300 ease-soft motion-reduce:transition-none sm:right-4"
    :class="visible ? 'opacity-100' : 'pointer-events-none translate-x-4 opacity-0'"
    :inert="!visible"
  >
    <button
      v-for="dir in ([-1, 1] as const)"
      :key="dir"
      type="button"
      class="grid size-10 place-items-center rounded-full bg-paper/90 text-ink shadow-md backdrop-blur-sm transition-[background-color,color,opacity] hover:bg-mignon disabled:pointer-events-none disabled:opacity-35"
      :aria-label="dir === 1 ? 'Next step' : 'Previous step'"
      :disabled="dir === 1 ? !canGoDown : !canGoUp"
      @click="go(dir)"
    >
      <svg viewBox="0 0 12 12" class="size-4" :class="dir === -1 && 'rotate-180'" aria-hidden="true">
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
  </nav>
</template>
