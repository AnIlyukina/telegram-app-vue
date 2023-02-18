<template>
  <v-container class="pt-15">
    <slot/>
    <ul class="list mt-4">
      <li
        v-for="product in products"
        :key="product.id"
        class="mr-2 mb-2"
      >
        <product-item
          :product="product"
          @add-in-order="addInOrder"
        />
      </li>
    </ul>
  </v-container>
</template>

<script>
import {defineComponent} from 'vue'
import ProductItem from './ProductItem.vue'

export default defineComponent({
  components: {
    ProductItem
  },
  name: 'ProductList',
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  emits: ['addInOrder'],
  setup(props, { emit }) {

    const addInOrder = (product) => {
      emit('addInOrder', product)
    }

    return {
      addInOrder,
    }

  }
})
</script>

<style>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
}
.item {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
