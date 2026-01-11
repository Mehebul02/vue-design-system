<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { cn } from '../../lib/utils/cn'
import { useId } from '../../lib/utils/useId'

defineOptions({ inheritAttrs: false })

type InputProps = {
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  label?: string
  description?: string
  error?: string
  ariaInvalid?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  ariaInvalid: undefined,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const attrs = useAttrs()
const slots = useSlots()

const baseId = useId('input')
const inputId = computed(() => props.id ?? baseId)
const descriptionId = computed(() => `${inputId.value}-description`)
const errorId = computed(() => `${inputId.value}-error`)

const hasDescription = computed(() => Boolean(props.description || slots.description))
const hasError = computed(() => Boolean(props.error || slots.error))

const describedBy = computed(() => {
  const ids: string[] = []
  const attrValue = (attrs as Record<string, unknown>)['aria-describedby']
  if (typeof attrValue === 'string' && attrValue.length > 0) {
    ids.push(attrValue)
  }
  if (hasDescription.value) ids.push(descriptionId.value)
  if (hasError.value) ids.push(errorId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const ariaInvalid = computed(() => {
  if (typeof props.ariaInvalid === 'boolean') return props.ariaInvalid
  return hasError.value ? true : undefined
})

const inputClasses = computed(() => {
  const { class: className } = attrs
  return cn(
    'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    hasError.value && 'border-destructive focus-visible:ring-destructive',
    className,
  )
})

const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="grid gap-1.5">
    <label v-if="label || slots.label" :for="inputId" class="text-sm font-medium">
      <slot name="label">{{ label }}</slot>
    </label>
    <input
      :id="inputId"
      v-bind="restAttrs"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="describedBy"
      :class="inputClasses"
      :value="modelValue"
      @input="onInput"
    />
    <p v-if="hasDescription" :id="descriptionId" class="text-xs text-muted-foreground">
      <slot name="description">{{ description }}</slot>
    </p>
    <p v-if="hasError" :id="errorId" class="text-xs text-destructive">
      <slot name="error">{{ error }}</slot>
    </p>
  </div>
</template>
