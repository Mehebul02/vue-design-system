# Vue Design System

A compact, shadcn-inspired Vue 3 design system built with TailwindCSS, typed Composition API components, and runtime theme switching.

## Install

```bash
npm install
npm run dev
```

## Theme tokens and switching

- Tokens live in `src/styles/globals.css` as CSS variables (`--background`, `--foreground`, `--primary`, `--ring`, etc.).
- `useTheme()` in `src/lib/tokens/theme.ts` manages dark/light mode and primary palette.
- Settings persist to `localStorage` and update the `<html>` element (`class="dark"` and `data-color`).

```ts
import { useTheme } from './lib/tokens/theme'

const { mode, color, setMode, toggleMode, setColor } = useTheme()
```

## Components

### Button

```vue
<script setup lang="ts">
import { Button } from './components/ui'
</script>

<template>
  <Button>Primary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="destructive" size="sm">Delete</Button>
  <Button variant="link" as="a" href="#">Link</Button>
</template>
```

### Input

```vue
<script setup lang="ts">
import { Input } from './components/ui'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <Input
    v-model="email"
    label="Email"
    placeholder="name@company.com"
    description="We only send product updates."
  />
  <Input
    v-model="email"
    label="Email"
    placeholder="name@company.com"
    error="Enter a valid email address."
  />
</template>
```

### Select

```vue
<script setup lang="ts">
import { Select } from './components/ui'
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)

const options = [
  { value: 'starter', label: 'Starter' },
  { value: 'pro', label: 'Pro' },
]
</script>

<template>
  <Select v-model="value" :options="options" placeholder="Pick a plan" />
</template>
```

### MultiSelect

```vue
<script setup lang="ts">
import { MultiSelect } from './components/ui'
import { ref } from 'vue'

const values = ref<string[]>(['design'])

const options = [
  { value: 'design', label: 'Design' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'product', label: 'Product' },
]
</script>

<template>
  <MultiSelect
    v-model="values"
    :options="options"
    placeholder="Pick tags"
    search-placeholder="Search tags"
  />
</template>
```

### Skeleton

```vue
<script setup lang="ts">
import { Skeleton } from './components/ui'
</script>

<template>
  <div class="grid gap-2">
    <Skeleton variant="text" width="70%" />
    <Skeleton variant="text" />
    <Skeleton variant="circle" :width="40" :height="40" />
    <Skeleton variant="card" :height="120" radius="lg" />
  </div>
</template>
```

## Accessibility notes

- Focus states use `focus-visible` and tokenized `--ring` colors.
- Button and Input support disabled states and ARIA attributes.
- Select uses `role="combobox"`/`role="listbox"`/`role="option"` with keyboard navigation (Enter/Space, arrows, Escape) and outside-click dismissal.
- Input wires labels, descriptions, and error messages through generated IDs and `aria-describedby`.

## Project structure

```
src/
  components/ui/
    Button.vue
    Input.vue
    MultiSelect.vue
    Skeleton.vue
    Select.vue
  lib/
    tokens/
      colors.ts
      theme.ts
    utils/
      cn.ts
      focus.ts
      useId.ts
      useOutsideClick.ts
  styles/
    globals.css
```
