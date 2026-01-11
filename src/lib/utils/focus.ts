export function focusElement(element: HTMLElement | null) {
  if (!element) return
  if (typeof element.focus === 'function') {
    element.focus({ preventScroll: true })
  }
}

export function scrollIntoViewIfNeeded(element: HTMLElement | null) {
  if (!element || typeof element.scrollIntoView !== 'function') return
  element.scrollIntoView({ block: 'nearest' })
}
