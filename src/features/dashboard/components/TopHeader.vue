<script setup lang="ts">
import { computed, ref } from 'vue';

type TopHeaderProps = {
  modelValue?: string;
};

const props = defineProps<TopHeaderProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: 'toggle-sidebar'): void;
}>();

const internalQuery = ref('');

const searchQuery = computed({
  get() {
    return props.modelValue ?? internalQuery.value;
  },
  set(value: string) {
    if (props.modelValue === undefined) {
      internalQuery.value = value;
    }
    emit('update:modelValue', value);
  },
});

const handleToggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<template>
  <div class="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] items-center gap-4 px-10">
    <div class="flex items-center gap-3">
      <slot name="left">
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          @click="handleToggleSidebar"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h10" />
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-sm">
            F
          </div>
          <span class="text-sm font-semibold text-slate-900">FleetCart</span>
        </div>
      </slot>
    </div>

    <div class="flex min-w-0 items-center justify-center">
      <slot name="center">
        <div class="relative w-full max-w-[200px] sm:max-w-[320px] lg:max-w-[520px]">
          <svg
            viewBox="0 0 24 24"
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search Here"
            class="h-10 w-full rounded-full border border-slate-200 bg-slate-100/80 pl-10 pr-16 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/60"
          />
          <span
            class="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500 sm:inline-flex"
          >
            Ctrl K
          </span>
        </div>
      </slot>
    </div>

    <div class="flex items-center justify-end gap-2">
      <slot name="right">
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700"
          aria-label="View inbox"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M22 12l-3.45-6.9A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"
            />
            <path d="M2 12h6l2 3h4l2-3h6" />
          </svg>
        </button>
        <button
          type="button"
          class="hidden h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700 sm:inline-flex"
          aria-label="Open calendar"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
        <button
          type="button"
          class="hidden h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700 md:inline-flex"
          aria-label="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Settings"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
            />
          </svg>
        </button>
        <div class="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold text-white shadow-sm">
          A
        </div>
      </slot>
    </div>
  </div>
</template>
