<template>
  <v-card
    max-width="160"
  >
    <v-img
      src="https://avatars.mds.yandex.net/i?id=5da1a3a0b188275b2cf37ea9eff47f5da3820019-8371311-images-thumbs&n=13"
    ></v-img>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-divider class="mx-2"></v-divider>
    <v-card-text
      class="pt-1 pl-1 pr-1 pb-1"
    >
      <!--<v-select
        :items="syrups"
        item-title="name"
        item-value="id"
        label="Молоко"
        solo
        dense
      ></v-select>
      <v-select
        :items="syrups"
        item-title="name"
        item-value="id"
        label="Сироп"
        solo
        dense
      ></v-select>-->
      <v-chip-group
        center-active
        mandatory
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
      Добавить сироп
      <small class="text-secondary">(+30р)</small>
    </v-card-text>

    <v-card-text class="d-flex justify-space-between">
      <p class="text-center w-50">
        Цена: 1000 p
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
import { defineComponent, ref } from 'vue'
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
    const syrups = ref([
      { id: '1', name: 'ваниль'},
      { id: '2', name: 'карамель'},
      { id: '3', name: 'кокос'},
      { id: '4', name: 'без сиропа'}
    ])
    return {
      addInBasket,
      syrups
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
