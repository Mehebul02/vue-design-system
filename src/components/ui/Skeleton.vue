<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '../../lib/utils/cn'

defineOptions({ inheritAttrs: false })

type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card'

type SkeletonProps = {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  animated?: boolean
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'rect',
  radius: undefined,
  animated: true,
  width: undefined,
  height: undefined,
})

const attrs = useAttrs()

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-3 w-full',
  circle: 'h-10 w-10',
  rect: 'h-10 w-full',
  card: 'h-24 w-full',
}

const radiusClasses: Record<NonNullable<SkeletonProps['radius']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

const resolvedRadius = computed(() => {
  if (props.radius) return props.radius
  if (props.variant === 'circle') return 'full'
  return 'md'
})

const style = computed(() => {
  const width = props.width
  const height = props.height
  return {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }
})

const classes = computed(() => {
  const { class: className } = attrs
  return cn(
    'relative overflow-hidden bg-muted/60 dark:bg-muted/40',
    props.animated && 'animate-pulse',
    variantClasses[props.variant],
    radiusClasses[resolvedRadius.value],
    className,
  )
})

const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
</script>

<template>
  <div v-bind="restAttrs" :class="classes" :style="style" aria-hidden="true" />
</template>
