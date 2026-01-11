import { onMounted, ref, watch } from 'vue'
import { isThemeColor, type ThemeColor } from './colors'

export type ThemeMode = 'light' | 'dark'

const MODE_KEY = 'ds-mode'
const COLOR_KEY = 'ds-color'

const mode = ref<ThemeMode>('light')
const color = ref<ThemeColor>('slate')

let initialized = false

function getStorage() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function applyTheme() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', mode.value === 'dark')
  root.dataset.color = color.value
}

function readStorage() {
  const storage = getStorage()
  if (!storage) return

  const storedMode = storage.getItem(MODE_KEY)
  if (storedMode === 'light' || storedMode === 'dark') {
    mode.value = storedMode
  }

  const storedColor = storage.getItem(COLOR_KEY)
  if (storedColor && isThemeColor(storedColor)) {
    color.value = storedColor
  }
}

function persistStorage() {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(MODE_KEY, mode.value)
  storage.setItem(COLOR_KEY, color.value)
}

export function useTheme() {
  if (!initialized) {
    initialized = true
    readStorage()

    watch([mode, color], () => {
      applyTheme()
      persistStorage()
    }, { immediate: true })

    onMounted(() => {
      applyTheme()
    })
  }

  const setMode = (next: ThemeMode) => {
    mode.value = next
  }

  const toggleMode = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  const setColor = (next: ThemeColor) => {
    color.value = next
  }

  return {
    mode,
    color,
    setMode,
    toggleMode,
    setColor,
  }
}
