<template>
  <v-card
    max-width="160"
  >
    <v-img
      src="https://avatars.mds.yandex.net/i?id=5da1a3a0b188275b2cf37ea9eff47f5da3820019-8371311-images-thumbs&n=13"
    ></v-img>
    <v-card-title class="py-0">{{ product.name }}</v-card-title>
    <v-divider class="my-0"></v-divider>
    <v-card-text
      class="pt-1 pl-1 pr-1 pb-1"
    >
      <v-chip-group
        v-model="selectedVolume"
        center-active
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip
          class="mr-4"
        >200мл</v-chip>

        <v-chip
          class="mr-0">250мл</v-chip>

        <v-chip
          class="mr-4"
        >300мл</v-chip>

        <v-chip
          class="mr-0">350мл</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text class="d-flex justify-space-between pt-1">
      <p class="d-flex justify-center align-center w-50">
        Цена: {{ price }} ₽.
      </p>
      <v-card-actions class="pl-0 pr-0 pb-0 pt-0">
        <tg-button
          @click="addInBasket(product)"
        >
          +
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
  emits: ['addInBasket'],
  setup(props, { emit }){
    const { product } = toRefs(props)
    const addInBasket = () => {
      let selected = {
        id: product.value.id,
        name: product.value.name,
        volume: product.value.variants[selectedVolume.value].volume,
        price: price.value
      }
      emit('addInBasket', selected)
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
