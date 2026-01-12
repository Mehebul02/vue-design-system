export type KpiItem = {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
  note: string;
};

export type TableRow = {
  name: string;
  detail: string;
  status: string;
  metric: string;
};

export type TaskItem = {
  label: string;
  meta: string;
};

export type SectionData = {
  title: string;
  subtitle: string;
  badge: string;
  kpis: KpiItem[];
  rows: TableRow[];
  tasks: TaskItem[];
  primaryAction?: string;
  secondaryAction?: string;
};

const dashboardKpis: KpiItem[] = [
  { label: 'Net revenue', value: '$284k', delta: '+12.4%', trend: 'up', note: 'vs last 30 days' },
  { label: 'Orders today', value: '1,248', delta: '+5.1%', trend: 'up', note: 'conversion steady' },
  { label: 'New customers', value: '402', delta: '-2.3%', trend: 'down', note: 'acquisition cooling' },
];

const dashboardRows: TableRow[] = [
  { name: 'Northwind Enterprise', detail: 'Annual renewal completed', status: 'Active', metric: '$48k' },
  { name: 'Studio Forma', detail: 'Q3 uplift campaign', status: 'In review', metric: '$12k' },
  { name: 'Nimbus Collective', detail: 'Churn risk flagged', status: 'At risk', metric: '$6.1k' },
  { name: 'Velvet & Co.', detail: 'New onboarding cohort', status: 'Live', metric: '$9.4k' },
];

const dashboardTasks: TaskItem[] = [
  { label: 'Sync finance forecast for Q3', meta: 'Due in 2 days' },
  { label: 'Approve retention offer batch', meta: '8 requests' },
  { label: 'Review supply alerts from ops', meta: '3 alerts' },
];

const productKpis: KpiItem[] = [
  { label: 'Active SKUs', value: '2,184', delta: '+3.2%', trend: 'up', note: 'catalog expansion' },
  { label: 'Out of stock', value: '38', delta: '-11%', trend: 'down', note: 'replenishment landed' },
  { label: 'Sell-through', value: '62%', delta: '+4.8%', trend: 'up', note: 'last 14 days' },
];

const productRows: TableRow[] = [
  { name: 'Atlas Backpack', detail: 'Seasonal drop', status: 'Live', metric: '418 sold' },
  { name: 'Slate Hoodie', detail: 'Restock queued', status: 'Low stock', metric: '76 sold' },
  { name: 'Studio Travel Kit', detail: 'Bundle refresh', status: 'Draft', metric: '29 sold' },
  { name: 'Peak Water Bottle', detail: 'New colors added', status: 'Active', metric: '310 sold' },
];

const productTasks: TaskItem[] = [
  { label: 'Audit low stock SKUs', meta: '12 items flagged' },
  { label: 'Approve new product imagery', meta: '4 uploads' },
  { label: 'Schedule catalog export', meta: 'Runs nightly' },
];

const taxonomyRows: TableRow[] = [
  { name: 'Travel + Carry', detail: 'Bags and organizers', status: 'Active', metric: '84 SKUs' },
  { name: 'Studio Essentials', detail: 'Desk accessories', status: 'Active', metric: '46 SKUs' },
  { name: 'Seasonal Capsules', detail: 'Limited collections', status: 'Draft', metric: '12 SKUs' },
  { name: 'Sustainable Picks', detail: 'Eco materials', status: 'In review', metric: '18 SKUs' },
];

const orderKpis: KpiItem[] = [
  { label: 'Open orders', value: '934', delta: '+1.8%', trend: 'up', note: 'last 24 hours' },
  { label: 'Avg. fulfillment', value: '1.8 days', delta: '-0.4 days', trend: 'up', note: 'faster than target' },
  { label: 'Return rate', value: '3.1%', delta: '+0.2%', trend: 'flat', note: 'stable week' },
];

const orderRows: TableRow[] = [
  { name: 'Order #84512', detail: 'Priority shipping', status: 'Packed', metric: '$842' },
  { name: 'Order #84503', detail: 'International', status: 'Delayed', metric: '$214' },
  { name: 'Order #84496', detail: 'Wholesale', status: 'In transit', metric: '$5,140' },
  { name: 'Order #84487', detail: 'Expedited', status: 'Delivered', metric: '$112' },
];

const orderTasks: TaskItem[] = [
  { label: 'Resolve delayed shipments', meta: '6 orders' },
  { label: 'Approve refund queue', meta: '3 pending' },
  { label: 'Verify fraud checks', meta: '2 flagged' },
];

