import type { Component } from 'vue';
import DashboardOverview from "../views/DashboardOverview.vue";
import DashboardReports from "../views/DashboardReports.vue";
import DashboardActivity from "../views/DashboardActivity.vue";
import ProductsList from "../views/ProductsList.vue";
import ProductsCategories from "../views/ProductsCategories.vue";
import ProductsTags from "../views/ProductsTags.vue";
import ProductsAttributes from "../views/ProductsAttributes.vue";
import ProductsOptions from "../views/ProductsOptions.vue";
import ProductsVariations from "../views/ProductsVariations.vue";
import OrdersList from "../views/OrdersList.vue";
import OrdersShipments from "../views/OrdersShipments.vue";
import OrdersReturns from "../views/OrdersReturns.vue";
import OrdersInvoices from "../views/OrdersInvoices.vue";
import CustomersList from "../views/CustomersList.vue";
import CustomersSegments from "../views/CustomersSegments.vue";
import CustomersLoyalty from "../views/CustomersLoyalty.vue";
import CustomersSupport from "../views/CustomersSupport.vue";
import ReviewsList from "../views/ReviewsList.vue";
import ReviewsModeration from "../views/ReviewsModeration.vue";
import ReviewsTemplates from "../views/ReviewsTemplates.vue";

export type SubMenuItem = {
  id: string;
  label: string;
  path: string;
  component: Component;
};

export type MenuItem = {
  id: string;
  label: string;
  icon: string[];
  children: SubMenuItem[];
};

const icons = {
  dashboard: [
    'M3 3h7v7H3z',
    'M14 3h7v7h-7z',
    'M14 14h7v7h-7z',
    'M3 14h7v7H3z',
  ],
  products: ['M4 7l8-4 8 4v10l-8 4-8-4Z', 'M4 7l8 4 8-4'],
  orders: ['M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M9 7h6', 'M9 11h6', 'M9 15h4'],
  customers: ['M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z', 'M4 20a8 8 0 0 1 16 0'],
  reviews: ['M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z'],
};

export const menus: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: icons.dashboard,
    children: [
      { id: 'overview', label: 'Overview', path: '/dashboard/overview', component: DashboardOverview },
      { id: 'reports', label: 'Reports', path: '/dashboard/reports', component: DashboardReports },
      { id: 'activity', label: 'Activity', path: '/dashboard/activity', component: DashboardActivity },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    icon: icons.products,
    children: [
      { id: 'list', label: 'Products', path: '/products/list', component: ProductsList },
      { id: 'categories', label: 'Categories', path: '/products/categories', component: ProductsCategories },
      { id: 'tags', label: 'Tags', path: '/products/tags', component: ProductsTags },
      { id: 'attributes', label: 'Attributes', path: '/products/attributes', component: ProductsAttributes },
      { id: 'options', label: 'Options', path: '/products/options', component: ProductsOptions },
      { id: 'variations', label: 'Variations', path: '/products/variations', component: ProductsVariations },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: icons.orders,
    children: [
      { id: 'list', label: 'Orders', path: '/orders/list', component: OrdersList },
      { id: 'shipments', label: 'Shipments', path: '/orders/shipments', component: OrdersShipments },
      { id: 'returns', label: 'Returns', path: '/orders/returns', component: OrdersReturns },
      { id: 'invoices', label: 'Invoices', path: '/orders/invoices', component: OrdersInvoices },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: icons.customers,
    children: [
      { id: 'list', label: 'Customers', path: '/customers/list', component: CustomersList },
      { id: 'segments', label: 'Segments', path: '/customers/segments', component: CustomersSegments },
      { id: 'loyalty', label: 'Loyalty', path: '/customers/loyalty', component: CustomersLoyalty },
      { id: 'support', label: 'Support', path: '/customers/support', component: CustomersSupport },
    ],
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: icons.reviews,
    children: [
      { id: 'list', label: 'Reviews', path: '/reviews/list', component: ReviewsList },
      { id: 'moderation', label: 'Moderation', path: '/reviews/moderation', component: ReviewsModeration },
      { id: 'templates', label: 'Templates', path: '/reviews/templates', component: ReviewsTemplates },
    ],
  },
];
