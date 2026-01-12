<script setup lang="ts">
const tabs = ['All', 'Active', 'Draft']
const rows = [
  {
    sku: 'FC-0921',
    name: 'Aurora Lamp',
    category: 'Lighting',
    stock: '24 in stock',
    price: '$128.00',
    status: 'Active'
  },
  {
    sku: 'FC-1024',
    name: 'Nomad Backpack',
    category: 'Accessories',
    stock: '08 in stock',
    price: '$74.00',
    status: 'Draft'
  },
  {
    sku: 'FC-1170',
    name: 'Modern Desk',
    category: 'Furniture',
    stock: '12 in stock',
    price: '$540.00',
    status: 'Active'
  },
  {
    sku: 'FC-1202',
    name: 'Studio Headphones',
    category: 'Audio',
    stock: '40 in stock',
    price: '$210.00',
    status: 'Active'
  },
  {
    sku: 'FC-1301',
    name: 'Clay Planter',
    category: 'Decor',
    stock: '06 in stock',
    price: '$32.00',
    status: 'Draft'
  }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-sm text-slate-500">Catalog</p>
        <h1 class="text-2xl font-semibold text-slate-900">Products</h1>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button class="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition">
          Export
        </button>
        <button class="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition">
          Import
        </button>
        <button class="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">
          Create Product
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200">
        <div class="flex items-center gap-2">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="px-3 py-1.5 text-sm rounded-full border border-transparent hover:border-slate-200 hover:bg-slate-50 transition"
            :class="tab === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600'"
          >
            {{ tab }}
          </button>
        </div>
        <div class="text-sm text-slate-500">Showing 1-5 of 24</div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="text-left text-slate-500">
            <tr>
              <th class="px-4 py-3 font-medium">SKU</th>
              <th class="px-4 py-3 font-medium">Product</th>
              <th class="px-4 py-3 font-medium">Category</th>
              <th class="px-4 py-3 font-medium">Stock</th>
              <th class="px-4 py-3 font-medium">Price</th>
              <th class="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="row in rows"
              :key="row.sku"
              class="text-slate-700 hover:bg-slate-50 transition"
            >
              <td class="px-4 py-3 font-medium text-slate-900">{{ row.sku }}</td>
              <td class="px-4 py-3">{{ row.name }}</td>
              <td class="px-4 py-3">{{ row.category }}</td>
              <td class="px-4 py-3">{{ row.stock }}</td>
              <td class="px-4 py-3">{{ row.price }}</td>
              <td class="px-4 py-3">
                <span
                  class="px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="row.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'"
                >
                  {{ row.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
