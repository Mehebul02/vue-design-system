<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch } from 'vue'
import { cn } from '../../lib/utils/cn'
import { focusElement, scrollIntoViewIfNeeded } from '../../lib/utils/focus'
import { useId } from '../../lib/utils/useId'
import { useOutsideClick } from '../../lib/utils/useOutsideClick'

defineOptions({ inheritAttrs: false })

type MultiSelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type MultiSelectProps = {
  options: MultiSelectOption[]
  modelValue?: string[]
  placeholder?: string
  disabled?: boolean
  id?: string
  searchable?: boolean
  searchPlaceholder?: string
}

const props = withDefaults(defineProps<MultiSelectProps>(), {
  modelValue: () => [],
  placeholder: 'Select options',
  disabled: false,
  searchable: true,
  searchPlaceholder: 'Search options',
})

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

const attrs = useAttrs()

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const isOpen = ref(false)
const activeIndex = ref(-1)
const search = ref('')

const baseId = useId('multiselect')
const selectId = computed(() => props.id ?? baseId)
const listboxId = computed(() => `${selectId.value}-listbox`)
const optionId = (index: number) => `${selectId.value}-option-${index}`

const selectedValues = computed(() => props.modelValue ?? [])

const selectedOptions = computed(() =>
  selectedValues.value
    .map((value) => props.options.find((option) => option.value === value))
    .filter((option): option is MultiSelectOption => Boolean(option)),
)

const normalizedSearch = computed(() => search.value.trim().toLowerCase())

type VisibleOption = { option: MultiSelectOption; index: number }

const visibleOptions = computed<VisibleOption[]>(() => {
  const items = props.options.map((option, index) => ({ option, index }))
  if (!props.searchable || normalizedSearch.value.length === 0) return items
  return items.filter(({ option }) => {
    const label = option.label.toLowerCase()
    const value = option.value.toLowerCase()
    return label.includes(normalizedSearch.value) || value.includes(normalizedSearch.value)
  })
})

const triggerClasses = computed(() => {
  const { class: className } = attrs
  return cn(
    'flex min-h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    className,
  )
})

const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const activeOption = computed(() => visibleOptions.value[activeIndex.value])

const activeDescendant = computed(() => {
  if (!isOpen.value) return undefined
  const active = activeOption.value
  return active ? optionId(active.index) : undefined
})

const findFirstEnabled = (items: VisibleOption[]) => {
  return items.findIndex(({ option }) => !option.disabled)
}

const setActiveIndex = (index: number) => {
  const option = visibleOptions.value[index]?.option
  if (!option || option.disabled) return
  activeIndex.value = index
}

const openList = () => {
  if (props.disabled || isOpen.value) return
  isOpen.value = true

  if (props.searchable) {
    search.value = ''
  }

  const selectedIndex = visibleOptions.value.findIndex(
    ({ option }) => selectedValues.value.includes(option.value) && !option.disabled,
  )

  if (selectedIndex >= 0) {
    activeIndex.value = selectedIndex
  } else {
    activeIndex.value = findFirstEnabled(visibleOptions.value)
  }

  nextTick(() => {
    if (props.searchable) {
      searchInputRef.value?.focus({ preventScroll: true })
    }
    const active = activeOption.value
    if (typeof document === 'undefined' || !active) return
    const element = document.getElementById(optionId(active.index))
    scrollIntoViewIfNeeded(element)
  })
}

const closeList = (options: { focusTrigger?: boolean } = {}) => {
  isOpen.value = false
  activeIndex.value = -1
  if (props.searchable) {
    search.value = ''
  }
  if (options.focusTrigger) {
    focusElement(triggerRef.value)
  }
}

const toggleList = () => {
  if (isOpen.value) {
    closeList()
  } else {
    openList()
  }
}

const moveActive = (delta: number) => {
  const items = visibleOptions.value
  if (!items.length) return
  const total = items.length
  let nextIndex = activeIndex.value

  for (let i = 0; i < total; i += 1) {
    nextIndex = (nextIndex + delta + total) % total
    if (!items[nextIndex]?.option.disabled) {
      activeIndex.value = nextIndex
      nextTick(() => {
        if (typeof document === 'undefined') return
        const active = visibleOptions.value[nextIndex]
        if (!active) return
        const element = document.getElementById(optionId(active.index))
        scrollIntoViewIfNeeded(element)
      })
      break
    }
  }
}

const toggleOption = (option: MultiSelectOption) => {
  if (option.disabled) return
  const values = selectedValues.value
  const nextValues = values.includes(option.value)
    ? values.filter((value) => value !== option.value)
    : [...values, option.value]
  emit('update:modelValue', nextValues)
}

const isSelected = (value: string) => selectedValues.value.includes(value)

