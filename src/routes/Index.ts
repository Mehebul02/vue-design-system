
import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import DesignSystem from "../components/design-system/DesignSystem.vue";


const routes: RouteRecordRaw[] = [
    { path:'/ui-design', component:DesignSystem}
]

export const Router = createRouter({
    history: createWebHistory(),
    routes,
})
