<template>
  <router-link to="/form" class="v-btn">Корзина</router-link>
  <div>Цена : {{ totalPrice }} p</div>
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
import {defineComponent, reactive, computed, onMounted} from 'vue'
import ProductItem from './ProductItem.vue'

import { useTelegram } from '../hooks/useTelegram'
export default defineComponent({
  components: { ProductItem },
  name: 'ProductList',
  setup() {
    const { tg, queryId } = useTelegram()
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
        description: ''
      },
    ]

    let orderProduct = reactive([])

    const addInBasket = (product) => {
      // let indexProduct = orderProduct.findIndex(item => item.id === product.id)
      // if (indexProduct !== -1) {
      //   orderProduct.splice(indexProduct, 1)
      //   return
      // }
      orderProduct.push(product)
    }

    let totalPrice = computed(() => {
      return orderProduct.reduce((acc, item) => {
        return acc += item.price
      }, 0)
    })

    // onMounted(() => {
    //   if (addedProduct.length) {
    //     tg.MainButton.hide()
    //   } else {
    //     tg.MainButton.show()
    //     tg.MainButton.setParams({
    //       text: `Купить ${totalPrice.value} p.`
    //     })
    //   }

    //   tg.onEvent('mainButtonClicked', onSendData)
    // })

    // function onSendData() {
    //   const data = {
    //     products: addedProduct,
    //     totalPrice,
    //     queryId
    //   }
    //   fetch('http:localhost:8080', {
    //     method: "POST",
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   })
    // }




    return {
      products,
      orderProduct,
      totalPrice,
      addInBasket
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
