import { onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue'

/**
 * One rAF loop and one IntersectionObserver for the whole page, no matter how
 * many steps there are. Each registered element gets a `--parallax` custom
 * property between -1 (scrolled past, above the viewport) and 1 (still below
 * the fold), 0 when centred; the CSS in style.css turns that into a translate.
 *
 * The composables return template *ref functions*: `<div :ref="imageEl">`.
 */

type RefTarget = Element | ComponentPublicInstance | null

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const toElement = (target: RefTarget): HTMLElement | null =>
  target instanceof HTMLElement ? target : null

const clamp = (n: number) => (n < -1 ? -1 : n > 1 ? 1 : n)

/* ── shared parallax ticker ────────────────────────────────────────────── */

const tracked = new Set<HTMLElement>()
let frame = 0
let observer: IntersectionObserver | null = null

function update() {
  frame = 0
  const viewport = window.innerHeight

  for (const el of tracked) {
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    // 0 when the element is centred, ±1 at the edges of its travel.
    const progress = (center - viewport / 2) / (viewport / 2 + rect.height / 2)
    el.style.setProperty('--parallax', clamp(progress).toFixed(4))
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}

function ensureObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) tracked.add(el)
        else tracked.delete(el)
      }
      schedule()
    },
    // Start drifting slightly before the element scrolls into view.
    { rootMargin: '20% 0px 20% 0px' },
  )

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })

  return observer
}

/**
 * Attach to the element that should drift as you scroll.
 * `shift` is the total travel in pixels; negative moves the other way.
 */
export function useParallax(shift = 28) {
  let current: HTMLElement | null = null

  const detach = () => {
    if (!current) return
    observer?.unobserve(current)
    tracked.delete(current)
    current = null
  }

  const setRef = (target: RefTarget) => {
    detach()
    const el = toElement(target)
    if (!el || prefersReducedMotion()) return

    current = el
    el.style.setProperty('--parallax-shift', `${shift}px`)
    ensureObserver().observe(el)
    schedule()
  }

  onBeforeUnmount(detach)

  return setRef
}

/* ── reveal on first sight ─────────────────────────────────────────────── */

/**
 * Fades + lifts an element the first time it enters the viewport.
 */
export function useReveal(threshold = 0.15) {
  let io: IntersectionObserver | null = null

  const setRef = (target: RefTarget) => {
    io?.disconnect()
    const el = toElement(target)
    if (!el) return

    if (prefersReducedMotion()) {
      el.classList.add('is-visible')
      return
    }

    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          io?.unobserve(entry.target)
        }
      },
      { threshold },
    )
    io.observe(el)
  }

  onBeforeUnmount(() => io?.disconnect())

  return setRef
}

/* ── page progress ─────────────────────────────────────────────────────── */

/**
 * 0 → 1 progress through the whole document, for the top progress bar.
 */
export function useScrollProgress() {
  const progress = ref(0)
  let raf = 0

  const measure = () => {
    raf = 0
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? clamp(window.scrollY / max) : 0
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(measure)
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return progress
}
