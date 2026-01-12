<script setup lang="ts">
import SectionLayout from '../components/SectionLayout.vue';
import { sectionData } from '../data/sections';

const section = sectionData.ordersShipments;
</script>

<template>
  <SectionLayout v-bind="section" />
</template>
