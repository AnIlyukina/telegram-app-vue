<template>
  <div class="list">
    <div
      v-for="product in products"
      :key="product.id"
      >
      <product-item
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProductItem from './ProductItem.vue'
export default defineComponent({
  components: { ProductItem },
  name: 'ProdictList',
  setup() {
    const products = [
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' },
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' },
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' },
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' },
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' }, 
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' },
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' },
      { id: 1, title: 'Джинсы', price: 5000, description: 'Cинего цвета, прямые' },
    ]
    return {
      products
    }

  }
})
</script>

<style>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.item {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>