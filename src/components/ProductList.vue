<template>
  <v-container class="pt-16">
    <v-row
      v-if="products.length"
    >
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="6"
        sm="3"
      >
        <product-item
          :product="product"
          @add-in-order="addInOrder"
        />
      </v-col>
    </v-row>
    <div
      v-else
    >
      Приносим свои извинения, меню не сформировано
  </div>
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
