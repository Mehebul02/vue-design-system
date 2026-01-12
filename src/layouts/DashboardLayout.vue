<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PrimarySidebar from '../features/dashboard/components/navigation/PrimarySidebar.vue';
import SecondarySidebar from '../features/dashboard/components/navigation/SecondarySidebar.vue';
import TopHeader from '../features/dashboard/components/TopHeader.vue';
import type { MenuItem } from '../features/dashboard/data/menus';

type DashboardLayoutProps = {
  menus: MenuItem[];
};

const props = defineProps<DashboardLayoutProps>();
const slots = useSlots();

const route = useRoute();
const router = useRouter();

const emptyMenu: MenuItem = { id: '', label: '', icon: [], children: [] };
const defaultMenu = props.menus[0] ?? emptyMenu;
const activeMenuId = ref(defaultMenu.id);
const activeSubMenuId = ref(defaultMenu.children[0]?.id ?? '');
const isSidebarOpen = ref(false);
const searchQuery = ref('');

const activeMenu = computed(
  () => props.menus.find((menu) => menu.id === activeMenuId.value) ?? defaultMenu
);
const activeSubMenuLabel = computed(() => {
  const menu = activeMenu.value;
  const child = menu?.children.find((item) => item.id === activeSubMenuId.value);
  return child?.label ?? menu?.children[0]?.label ?? '';
});

const syncFromRoute = () => {
  for (const menu of props.menus) {
    const child = menu.children.find((item) => item.path === route.path);
    if (child) {
      activeMenuId.value = menu.id;
      activeSubMenuId.value = child.id;
      return;
    }
  }
};

watch(() => route.path, syncFromRoute, { immediate: true });

const handlePrimarySelect = (menuId: string) => {
  const menu = props.menus.find((item) => item.id === menuId);
  if (!menu) return;
  activeMenuId.value = menuId;
  const next = menu.children[0];
  if (next) {
    activeSubMenuId.value = next.id;
    router.push(next.path);
  }
  isSidebarOpen.value = true;
};

const handleSubMenuSelect = (subMenuId: string) => {
  const menu = activeMenu.value;
  const child = menu?.children.find((item) => item.id === subMenuId);
  if (!child) return;
  activeSubMenuId.value = subMenuId;
  router.push(child.path);
  isSidebarOpen.value = false;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const openSidebar = () => {
  isSidebarOpen.value = true;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const setSearchQuery = (value: string) => {
  searchQuery.value = value;
};
</script>

<template>
  <div class="relative min-h-screen bg-slate-50 text-slate-900">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"></div>
      <div class="absolute top-32 -left-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl"></div>
      <div class="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"></div>
    </div>

    <PrimarySidebar
      :menus="props.menus"
      :active-menu-id="activeMenuId"
      @select="handlePrimarySelect"
    >
      <template v-if="slots.branding" #branding>
        <slot name="branding" />
      </template>
      <template v-if="slots['sidebar-footer']" #footer>
        <slot name="sidebar-footer" />
      </template>
    </PrimarySidebar>
    <SecondarySidebar
      :menu="activeMenu"
      :active-sub-menu-id="activeSubMenuId"
      :is-open="isSidebarOpen"
      @select="handleSubMenuSelect"
      @close="closeSidebar"
    />

    <div class="relative min-h-screen pl-16 lg:pl-80">
      <header
        class="sticky top-0 z-20 flex h-16 items-center border-b border-slate-200/80 bg-white px-6 shadow-sm"
      >
        <TopHeader v-model="searchQuery" @toggle-sidebar="toggleSidebar">
          <template v-if="slots['header-left']" #left>
            <slot
              name="header-left"
              :active-menu="activeMenu"
              :active-sub-menu-label="activeSubMenuLabel"
              :is-sidebar-open="isSidebarOpen"
              :toggle-sidebar="toggleSidebar"
              :open-sidebar="openSidebar"
              :close-sidebar="closeSidebar"
            />
          </template>
          <template v-if="slots['header-center']" #center>
            <slot
              name="header-center"
              :search-query="searchQuery"
              :set-search-query="setSearchQuery"
            />
          </template>
          <template v-if="slots['header-right']" #right>
            <slot
              name="header-right"
              :active-menu="activeMenu"
              :active-sub-menu-label="activeSubMenuLabel"
            />
          </template>
        </TopHeader>
      </header>

      <main class="px-6 py-8">
        <slot />
      </main>
    </div>
  </div>
</template>
