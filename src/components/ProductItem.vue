<template>
  <v-card>
    <v-img
      height="100"
      cover
      src="data:image/jpeg;base64,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"
    ></v-img>
    <v-card-title class="py-0 text-center">{{ product.name }}</v-card-title>
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
    <v-card-text class="pt-1 pl-1 pr-1 pb-1">
      <v-carousel
        v-model="syrup"
        :continuous="false"
        :show-arrows="false"
        hide-delimiters
        height="32">
          <v-carousel-item
            v-for="(item,index) in product.relatedProduct[0].products"
            class="text-center d-flex align-center tg-color"
            :key="index"
          >
          <span>
            {{item.name }}
          </span>
          </v-carousel-item>
        </v-carousel>
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
    let syrup = ref('')
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
      selectedVolume,
      syrup
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

.tg-color{
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
}

</style>
