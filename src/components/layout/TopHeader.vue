<template>
  <header class="fixed top-0 inset-x-0 h-14 bg-white border-b flex items-center px-6 z-50">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-semibold">
        F
      </div>
      <div class="font-semibold text-lg text-slate-900">FleetCart</div>
    </div>

    <div class="flex-1 flex justify-center px-6">
      <div class="relative w-full max-w-xl">
        <IconSearch class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          class="w-full pl-9 pr-16 py-2 text-sm border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Search here"
        />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded-md bg-white">
          ⌘ K
        </span>
      </div>
    </div>

    <div class="flex items-center gap-3 text-slate-500">
      <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:text-slate-700 transition">
        <IconStore />
      </button>
      <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:text-slate-700 transition">
        <IconMaximize />
      </button>
      <button class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:text-slate-700 transition">
        <IconGlobe />
      </button>
      <button class="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center">
        <IconUser class="w-4 h-4" />
      </button>
    </div>
  </header>
</template>

<script setup>
import IconSearch from "../../assets/icons/IconSearch.vue";
import IconStore from "../../assets/icons/IconStore.vue";
import IconMaximize from "../../assets/icons/IconMaximize.vue";
import IconGlobe from "../../assets/icons/IconGlobe.vue";
import IconUser from "../../assets/icons/IconUser.vue";
</script>
