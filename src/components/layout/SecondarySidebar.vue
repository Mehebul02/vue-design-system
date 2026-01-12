<script setup>
import SidebarItem from './SidebarItem.vue'
import SidebarSection from './SidebarSection.vue'

defineProps({
  activeKey: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Products'
  },
  standalone: {
    type: Array,
    default: () => []
  },
  sections: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:activeKey'])

const select = (key) => {
  emit('update:activeKey', key)
}
</script>


<template>
  <aside class="w-64 shrink-0 bg-white border-r h-full overflow-y-auto font-sans">
    <div class="p-4">
      <div class="flex rounded-xl overflow-hidden bg-slate-900 text-white">
        <button
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium hover:bg-slate-800 transition"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          {{ title }}
        </button>

        <button
          class="px-3 flex items-center justify-center border-l border-white/15 hover:bg-slate-800 transition"
          aria-label="More options"
        >
          <span class="text-lg leading-none">+</span>
        </button>
      </div>
    </div>

    <nav class="px-3 pb-6 space-y-6">
      <SidebarItem
        v-for="item in standalone"
        :key="item.key"
        :item="item"
        :active="activeKey === item.key"
        @select="select"
      />

      <SidebarSection
        v-for="section in sections"
        :key="section.label"
        :section="section"
        :active-key="activeKey"
        @select="select"
      />
    </nav>
  </aside>
</template>

