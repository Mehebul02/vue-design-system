<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '../../lib/utils/cn'

defineOptions({ inheritAttrs: false })

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: keyof HTMLElementTagNameMap
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'md',
  as: 'button',
  disabled: false,
  loading: false,
})

const attrs = useAttrs()

const isButton = computed(() => props.as === 'button')
const isDisabled = computed(() => props.disabled || props.loading)

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-5 text-sm',
  icon: 'h-9 w-9',
}

const classes = computed(() => {
  const { class: className } = attrs
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50',
    variantClasses[props.variant],
    sizeClasses[props.size],
    isDisabled.value && !isButton.value && 'pointer-events-none opacity-50',
    className,
  )
})

const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const buttonType = computed(() => {
  const attrType = (attrs as Record<string, unknown>).type
  return typeof attrType === 'string' ? attrType : 'button'
})

const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) return
  event.preventDefault()
  event.stopPropagation()
}
</script>

<template>
  <component
    :is="as"
    v-bind="restAttrs"
    :class="classes"
    :type="isButton ? buttonType : undefined"
    :disabled="isButton ? isDisabled : undefined"
    :aria-disabled="!isButton && isDisabled ? 'true' : undefined"
    :tabindex="!isButton && isDisabled ? -1 : undefined"
    :aria-busy="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <span
      v-if="$slots.iconBefore"
      class="inline-flex h-4 w-4 shrink-0 items-center justify-center"
    >
      <slot name="iconBefore" />
    </span>
    <span
      v-if="loading"
      class="inline-flex h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
      aria-hidden="true"
    />
    <slot />
    <span
      v-if="$slots.iconAfter"
      class="inline-flex h-4 w-4 shrink-0 items-center justify-center"
    >
      <slot name="iconAfter" />
    </span>
  </component>
</template>
