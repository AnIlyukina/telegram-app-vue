<template>
  <tg-button
    @click="openFormDelivery"
  >корзина ({{ orderProduct.length }})
</tg-button>
  <ul class="list">
    <li
      v-for="product in products"
      :key="product.id"
      class="mr-2 mb-2"
      >
      <product-item
        :product="product"
        @add-in-basket="addInBasket"
      />
    </li>
  </ul>
</template>

<script>
import {defineComponent, reactive, computed} from 'vue'
import { useRouter } from 'vue-router'
import ProductItem from './ProductItem.vue'
import TgButton from './TgButton.vue'

export default defineComponent({
  components: { ProductItem, TgButton },
  name: 'ProductList',
  setup() {
    const products = [
      {
        id: 1,
        title: 'Капучино',
        variants: [
          {volume: 200, price: 100},
          {volume: 250, price: 150},
          {volume: 300, price: 200},
          {volume: 350, price: 250},
        ],
        description: 'бла бла бла бла'
      },
      { id: 2,
        title: 'Латте',
        price: 100,
        description: '',
        variants: [
          {volume: 200, price: 100},
          {volume: 250, price: 150},
          {volume: 300, price: 200},
          {volume: 350, price: 250},
        ],
      },
      {
        id: 3,
        title: 'Флэт Уайт',
        price: 200,
        description: '',
        variants: [
          {volume: 200, price: 100},
          {volume: 250, price: 150},
          {volume: 300, price: 200},
          {volume: 350, price: 250},
        ],
      },
      {
        id: 4,
        title: 'Раф кофе',
        price: 300,
        variants: [
          {volume: 200, price: 100},
          {volume: 250, price: 150},
          {volume: 300, price: 200},
          {volume: 350, price: 250},
        ],
        description: ''
      },
      {
        id: 5,
        title: 'Мокко',
        price: 400,
        variants: [
          {volume: 200, price: 100},
          {volume: 250, price: 150},
          {volume: 300, price: 200},
          {volume: 350, price: 250},
        ],
        description: ''
      },
      {
        id: 6,
        title: 'Гляссе',
        price: 500,
        description: '',
        variants: [
          {volume: 200, price: 100},
          {volume: 250, price: 150},
          {volume: 300, price: 200},
          {volume: 350, price: 250},
        ],
      },
    ]

    let orderProduct = reactive([])

    const addInBasket = (product) => {
      orderProduct.push(product)
    }

    let totalPrice = computed(() => {
      return orderProduct.reduce((acc, item) => {
        return acc += item.price
      }, 0)
    })


    const router = useRouter() 
    const openFormDelivery = () => {
      router.push('/form')
    }

    return {
      products,
      orderProduct,
      totalPrice,
      addInBasket,
      openFormDelivery
    }

  }
})
</script>

<style>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
}
.item {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
