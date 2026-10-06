import { ref, watch } from 'vue'

/**
 * Which version of the guide the reader wants:
 *   'first'     — every step expanded with its full details.
 *   'refresher' — just the headline per step (warnings still show); details
 *                 are one tap away.
 *
 * One module-level ref shared by every component, remembered per browser.
 */
export type Mode = 'first' | 'refresher'

const STORAGE_KEY = 'espresso-guide-mode'

function load(): Mode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'refresher' ? 'refresher' : 'first'
  } catch {
    return 'first'
  }
}

const mode = ref<Mode>(load())

watch(mode, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Private mode / blocked storage: the choice just won't stick.
  }
})

export function useMode() {
  return mode
}
