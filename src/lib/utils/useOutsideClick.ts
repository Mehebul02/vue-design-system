import { onBeforeUnmount, onMounted, type Ref } from 'vue'

type MaybeRef<T> = T | Ref<T>

function resolveBoolean(value: MaybeRef<boolean>) {
  return typeof value === 'boolean' ? value : value.value
}

export function useOutsideClick(
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: MaybeRef<boolean> = true,
) {
  const listener = (event: MouseEvent | TouchEvent) => {
    const el = target.value
    if (!el || !resolveBoolean(enabled)) return
    if (el === event.target || el.contains(event.target as Node)) return
    handler(event)
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
  })

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    document.removeEventListener('mousedown', listener)
    document.removeEventListener('touchstart', listener)
  })
}
