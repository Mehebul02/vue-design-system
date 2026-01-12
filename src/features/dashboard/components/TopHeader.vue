<script setup lang="ts">
const searchQuery = defineModel<string>({ default: '' });

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void;
}>();


const iconBtnClass = "flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95";
</script>

<template>
  <header class="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3 bg-[#F4F4F5] border-b border-slate-100 sm:px-10">

    <div class="flex items-center gap-3">
      <slot name="left">
        <button
            @click="emit('toggle-sidebar')"
            :class="[iconBtnClass, 'border-slate-200 shadow-sm']"
            aria-label="Toggle Sidebar"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 7h16M4 12h16M4 17h10" stroke-linecap="round"/></svg>
        </button>
        <div class="flex items-center gap-2 font-semibold text-slate-900">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white">F</div>
          <span class="hidden sm:block text-sm">FleetCart</span>
        </div>
      </slot>
    </div>

    <div class="flex w-full justify-center">
      <slot name="center">
        <div class="relative w-full max-w-[420px]">
          <svg viewBox="0 0 24 24" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input
              v-model="searchQuery"
              type="search"
              placeholder="Search Here..."
              class="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm transition-all focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none"
          />
          <kbd class="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:block">
            ⌘ K
          </kbd>
        </div>
      </slot>
    </div>

    <div class="flex items-center justify-end gap-1 sm:gap-2">
      <slot name="right">
        <button :class="iconBtnClass" aria-label="Inbox">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 12l-3.45-6.9A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2zM2 12h6l2 3h4l2-3h6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <button :class="[iconBtnClass, 'hidden md:flex']" aria-label="Notifications">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7M13.73 21a2 2 0 0 1-3.46 0" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <button :class="iconBtnClass" aria-label="Settings">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white ring-2 ring-white shadow-sm hover:opacity-90">
          A
        </div>
      </slot>
    </div>
  </header>
</template>