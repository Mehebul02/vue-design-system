<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, Input, MultiSelect, Select, Skeleton } from './components/ui'
import { THEME_COLORS } from './lib/tokens/colors'
import { useTheme } from './lib/tokens/theme'

const { mode, toggleMode, color } = useTheme()

const colorOptions = THEME_COLORS.map((theme) => ({
  value: theme.name,
  label: theme.label,
}))

const name = ref('')
const email = ref('')
const plan = ref<string | undefined>(undefined)
const status = ref<string | undefined>(undefined)
const assignees = ref<string[]>(['ava', 'kenji'])

const emailError = computed(() => {
  if (!email.value) return ''
  return email.value.includes('@') ? '' : 'Enter a valid email address.'
})

const planOptions = [
  { value: 'starter', label: 'Starter' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
]

const statusOptions = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'ready', label: 'Ready for review' },
  { value: 'shipped', label: 'Shipped' },
]

const assigneeOptions = [
  { value: 'ava', label: 'Ava Patel' },
  { value: 'corey', label: 'Corey James' },
  { value: 'dana', label: 'Dana Wu' },
  { value: 'emma', label: 'Emma Thompson' },
  { value: 'jules', label: 'Jules Rossi' },
  { value: 'kenji', label: 'Kenji Watanabe' },
  { value: 'sora', label: 'Sora Kim', disabled: true },
]
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-background text-foreground">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
      />
    </div>

    <main class="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <header class="flex flex-col gap-4">
        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Vue Design System
        </span>
        <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
          Compact, accessible UI primitives with themeable tokens.
        </h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Inspired by shadcn/ui, this Vue 3 system pairs TailwindCSS tokens with clean components, keyboard-first
          interactions, and runtime color switching.
        </p>
      </header>

      <section class="grid gap-4 rounded-lg border border-border bg-card/70 p-5 shadow-soft">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-base font-semibold">Theme controls</h2>
            <p class="text-xs text-muted-foreground">
              Mode and primary color persist across reloads.
            </p>
          </div>
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Mode:</span>
            <span class="rounded-full border border-border px-2 py-0.5 text-[0.7rem] uppercase tracking-wide">
              {{ mode }}
            </span>
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div class="grid gap-1.5">
            <span class="text-xs font-medium text-muted-foreground">Primary color</span>
            <Select v-model="color" :options="colorOptions" />
          </div>
          <div class="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" @click="toggleMode">Toggle mode</Button>
            <Button variant="secondary" size="sm" :loading="false">Preview</Button>
          </div>
        </div>
      </section>

      <section class="grid gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Buttons</h2>
          <span class="text-xs text-muted-foreground">Variants and sizes</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link" as="a" href="#">Link</Button>
          <Button variant="outline">
            <template #iconBefore>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Add item
          </Button>
          <Button variant="secondary">
            Continue
            <template #iconAfter>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 10a.75.75 0 0 1 .75-.75h8.19l-2.47-2.47a.75.75 0 1 1 1.06-1.06l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06l2.47-2.47H4.97A.75.75 0 0 1 4.22 10Z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
          </Button>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Icon button">+</Button>
          <Button size="md" :loading="true">Saving</Button>
        </div>
      </section>

      <section class="grid gap-4 rounded-lg border border-border bg-card/60 p-5">
        <div>
          <h2 class="text-lg font-semibold">Form inputs</h2>
          <p class="text-xs text-muted-foreground">Compact sizing, description, and error affordances.</p>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <Input
            v-model="name"
            label="Full name"
            placeholder="Ada Lovelace"
            description="Shows on your profile and invoices."
          />
          <Input
            v-model="email"
            label="Work email"
            placeholder="ada@analytical.engine"
            :error="emailError"
            :aria-invalid="Boolean(emailError)"
            description="We will only use this for account updates."
          />
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="grid gap-1.5">
            <span class="text-xs font-medium text-muted-foreground">Plan</span>
            <Select v-model="plan" :options="planOptions" placeholder="Pick a plan" />
          </div>
          <div class="grid gap-1.5">
            <span class="text-xs font-medium text-muted-foreground">Status</span>
            <Select v-model="status" :options="statusOptions" placeholder="Select status" />
          </div>
        </div>
        <div class="grid gap-1.5">
          <span class="text-xs font-medium text-muted-foreground">Assignees</span>
          <MultiSelect
            v-model="assignees"
            :options="assigneeOptions"
            placeholder="Select team members"
            search-placeholder="Search by name"
          />
        </div>
      </section>

      <section class="grid gap-4 rounded-lg border border-border bg-card/50 p-5">
        <div>
          <h2 class="text-lg font-semibold">Skeletons</h2>
          <p class="text-xs text-muted-foreground">Configurable placeholders with variants.</p>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="grid gap-3">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="55%" />
          </div>
          <div class="flex items-start gap-3">
            <Skeleton variant="circle" :width="44" :height="44" />
            <div class="grid flex-1 gap-2">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <Skeleton variant="card" :height="140" radius="lg" />
          <div class="grid grid-cols-2 gap-3">
            <Skeleton variant="rect" :height="52" radius="md" />
            <Skeleton variant="rect" :height="52" radius="md" />
            <Skeleton variant="rect" :height="52" radius="md" />
            <Skeleton variant="rect" :height="52" radius="md" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
