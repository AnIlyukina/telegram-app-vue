<template>
  <v-card>
    <v-img
      height="100"
      cover
      src="https://www.smilegifts.ru/image/cache/catalog/img/Sim-0519/termostakan-kofe/02-800x800.jpg"
    ></v-img>
    <v-card-title class="py-0">{{ product.name }}</v-card-title>
    <v-divider class="my-0"></v-divider>
    <v-card-text
      class="pt-1 pl-1 pr-1 pb-1"
    >
      <v-chip-group
        v-model="selectedVolume"
        center-active
        column
        class="justify-center"
      >
        <v-chip
          v-for="(variant, index) in product.variants"
          :key="index"
          :class="index % 2 !== 0 ? 'mr-0' : 'mr-3 ml-1' "
          :color="'var(--tg-theme-button-color)'"
          variant="elevated"
        >
          {{ variant.volume }}мл
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text class="d-flex justify-space-between pt-1">
      <p class="d-flex justify-center align-center w-50">
        Цена: {{ price }}&nbsp;₽.
      </p>
      <v-card-actions class="pl-0 pr-0 pb-0 pt-0">
        <tg-button
          @click="addInBasket(product)"
        >
          <v-icon icon="mdi-plus"></v-icon>
        </tg-button>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed, defineComponent, ref, toRefs } from 'vue'
import TgButton from '@/components/TgButton.vue'

export default defineComponent ({
  components: { TgButton },
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  emits: ['addInOrder'],
  setup(props, { emit }){
    const { product } = toRefs(props)
    const addInBasket = () => {
      let selected = {
        id: product.value.id,
        name: product.value.name,
        volume: product.value.variants[selectedVolume.value].volume,
        price: price.value
      }
      emit('addInOrder', selected)
    }

    const selectedVolume = ref(0)

    const price = computed(() => {
      return product.value.variants[selectedVolume.value].price
    })

    return {
      addInBasket,
      price,
      selectedVolume
    }
  }

})
</script>

<style>
.product{
  display: flex;
  flex-direction: column;
  /*border: 1px solid var(--tg-theme-button-color);*/
  border: 1px solid palevioletred;
  padding: 15px;
  width: 170px;
}

.description {
  font-size: .8em;
}
.add-btn {
  width: 100%;
  background-color: #ffb8ce;
}

</style>
