<template>
  <v-card
    max-width="196"
  >
    <v-img
      src="https://klike.net/uploads/posts/2019-07/1562054103_1.jpg"
    ></v-img>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-divider class="mx-2"></v-divider>
    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-2 white--text"
        column
      >
        <v-chip>200мл</v-chip>

        <v-chip>250мл</v-chip>

        <v-chip>300мл</v-chip>

        <v-chip>350мл</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <tg-button
        color="deep-purple lighten-2"
        text
        @click="addInBasket(product)"
      >
        Добавить в корзину
      </tg-button>
    </v-card-actions>
    <!--<v-card-title>{{ product.title }}</v-card-title>
    <div class="description">{{ product.description }}</div>
    <div class="price">
      <span>
        Стоимость: <b>{{ product.price }}</b>
      </span>
    </div>
    <tg-button
      class="add-btn"
      @click="addInBasket(product)"
    >
      Добавить в корзину
    </tg-button>-->
  </v-card>
</template>

<script>
import { defineComponent } from 'vue'
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
    const addInBasket = (product) => {
      emit('addInBasket', product)
    }
    return {
      addInBasket
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
