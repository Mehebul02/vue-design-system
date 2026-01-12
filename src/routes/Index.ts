
import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import ComponentsIndex from "../views/components/Index.vue";
import CreateProduct from "../views/products/fregment/CreateProduct.vue";


const routes: RouteRecordRaw[] = [
    { path: "/", redirect: "/products" },
    { path: "/products", component: CreateProduct },
    { path: "/components", component: ComponentsIndex },
]

export const Router = createRouter({
    history: createWebHistory(),
    routes,
})
