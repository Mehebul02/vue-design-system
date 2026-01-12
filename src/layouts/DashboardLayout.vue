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
  <div class="relative min-h-screen  text-slate-900">
    <header
      class="sticky top-0 z-30 flex h-16 items-center border-b "
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

    <div class="relative min-h-[calc(100vh-4rem)] pl-16 lg:pl-80">
      <main class="px-6 py-8">
        <slot />
      </main>
    </div>
  </div>
</template>
