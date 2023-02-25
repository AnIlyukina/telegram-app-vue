<template>
  <v-table>
    <tbody>
      <tr
        v-for="product in order"
        :key="product.id"
      >
        <td class="px-0 w-50">
          {{ product.name }} <sup>{{ product.volume }}мл.</sup> 
          <!--<small>({{ product.groupName }})</small>-->
        </td>
        <td class="px-0 text-end">
           <v-btn
            size="x-small"
            icon="mdi-minus"
            class="ml-2 order-button"
            @click="decrementCount(product, index)"
          />
            {{ product.count }}
            <v-btn
              size="x-small"
              icon="mdi-plus" 
              class="mr-2 order-button"
              @click="incrementCount(product)"
            />
        </td>
        <td class="px-0 text-end">
          {{ product.count * product.price }}<small>₽</small>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-divider></v-divider>
  <p class="mt-1 text-end">{{ totalPrice }} ₽.</p>
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

<style lang="scss">
.order-button{
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
}
</style>
