<template>
  <button
      class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition"
      :class="active
      ? 'bg-slate-100 text-slate-900 [&_svg]:text-indigo-500'
      : 'text-slate-700 hover:bg-slate-100'"
      @click="$emit('select', item.key)"
  >
    <component :is="item.icon" class="w-5 h-5 text-slate-400" />
    <span class="font-medium">{{ item.label }}</span>
  </button>
</template>

<script setup>
defineProps({
  item: Object,
  active: Boolean
})

defineEmits(['select'])
</script>
