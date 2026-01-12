<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DashboardLayout from './layouts/DashboardLayout.vue';
import { menus } from './features/dashboard/data/menus';

const route = useRoute();
const isDesignSystem = computed(() => route.path === '/ui-design');
</script>

<template>
  <RouterView v-if="isDesignSystem" />
  <DashboardLayout v-else :menus="menus">
    <RouterView />
  </DashboardLayout>
</template>
