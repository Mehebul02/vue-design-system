<template>
  <div class="h-screen flex flex-col bg-slate-100">
    <TopHeader />

    <div class="flex flex-1 pt-14 overflow-hidden">
      <PrimarySidebar
        class="h-[calc(100vh-3.5rem)]"
        :activeMenu="activeMenu"
        @change="setActiveMenu"
      />

      <div
        v-show="isSecondaryOpen"
        class="fixed inset-0 top-14 bg-black/30 md:hidden z-30"
        @click="closeSecondary"
      ></div>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-x-4 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-4 opacity-0"
      >
        <SecondarySidebar
          v-show="isSecondaryOpen"
          class="fixed md:static inset-y-14 left-16 md:inset-auto z-40 md:z-auto h-[calc(100vh-3.5rem)]"
          :activeKey="activeSubMenu"
          :sections="sidebarSections"
          :title="activeMenuLabel"
          @update:activeKey="setActiveSubMenu"
        />
      </Transition>

      <main class="flex-1 min-w-0 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PrimarySidebar from "./PrimarySidebar.vue";
import SecondarySidebar from "./SecondarySidebar.vue";
import TopHeader from "./TopHeader.vue";
import { sidebarSections } from "./sidebarMenu";


const router = useRouter()
const route = useRoute()
const activeMenu = ref('products')
const activeSubMenu = ref('/products')
const isSecondaryOpen = ref(true)

const setActiveMenu = (menu) => {
  if (activeMenu.value === menu) {
    isSecondaryOpen.value = !isSecondaryOpen.value
    return
  }
  activeMenu.value = menu
  isSecondaryOpen.value = true
  if (menu === 'products') {
    activeSubMenu.value = '/products'
    router.push('/products')
  } else if (menu === 'components') {
    activeSubMenu.value = '/components'
    router.push('/components')
  }
}

const setActiveSubMenu = (submenu) => {
  activeSubMenu.value = submenu
  if (typeof submenu === 'string' && submenu.startsWith('/')) {
    router.push(submenu)
  }
}

const closeSecondary = () => {
  isSecondaryOpen.value = false
}

const activeMenuLabel = computed(() => {
  switch (activeMenu.value) {
    case 'dashboard':
      return 'Dashboard'
    case 'orders':
      return 'Orders'
    case 'components':
      return 'Components'
    case 'products':
    default:
      return 'Products'
  }
})

const syncMenuFromRoute = (path) => {
  if (path.startsWith('/components')) {
    activeMenu.value = 'components'
    activeSubMenu.value = '/components'
    return
  }
  if (path.startsWith('/products')) {
    activeMenu.value = 'products'
    activeSubMenu.value = '/products'
    return
  }
  if (path.startsWith('/orders')) {
    activeMenu.value = 'orders'
    activeSubMenu.value = 'orders'
    return
  }
  activeMenu.value = 'dashboard'
}

watch(
  () => route.path,
  (path) => {
    syncMenuFromRoute(path)
  },
  { immediate: true }
)
</script>
