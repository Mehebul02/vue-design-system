<script setup lang="ts">
import type { MenuItem } from '../../data/menus';

type SecondarySidebarProps = {
  menu: MenuItem;
  activeSubMenuId: string;
  isOpen: boolean;
};

const props = defineProps<SecondarySidebarProps>();
const emit = defineEmits<{
  (event: 'select', id: string): void;
  (event: 'close'): void;
}>();

const isActive = (id: string) => id === props.activeSubMenuId;
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-x-0 bottom-0 top-16 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
    @click="emit('close')"
  ></div>
  <aside
    class="fixed left-16 top-16 z-40 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-xl transition-transform duration-200"
    :class="props.isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <div class="flex items-center justify-between px-5 py-5">
      <div>
        <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Section</p>
        <h2 class="mt-2 text-lg font-semibold text-slate-900">{{ props.menu.label }}</h2>
      </div>
      <button
        type="button"
        class="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-500 transition hover:border-slate-300 hover:text-slate-700 lg:hidden"
        @click="emit('close')"
      >
        Close
      </button>
    </div>

    <nav class="flex-1 space-y-1 px-3">
      <button
        v-for="child in props.menu.children"
        :key="child.id"
        type="button"
        class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition"
        :class="
          isActive(child.id)
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
        "
        @click="emit('select', child.id)"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-for="(path, index) in props.menu.icon" :key="index" :d="path" />
        </svg>
        <span class="truncate">{{ child.label }}</span>

      </button>
    </nav>


  </aside>
</template>