const removeOption = (value: string) => {
  const nextValues = selectedValues.value.filter((selected) => selected !== value)
  emit('update:modelValue', nextValues)
}

const handleTriggerKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openList()
      } else {
        moveActive(1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        openList()
      } else {
        moveActive(-1)
      }
      break
    case 'Enter':
    case ' ': {
      event.preventDefault()
      if (!isOpen.value) {
        openList()
      } else {
        const option = visibleOptions.value[activeIndex.value]?.option
        if (option) toggleOption(option)
      }
      break
    }
    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        closeList({ focusTrigger: true })
      }
      break
    case 'Tab':
      if (isOpen.value) closeList()
      break
    default:
      break
  }
}

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  search.value = target.value
}

const handleListKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveActive(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveActive(-1)
      break
    case 'Enter':
    case ' ': {
      event.preventDefault()
      const option = visibleOptions.value[activeIndex.value]?.option
      if (option) toggleOption(option)
      break
    }
    case 'Escape':
      event.preventDefault()
      closeList({ focusTrigger: true })
      break
    case 'Tab':
      closeList()
      break
    default:
      break
  }
}

const emptyMessage = computed(() => {
  return normalizedSearch.value.length > 0 ? 'No matches found' : 'No options available'
})

watch(visibleOptions, (nextOptions) => {
  if (!isOpen.value) return
  if (!nextOptions.length) {
    activeIndex.value = -1
    return
  }
  if (activeIndex.value < 0 || activeIndex.value >= nextOptions.length) {
    activeIndex.value = findFirstEnabled(nextOptions)
  }
})

useOutsideClick(
  rootRef,
  () => {
    if (isOpen.value) closeList()
  },
  isOpen,
)
</script>

<template>
  <div ref="rootRef" class="relative">
    <div
      ref="triggerRef"
      :id="selectId"
      v-bind="restAttrs"
      role="combobox"
      :aria-controls="listboxId"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-activedescendant="searchable ? undefined : activeDescendant"
      :aria-disabled="disabled ? 'true' : undefined"
      :tabindex="disabled ? -1 : 0"
      :class="triggerClasses"
      @click="toggleList"
      @keydown="handleTriggerKeydown"
    >
      <span class="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
        <span v-if="selectedOptions.length === 0" class="text-muted-foreground">
          {{ placeholder }}
        </span>
        <span
          v-for="option in selectedOptions"
          :key="option.value"
          class="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground"
        >
          <span class="truncate">{{ option.label }}</span>
          <button
            type="button"
            class="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            :aria-label="`Remove ${option.label}`"
            @click.stop="removeOption(option.value)"
            @keydown.stop
          >
            <svg viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M4.22 4.22a.75.75 0 0 1 1.06 0L10 8.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L11.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </span>
      </span>
      <svg
        class="h-4 w-4 shrink-0 opacity-60"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <div
        v-if="isOpen"
        :id="listboxId"
        role="listbox"
        aria-multiselectable="true"
        :aria-labelledby="selectId"
        class="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 text-sm shadow-soft"
      >
        <div v-if="searchable" class="p-1">
          <input
            ref="searchInputRef"
          type="text"
          role="searchbox"
          :placeholder="searchPlaceholder"
          class="h-8 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            :value="search"
            :aria-activedescendant="activeDescendant"
            aria-label="Search options"
            autocomplete="off"
            @input="handleSearchInput"
            @keydown="handleListKeydown"
          />
        </div>
        <div
          v-if="visibleOptions.length === 0"
          class="px-2 py-1.5 text-xs text-muted-foreground"
        >
          {{ emptyMessage }}
        </div>
        <div
          v-for="(item, visibleIndex) in visibleOptions"
          :id="optionId(item.index)"
          :key="item.option.value"
          role="option"
          :aria-selected="isSelected(item.option.value)"
          :aria-disabled="item.option.disabled ? 'true' : undefined"
          :class="cn(
            'flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 outline-none',
            item.option.disabled && 'cursor-not-allowed opacity-50',
            visibleIndex === activeIndex && 'bg-accent text-accent-foreground',
          )"
          @mouseenter="setActiveIndex(visibleIndex)"
          @click="toggleOption(item.option)"
        >
          <slot
            name="option"
            :option="item.option"
            :active="visibleIndex === activeIndex"
            :selected="isSelected(item.option.value)"
            :disabled="item.option.disabled"
          >
            <span class="truncate">{{ item.option.label }}</span>
            <svg
              v-if="isSelected(item.option.value)"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.7 5.29a1 1 0 0 1 .01 1.41l-7.4 7.4a1 1 0 0 1-1.42 0L3.3 9.5a1 1 0 1 1 1.4-1.42l3.13 3.14 6.7-6.7a1 1 0 0 1 1.41-.01Z"
                clip-rule="evenodd"
              />
            </svg>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
