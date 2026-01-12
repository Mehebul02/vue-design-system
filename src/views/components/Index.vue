<script setup lang="ts">
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'

const themes = ['blue', 'emerald', 'violet'] as const
const darkMode = ref(false)
const accent = ref<(typeof themes)[number]>('blue')

const root = () => document.documentElement

const applyTheme = () => {
  const node = root()
  node.classList.toggle('dark', darkMode.value)
  node.setAttribute('data-theme', accent.value)
}

onMounted(() => {
  const savedDark = localStorage.getItem('fc-dark')
  const savedAccent = localStorage.getItem('fc-accent') as (typeof themes)[number] | null
  if (savedDark !== null) {
    darkMode.value = savedDark === 'true'
  }
  if (savedAccent && themes.includes(savedAccent)) {
    accent.value = savedAccent
  }
  applyTheme()
})

watch(darkMode, (value) => {
  localStorage.setItem('fc-dark', String(value))
  applyTheme()
})

watch(accent, (value) => {
  localStorage.setItem('fc-accent', value)
  applyTheme()
})

const cycleAccent = () => {
  const index = themes.indexOf(accent.value)
  accent.value = themes[(index + 1) % themes.length]
}

const UiButton = defineComponent({
  props: {
    variant: {
      type: String,
      default: 'solid'
    },
    size: {
      type: String,
      default: 'md'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  setup(props, { slots }) {
    const variantClass = computed(() => {
      if (props.variant === 'outline') {
        return 'border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--muted)]'
      }
      if (props.variant === 'ghost') {
        return 'text-[var(--fg)] hover:bg-[var(--muted)]'
      }
      return 'bg-[var(--accent)] text-white hover:brightness-95 active:brightness-90'
    })

    const sizeClass = computed(() => {
      return props.size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-4 text-sm'
    })

    return () => (
      h(
        'button',
        {
          type: props.type,
          disabled: props.disabled,
          class: [
            'inline-flex items-center justify-center rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-50',
            variantClass.value,
            sizeClass.value
          ]
        },
        slots.default?.()
      )
    )
  }
})

const UiInput = defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    },
    autocomplete: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const baseClass = computed(() => [
      'h-8 w-full rounded-lg border bg-[var(--muted)] px-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:border-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-60',
      props.invalid ? 'border-rose-400 ring-rose-400 focus-visible:ring-rose-400' : 'border-[var(--border)]'
    ])

    return () => (
      h('input', {
        value: props.modelValue,
        type: props.type,
        placeholder: props.placeholder,
        disabled: props.disabled,
        readonly: props.readonly,
        id: props.id,
        name: props.name,
        autocomplete: props.autocomplete,
        'aria-invalid': props.invalid ? 'true' : 'false',
        class: baseClass.value,
        onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)
      })
    )
  }
})

const UiSelect = defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const baseClass = computed(() => [
      'h-8 w-full rounded-lg border bg-[var(--muted)] px-3 text-sm text-[var(--fg)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:border-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-60',
      props.invalid ? 'border-rose-400 ring-rose-400 focus-visible:ring-rose-400' : 'border-[var(--border)]'
    ])

    return () => (
      h(
        'select',
        {
          value: props.modelValue,
          disabled: props.disabled,
          id: props.id,
          name: props.name,
          'aria-invalid': props.invalid ? 'true' : 'false',
          class: baseClass.value,
          onChange: (event: Event) =>
            emit('update:modelValue', (event.target as HTMLSelectElement).value)
        },
        [
          props.placeholder
            ? h(
                'option',
                {
                  value: '',
                  disabled: true
                },
                props.placeholder
              )
            : null,
          ...(props.options as any[]).map((option) =>
            h(
              'option',
              {
                value: option.value,
                disabled: option.disabled
              },
              option.label
            )
          )
        ].filter(Boolean)
      )
    )
  }
})

const inputValue = ref('Compact UI')
const selectValue = ref('custom')
const options = [
  { label: 'Custom', value: 'custom' },
  { label: 'Standard', value: 'standard' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise', disabled: true }
]
</script>

<template>
  <section class="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] shadow-sm">
    <div class="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
      <div>
        <h1 class="text-base font-semibold">Components</h1>
        <p class="text-xs text-[var(--fg)]/60">Compact design system preview</p>
      </div>
      <div class="flex items-center gap-2">
        <UiButton size="sm" variant="outline" @click="darkMode = !darkMode">
          {{ darkMode ? 'Light' : 'Dark' }}
        </UiButton>
        <UiButton size="sm" variant="ghost" @click="cycleAccent">
          Accent: {{ accent }}
        </UiButton>
      </div>
    </div>

    <div class="space-y-3 px-4 py-4">
      <div class="space-y-2">
        <label class="text-xs font-medium text-[var(--fg)]/70">Project name</label>
        <UiInput v-model="inputValue" placeholder="Enter a name" />
      </div>

      <div class="space-y-2">
        <label class="text-xs font-medium text-[var(--fg)]/70">Plan</label>
        <UiSelect v-model="selectValue" :options="options" placeholder="Select a plan" />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <UiButton size="sm">Primary</UiButton>
        <UiButton size="sm" variant="outline">Outline</UiButton>
        <UiButton size="sm" variant="ghost">Ghost</UiButton>
        <UiButton size="sm" disabled>Disabled</UiButton>
      </div>
    </div>
  </section>
</template>

<style>
:root {
  --bg: #ffffff;
  --fg: #0f172a;
  --muted: #f1f5f9;
  --border: #e2e8f0;
  --ring: #3b82f6;
  --accent: #2563eb;
}

.dark {
  --bg: #0f172a;
  --fg: #e2e8f0;
  --muted: #1e293b;
  --border: #334155;
}

[data-theme='blue'] {
  --accent: #2563eb;
  --ring: #3b82f6;
}

[data-theme='emerald'] {
  --accent: #059669;
  --ring: #10b981;
}

[data-theme='violet'] {
  --accent: #7c3aed;
  --ring: #8b5cf6;
}
</style>