const customerKpis: KpiItem[] = [
  { label: 'Active customers', value: '18.2k', delta: '+2.9%', trend: 'up', note: 'rolling 30 days' },
  { label: 'Repeat rate', value: '41%', delta: '+1.6%', trend: 'up', note: 'improving loyalty' },
  { label: 'Avg. lifetime', value: '$312', delta: '+0.7%', trend: 'flat', note: 'steady' },
];

const customerRows: TableRow[] = [
  { name: 'Avery Cole', detail: 'Gold tier', status: 'Active', metric: '$4,210' },
  { name: 'Kenji Patel', detail: 'At-risk cohort', status: 'Churn risk', metric: '$480' },
  { name: 'Mina Ortiz', detail: 'New subscriber', status: 'Onboarding', metric: '$96' },
  { name: 'Rowan Blake', detail: 'VIP referral', status: 'Active', metric: '$2,140' },
];

const customerTasks: TaskItem[] = [
  { label: 'Send loyalty upgrade offers', meta: '42 customers' },
  { label: 'Review churn risk list', meta: '12 profiles' },
  { label: 'Triage support backlog', meta: '9 tickets' },
];

const reviewKpis: KpiItem[] = [
  { label: 'New reviews', value: '382', delta: '+7.4%', trend: 'up', note: 'last 7 days' },
  { label: 'Avg. rating', value: '4.6', delta: '+0.1', trend: 'up', note: 'steady sentiment' },
  { label: 'Flagged', value: '14', delta: '-3', trend: 'down', note: 'policy clean-up' },
];

const reviewRows: TableRow[] = [
  { name: 'Atlas Backpack', detail: 'Delivery praise', status: 'Approved', metric: '5.0' },
  { name: 'Slate Hoodie', detail: 'Size feedback', status: 'Needs reply', metric: '3.5' },
  { name: 'Studio Travel Kit', detail: 'Quality note', status: 'Flagged', metric: '2.0' },
  { name: 'Peak Water Bottle', detail: 'Color request', status: 'Approved', metric: '4.0' },
];

const reviewTasks: TaskItem[] = [
  { label: 'Respond to low ratings', meta: '5 reviews' },
  { label: 'Approve template update', meta: 'Draft ready' },
  { label: 'Escalate flagged review', meta: '1 urgent' },
];

