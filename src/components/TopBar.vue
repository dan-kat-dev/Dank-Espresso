<script setup lang="ts">
/**
 * The hero, collapsed: slides down once the big title has scrolled away.
 * Small title (tap to go back up), the settings on wide screens, the mode
 * switch, and the page progress along the bottom edge.
 */
import { watch } from 'vue'
import { gear } from '@/data/steps'
import { useMode } from '@/composables/useMode'
import { useScrollProgress } from '@/composables/useParallax'
import ModeToggle from './ModeToggle.vue'

const props = defineProps<{ visible: boolean }>()

const progress = useScrollProgress()

/**
 * Switching modes from down the page resizes every step above you. Hold the
 * step you're reading where it is while the details animate (500ms, see
 * StepSection) — not every browser anchors the scroll position on its own.
 * `sync` so the "before" position is read ahead of any re-render.
 */
const mode = useMode()
watch(
  mode,
  () => {
    if (!props.visible) return

    const reading = [...document.querySelectorAll<HTMLElement>('main > section, main > footer')].find(
      (el) => el.getBoundingClientRect().bottom > 80,
    )
    if (!reading) return

    const top = reading.getBoundingClientRect().top
    const until = performance.now() + 600
    const hold = () => {
      const drift = reading.getBoundingClientRect().top - top
      if (drift) window.scrollBy({ top: drift, behavior: 'instant' })
      if (performance.now() < until) requestAnimationFrame(hold)
    }
    requestAnimationFrame(hold)
  },
  { flush: 'sync' },
)
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 z-50 bg-mignon pt-[env(safe-area-inset-top)] transition-transform duration-300 ease-soft motion-reduce:transition-none"
    :class="visible ? 'shadow-md' : '-translate-y-full'"
    :inert="!visible"
  >
    <div class="mx-auto flex h-12 max-w-5xl items-center gap-3 px-4 sm:px-6">
      <a href="#top" class="min-w-0 truncate font-display text-base sm:text-lg">
        Dan Kat Espresso
      </a>

      <dl class="ml-4 hidden gap-5 text-xs lg:flex">
        <div v-for="item in gear.settings" :key="item.label" class="flex items-baseline gap-1.5">
          <dt class="tracking-[0.15em] uppercase">{{ item.label }}</dt>
          <dd class="font-semibold">{{ item.value }}</dd>
        </div>
      </dl>

      <ModeToggle compact class="ml-auto shrink-0" />
    </div>

    <div class="h-0.5 bg-ink/15" aria-hidden="true">
      <div class="h-full origin-left bg-ink" :style="{ transform: `scaleX(${progress})` }" />
    </div>
  </div>
</template>
