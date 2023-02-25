<template>
  <v-card>
    <v-img
      height="100"
      cover
      :src="product.image"
    ></v-img>
    <v-card-text class="py-0 text-center">{{ product.name }}</v-card-text>
    <v-divider class="my-0"></v-divider>
    <v-card-text
      class="pt-1 pl-1 pr-1 pb-1"
    >
      <v-chip-group
        v-model="selectedVolume"
        center-active
        column
        class="justify-center py-0"
      >
        <v-chip
          v-for="(variant, index) in product.variants"
          :key="index"
          :class="index % 2 !== 0 ? 'mr-0' : 'mr-3 ml-1' "
          :color="'var(--tg-theme-button-color)'"
        >
          {{ variant.volume }}мл
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-divider class="my-0"></v-divider>
    <v-card-text class="d-flex justify-space-between py-0">
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
    let syrup = ref('')
    const addInBasket = () => {
      let selected = {
        id: product.value.id,
        name: product.value.name,
        groupName: product.value.groupName,
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
      selectedVolume,
      syrup
    }
  }

})
</script>
