import { getCurrentInstance } from 'vue'

let globalId = 0

export function useId(prefix = 'id') {
  const instance = getCurrentInstance()
  if (instance?.uid != null) {
    return `${prefix}-${instance.uid}`
  }

  globalId += 1
  return `${prefix}-${globalId}`
}