export const sectionData = {
  dashboardOverview: {
    title: 'Overview',
    subtitle: 'Live snapshot of revenue, order flow, and customer momentum.',
    badge: 'Dashboard',
    kpis: dashboardKpis,
    rows: dashboardRows,
    tasks: dashboardTasks,
    primaryAction: 'Share snapshot',
    secondaryAction: 'Download',
  },
  dashboardReports: {
    title: 'Reports',
    subtitle: 'Scheduled insights with trend summaries and export-ready charts.',
    badge: 'Dashboard',
    kpis: dashboardKpis,
    rows: dashboardRows,
    tasks: dashboardTasks,
    primaryAction: 'Create report',
    secondaryAction: 'Schedule',
  },
  dashboardActivity: {
    title: 'Activity',
    subtitle: 'Team actions, system alerts, and automation history in one feed.',
    badge: 'Dashboard',
    kpis: dashboardKpis,
    rows: dashboardRows,
    tasks: dashboardTasks,
    primaryAction: 'Log update',
    secondaryAction: 'Filter',
  },
  productsList: {
    title: 'Products',
    subtitle: 'Manage SKUs, pricing, and merchandising highlights.',
    badge: 'Products',
    kpis: productKpis,
    rows: productRows,
    tasks: productTasks,
    primaryAction: 'Add product',
    secondaryAction: 'Export',
  },
  productsCategories: {
    title: 'Categories',
    subtitle: 'Organize the catalog into browsable collections.',
    badge: 'Products',
    kpis: productKpis,
    rows: taxonomyRows,
    tasks: productTasks,
    primaryAction: 'Add category',
    secondaryAction: 'Reorder',
  },
  productsTags: {
    title: 'Tags',
    subtitle: 'Label products to power smart filters and search.',
    badge: 'Products',
    kpis: productKpis,
    rows: taxonomyRows,
    tasks: productTasks,
    primaryAction: 'Create tag',
    secondaryAction: 'Bulk edit',
  },
  productsAttributes: {
    title: 'Attributes',
    subtitle: 'Define specs, sizes, and variant qualifiers.',
    badge: 'Products',
    kpis: productKpis,
    rows: taxonomyRows,
    tasks: productTasks,
    primaryAction: 'New attribute',
    secondaryAction: 'Audit',
  },
  productsOptions: {
    title: 'Options',
    subtitle: 'Configure option sets for bundling and upsell paths.',
    badge: 'Products',
    kpis: productKpis,
    rows: taxonomyRows,
    tasks: productTasks,
    primaryAction: 'Create option',
    secondaryAction: 'Review',
  },
  productsVariations: {
    title: 'Variations',
    subtitle: 'Track variant performance and inventory alignment.',
    badge: 'Products',
    kpis: productKpis,
    rows: productRows,
    tasks: productTasks,
    primaryAction: 'Sync variants',
    secondaryAction: 'Export',
  },
  ordersList: {
    title: 'Orders',
    subtitle: 'Monitor order flow from checkout to delivery.',
    badge: 'Orders',
    kpis: orderKpis,
    rows: orderRows,
    tasks: orderTasks,
    primaryAction: 'Create order',
    secondaryAction: 'Export',
  },
  ordersShipments: {
    title: 'Shipments',
    subtitle: 'Track carriers, ETA health, and delivery exceptions.',
    badge: 'Orders',
    kpis: orderKpis,
    rows: orderRows,
    tasks: orderTasks,
    primaryAction: 'Book pickup',
    secondaryAction: 'Sync carrier',
  },
  ordersReturns: {
    title: 'Returns',
    subtitle: 'Approve returns and manage inventory recovery.',
    badge: 'Orders',
    kpis: orderKpis,
    rows: orderRows,
    tasks: orderTasks,
    primaryAction: 'Approve return',
    secondaryAction: 'Generate label',
  },
  ordersInvoices: {
    title: 'Invoices',
    subtitle: 'Manage billing status, payment schedules, and disputes.',
    badge: 'Orders',
    kpis: orderKpis,
    rows: orderRows,
    tasks: orderTasks,
    primaryAction: 'Send invoice',
    secondaryAction: 'Reconcile',
  },
  customersList: {
    title: 'Customers',
    subtitle: 'Understand customer health and segment momentum.',
    badge: 'Customers',
    kpis: customerKpis,
    rows: customerRows,
    tasks: customerTasks,
    primaryAction: 'Add customer',
    secondaryAction: 'Export',
  },
  customersSegments: {
    title: 'Segments',
    subtitle: 'Build targeted cohorts for lifecycle campaigns.',
    badge: 'Customers',
    kpis: customerKpis,
    rows: customerRows,
    tasks: customerTasks,
    primaryAction: 'New segment',
    secondaryAction: 'Sync',
  },
  customersLoyalty: {
    title: 'Loyalty',
    subtitle: 'Track point balances and reward activity.',
    badge: 'Customers',
    kpis: customerKpis,
    rows: customerRows,
    tasks: customerTasks,
    primaryAction: 'Issue reward',
    secondaryAction: 'Configure tiers',
  },
  customersSupport: {
    title: 'Support',
    subtitle: 'Monitor support queues and response SLAs.',
    badge: 'Customers',
    kpis: customerKpis,
    rows: customerRows,
    tasks: customerTasks,
    primaryAction: 'Assign ticket',
    secondaryAction: 'View backlog',
  },
  reviewsList: {
    title: 'Reviews',
    subtitle: 'Moderate review flow and highlight testimonials.',
    badge: 'Reviews',
    kpis: reviewKpis,
    rows: reviewRows,
    tasks: reviewTasks,
    primaryAction: 'Moderate',
    secondaryAction: 'Export',
  },
  reviewsModeration: {
    title: 'Moderation',
    subtitle: 'Approve, flag, or respond to incoming reviews.',
    badge: 'Reviews',
    kpis: reviewKpis,
    rows: reviewRows,
    tasks: reviewTasks,
    primaryAction: 'Open queue',
    secondaryAction: 'Update rules',
  },
  reviewsTemplates: {
    title: 'Templates',
    subtitle: 'Manage response templates for fast engagement.',
    badge: 'Reviews',
    kpis: reviewKpis,
    rows: reviewRows,
    tasks: reviewTasks,
    primaryAction: 'New template',
    secondaryAction: 'Version history',
  },
} satisfies Record<string, SectionData>;

export type SectionKey = keyof typeof sectionData;
