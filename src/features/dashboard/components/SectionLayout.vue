<script setup lang="ts">
import { withDefaults } from 'vue';
import type { KpiItem, TableRow, TaskItem } from '../data/sections';

type SectionLayoutProps = {
  title: string;
  subtitle: string;
  badge: string;
  kpis: KpiItem[];
  rows: TableRow[];
  tasks: TaskItem[];
  primaryAction?: string;
  secondaryAction?: string;
};

const props = withDefaults(defineProps<SectionLayoutProps>(), {
  primaryAction: 'Create',
  secondaryAction: 'Export',
});

const trendClass = (trend: KpiItem['trend']) => {
  if (trend === 'up') {
    return 'bg-emerald-50 text-emerald-700';
  }
  if (trend === 'down') {
    return 'bg-rose-50 text-rose-700';
  }
  return 'bg-slate-100 text-slate-600';
};

const statusClass = (status: string) => {
  const normalized = status.toLowerCase();
  if (
    normalized.includes('active') ||
    normalized.includes('live') ||
    normalized.includes('delivered') ||
    normalized.includes('approved')
  ) {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (
    normalized.includes('draft') ||
    normalized.includes('review') ||
    normalized.includes('packed') ||
    normalized.includes('onboarding') ||
    normalized.includes('needs reply') ||
    normalized.includes('in transit')
  ) {
    return 'bg-amber-100 text-amber-700';
  }
  if (
    normalized.includes('risk') ||
    normalized.includes('delayed') ||
    normalized.includes('flagged') ||
    normalized.includes('low') ||
    normalized.includes('churn')
  ) {
    return 'bg-rose-100 text-rose-700';
  }
  return 'bg-slate-100 text-slate-600';
};
</script>
<template>
  <section class="space-y-8 ">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="animate-fade-in">
        <p class="text-xs uppercase tracking-[0.24em] text-slate-400">
          {{ props.badge }}
        </p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          {{ props.title }}
        </h1>
        <p class="mt-2 max-w-2xl text-sm text-slate-500">
          {{ props.subtitle }}
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          {{ props.secondaryAction }}
        </button>
        <button
          type="button"
          class="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-slate-800"
        >
          {{ props.primaryAction }}
        </button>
      </div>
    </header>

    <div class="grid gap-4 md:grid-cols-3">
      <div
        v-for="(kpi, index) in props.kpis"
        :key="kpi.label"
        class="animate-soft-rise rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur"
        :style="{ animationDelay: `${index * 90}ms` }"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
          {{ kpi.label }}
        </p>
        <div class="mt-3 flex items-baseline justify-between">
          <span class="text-2xl font-semibold text-slate-900">{{ kpi.value }}</span>
          <span
            class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            :class="trendClass(kpi.trend)"
          >
            {{ kpi.delta }}
          </span>
        </div>
        <p class="mt-2 text-xs text-slate-500">{{ kpi.note }}</p>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div class="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-semibold text-slate-900">Recent signals</h2>
          <button type="button" class="text-xs text-slate-500 hover:text-slate-700">
            View all
          </button>
        </div>
        <div class="mt-4 space-y-3">
          <div
            v-for="(row, index) in props.rows"
            :key="row.name"
            class="animate-soft-rise flex items-start justify-between gap-4 rounded-xl border border-slate-200/60 bg-slate-50/80 p-3"
            :style="{ animationDelay: `${(index + 3) * 70}ms` }"
          >
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ row.name }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ row.detail }}</p>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="statusClass(row.status)"
              >
                {{ row.status }}
              </span>
              <p class="mt-2 text-xs text-slate-500">{{ row.metric }}</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-4">
        <div class="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur">
          <h3 class="text-sm font-semibold text-slate-900">Focus now</h3>
          <div class="mt-3 space-y-3">
            <div
              v-for="(task, index) in props.tasks"
              :key="task.label"
              class="animate-soft-rise rounded-xl border border-slate-200/70 bg-white/70 p-3"
              :style="{ animationDelay: `${(index + 6) * 70}ms` }"
            >
              <p class="text-sm font-semibold text-slate-900">{{ task.label }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ task.meta }}</p>
            </div>
          </div>
        </div>


      </aside>
    </div>
  </section>
</template>
