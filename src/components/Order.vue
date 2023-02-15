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
        @click="decrementCount(index)"
      />
      {{ product.count }}
      <v-btn
        size="x-small"
        icon="mdi-plus"
        color="primary"
        class="mr-2"
        @click="incrementCount(index)"
      />
      - {{ product.count * product.price }}<small>₽</small>
    </div>
    <v-btn
      size="x-small"
      color="primary"
      icon="mdi-delete"
      @click="deleteProduct(index)"
    />
  </div>
  <v-divider></v-divider>
  <p class="mt-1">Итого: {{ totalPrice }} ₽.</p>
</template>

<script>

import { defineComponent, toRefs } from "vue";

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
    const { order } = toRefs(props)

    const decrementCount = (index) => {
      if (order.value[index].count < 2) {
        return
      }
      emit('changeOrder', index, 'decrement')

    }

    const incrementCount = (index) => {
      emit('changeOrder', index, 'increment')
    }

    const deleteProduct = (index) => {
      emit('changeOrder', index, 'delete')
    }

    return {
      decrementCount, incrementCount, deleteProduct
    }
  }
})
</script>

<style scoped>

</style>
