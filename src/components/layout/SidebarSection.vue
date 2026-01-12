<template>
  <div>
    <!-- Section Header -->
    <div class="flex items-center justify-between px-3 mb-2">
      <span
          class="text-xs font-semibold text-slate-400 uppercase tracking-wide"
      >
        {{ section.label }}
      </span>

      <IconGrid class="w-4 h-4 text-slate-300" />
    </div>

    <!-- Items -->
    <div class="space-y-1">
      <SidebarItem
          v-for="item in section.items"
          :key="item.key"
          :item="item"
          :active="activeKey === item.key"
          @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup>

import SidebarItem from './SidebarItem.vue'
import IconGrid from "../../assets/icons/IconGrid.vue";

defineProps({
  section: Object,
  activeKey: String
})

defineEmits(['select'])
</script>
