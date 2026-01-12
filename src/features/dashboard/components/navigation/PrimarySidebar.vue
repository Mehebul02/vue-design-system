<script setup lang="ts">
import type { MenuItem } from '../../data/menus';

type PrimarySidebarProps = {
  menus: MenuItem[];
  activeMenuId: string;
};

const props = defineProps<PrimarySidebarProps>();
const emit = defineEmits<{ (event: 'select', id: string): void }>();

const isActive = (id: string) => id === props.activeMenuId;
</script>

<template>
  <aside
    class="fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-16 flex-col items-center border-r border-slate-200/80 bg-[#F4F4F5] text-slate-900"
  >


    <nav class="mt-8 flex flex-1 flex-col items-center gap-3">
      <button
        v-for="menu in props.menus"
        :key="menu.id"
        type="button"
        class="group relative flex h-11 w-11 items-center justify-center rounded-2xl transition"
        :class="
          isActive(menu.id)
            ? 'bg-slate-900 text-white shadow-md'
            : 'text-slate-500 hover:bg-slate-200/70 hover:text-slate-900'
        "
        :title="menu.label"
        :aria-current="isActive(menu.id) ? 'page' : undefined"
        @click="emit('select', menu.id)"
      >
        <span
          v-if="isActive(menu.id)"
          class="absolute -left-3 h-6 w-1 rounded-r bg-amber-300"
        ></span>
        <svg
          viewBox="0 0 24 24"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-for="(path, index) in menu.icon" :key="index" :d="path" />
        </svg>
      </button>
    </nav>

    <slot name="footer">
      <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/10 text-xs font-semibold text-slate-600">
        AL
      </div>
    </slot>
  </aside>
</template>
