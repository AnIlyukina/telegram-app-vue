<template>
  <div
    v-for="(product, index) in order"
    :key="product.id"
    class="text-start mb-3 d-flex justify-space-between"
  >
    <div>
      {{ product.name }} <sup>{{ product.volume }}мл.</sup>
      <v-btn
        size="x-small"
        icon="mdi-minus"
        color="primary"
        class="ml-2"
        @click="decrementCount(product, index)"
      />
      {{ product.count }}
      <v-btn
        size="x-small"
        icon="mdi-plus"
        color="primary"
        class="mr-2"
        @click="incrementCount(product)"
      />
      - {{ product.count * product.price }}<small>₽</small>
    </div>
  </div>
  <v-divider></v-divider>
  <p class="mt-1 text-end">Итого: {{ totalPrice }} ₽.</p>
</template>

<script>

import { defineComponent } from "vue";

export default defineComponent({
  name: 'OrderS',
  props: {
    order: {
      type: Array,
      default: () => []
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  emits: ['changeOrder'],
  setup (props, { emit }) {

    const decrementCount = (product, index) => {
      emit('changeOrder', product, 'decrement')
    }

    const incrementCount = (product) => {
      emit('changeOrder', product, 'increment')
    }

    return {
      decrementCount,
      incrementCount
    }
  }
})
</script>

<style scoped>

</style>
