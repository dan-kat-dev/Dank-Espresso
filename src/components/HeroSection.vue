<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gear } from '@/data/steps'
import { useParallax } from '@/composables/useParallax'
import { useMode } from '@/composables/useMode'
import cover from '@/assets/cover.jpg'
import ModeToggle from './ModeToggle.vue'
import TopBar from './TopBar.vue'

defineProps<{ total: number }>()

const mode = useMode()

const titleEl = useParallax(-40)
const introEl = useParallax(-40)
const cardEl = useParallax(20)

// Once the big title has scrolled away, the slim bar takes over.
const headingEl = ref<HTMLElement>()
const pastTitle = ref(false)
let io: IntersectionObserver | undefined

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    pastTitle.value = !entries.at(-1)?.isIntersecting
  })
  if (headingEl.value) io.observe(headingEl.value)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <!--
    Mignon-orange band around the cover illustration. Stacked (phones, tablets):
    title on solid orange, which fades into the picture and back out to solid
    orange above the intro and settings. From `lg:` the picture fills the right half instead.
    Black text only on this orange.
  -->
  <header class="relative isolate overflow-hidden bg-mignon">
    <div class="mx-auto max-w-5xl px-6 pt-14 sm:pt-20 lg:pt-32">
      <div :ref="titleEl" class="parallax lg:w-1/2 lg:pr-12">
        <h1
          ref="headingEl"
          class="font-display text-5xl leading-[1.05] text-balance sm:text-7xl"
        >
          Dan Kat Espresso
        </h1>

        <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink text-pretty">
          Step-by-step instructions for making your own delicious espresso using Dan’s setup.
        </p>
      </div>
    </div>

    <div
      class="relative -z-10 mt-10 h-[min(126vw,60rem)] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/2 lg:mt-0 lg:h-auto"
      aria-hidden="true"
    >
      <!-- Scaled up a touch to crop the rounded corners baked into the file. -->
      <img
        :src="cover"
        alt=""
        class="h-full w-full scale-[1.06] object-cover object-top md:object-[50%_80%] lg:object-top"
      />
      <!-- Orange in from the top (stacked only)… -->
      <div class="cover-fade-in absolute inset-x-0 top-0 h-[24%] lg:hidden"></div>
      <!-- …and back out at the bottom, or in from the left on wide screens. -->
      <div
        class="absolute inset-0 bg-linear-to-b from-mignon/0 from-84% via-mignon/85 via-93% to-mignon to-97% lg:bg-linear-to-r lg:from-mignon lg:from-0% lg:via-mignon/0 lg:via-20% lg:to-mignon/0 lg:to-100%"
      ></div>
    </div>

    <div class="mx-auto mt-10 max-w-5xl px-6 pb-14 sm:pb-20 lg:mt-12">
      <div :ref="introEl" class="parallax lg:w-1/2 lg:pr-12">
        <ModeToggle />

        <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink text-pretty">
          <template v-if="mode === 'first'">
            {{ total }} steps, about ten minutes. Every step is spelled out — scroll at your own
            pace.
          </template>
          <template v-else>
            Just the headlines. Tap “Show details” on any step you’re unsure of.
          </template>
          Warnings always show. Tap a
          <span class="whitespace-nowrap font-semibold">Tip</span> bubble on a picture
          for extras.
        </p>
      </div>

      <div :ref="cardEl" class="parallax mt-12 lg:w-1/2 lg:pr-12">
        <dl
          class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-silver shadow-sm sm:grid-cols-4 lg:grid-cols-2"
        >
          <div v-for="item in gear.settings" :key="item.label" class="bg-paper px-5 py-4">
            <dt class="text-xs tracking-[0.15em] text-steel uppercase">{{ item.label }}</dt>
            <dd class="mt-1 font-display text-2xl">{{ item.value }}</dd>
          </div>
        </dl>

        <p class="mt-3 text-sm text-ink">{{ gear.machine }} · {{ gear.grinder }}</p>
      </div>
    </div>
  </header>

  <TopBar :visible="pastTitle" />
</template>

<style scoped>
/* Eased, so there's no visible edge where the picture starts under the title. */
.cover-fade-in {
  background: linear-gradient(
    to bottom,
    var(--color-mignon),
    color-mix(in srgb, var(--color-mignon) 88%, transparent) 20%,
    color-mix(in srgb, var(--color-mignon) 55%, transparent) 45%,
    color-mix(in srgb, var(--color-mignon) 22%, transparent) 70%,
    transparent
  );
}
</style>
