<template>
  <aside class="w-16 shrink-0 bg-slate-950 text-slate-400 flex flex-col items-center py-5 gap-3 border-r border-slate-800/70">
    <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-semibold">
      F
    </div>

    <div class="flex flex-col gap-2">
      <button
        v-for="item in menus"
        :key="item.key"
        @click="$emit('change', item.key)"
        class="w-10 h-10 flex items-center justify-center rounded-xl transition"
        :class="activeMenu === item.key
          ? 'bg-white text-slate-900 shadow-sm'
          : 'hover:bg-white/10 hover:text-white'"
      >
        <component :is="item.icon" class="w-5 h-5" />
      </button>
    </div>

    <div class="mt-auto pb-3">
      <button class="w-10 h-10 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition">
        <IconGrid class="w-5 h-5" />
      </button>
    </div>
  </aside>
</template>

<script setup>
import IconGrid from "../../assets/icons/IconGrid.vue";
import IconBox from "../../assets/icons/IconBox.vue";
import IconClipboard from "../../assets/icons/IconClipboard.vue";

defineProps({
  activeMenu: String
})

const menus = [
  { key: 'dashboard', icon: IconGrid },
  { key: 'products', icon: IconBox },
  { key: 'orders', icon: IconClipboard },
  { key: 'components', icon: IconGrid }
]
</script>
