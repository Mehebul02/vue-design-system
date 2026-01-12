import IconGrid from "../../assets/icons/IconGrid.vue";
import IconBox from "../../assets/icons/IconBox.vue";
import IconTags from "../../assets/icons/IconTags.vue";
import IconClipboard from "../../assets/icons/IconClipboard.vue";

export const sidebarSections = [
    {
        label: 'Dashboard',
        items: [
            { key: 'overview', label: 'Overview', icon: IconGrid },
            { key: 'analytics', label: 'Analytics', icon: IconGrid },
            { key: 'sales', label: 'Sales Report', icon: IconGrid }
        ]
    },
    {
        label: 'Products',
        items: [
            { key: '/products', label: 'Products', icon: IconBox },
            { key: 'categories', label: 'Categories', icon: IconBox },
            { key: 'tags', label: 'Tags', icon: IconTags },
            {
                key: 'attributes',
                label: 'Attributes',
                icon: IconBox,
                expandable: true
            },
            { key: 'options', label: 'Options', icon: IconBox },
            { key: 'variations', label: 'Variations', icon: IconBox }
        ]
    },
    {
        label: 'Orders',
        items: [
            { key: 'orders', label: 'Orders', icon: IconClipboard },
            { key: 'transactions', label: 'Transactions', icon: IconClipboard }
        ]
    },
    {
        label: 'Other',
        items: [
            { key: 'brands', label: 'Brands', icon: IconTags },
            { key: 'reviews', label: 'Reviews', icon: IconTags }
        ]
    }
]
