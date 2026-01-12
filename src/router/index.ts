import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import DesignSystem from '../components/design-system/DesignSystem.vue';
import { menus } from '../features/dashboard/data/menus';

const menuRoutes: RouteRecordRaw[] = menus.flatMap((menu) =>
  menu.children.map((child) => ({
    path: child.path,
    name: `${menu.id}-${child.id}`,
    component: child.component,
    meta: {
      menuId: menu.id,
      subMenuId: child.id,
      title: child.label,
    },
  }))
);

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: menus[0]?.children[0]?.path ?? '/dashboard/overview' },
  ...menuRoutes,
  { path: '/ui-design', component: DesignSystem },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const Router = createRouter({
  history: createWebHistory(),
  routes,
});
