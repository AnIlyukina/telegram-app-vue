<template>
  <router-link to="/form" class="v-btn">Продолжить</router-link>
  <div>Цена : {{ totalPrice }} p</div>
  <ul class="list">
    <li
      v-for="product in products"
      :key="product.id"
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
    const { tg, queryId} = useTelegram()
    const products = [
      { id: 1, title: 'Кофе1', price: 100, description: '' },
      { id: 2, title: 'Кофе2', price: 100, description: '' },
      { id: 3, title: 'Кофе3', price: 200, description: '' },
      { id: 4, title: 'Кофе4', price: 300, description: '' },
      { id: 5, title: 'Кофе5', price: 400, description: '' },
      { id: 6, title: 'Кофе6', price: 500, description: '' },
      { id: 7, title: 'Кофе7', price: 700, description: '' },
      { id: 8, title: 'Кофе8', price: 600, description: '' },
    ]

    let addedProduct = reactive([])

    const addInBasket = (product) => {
      let indexProduct = addedProduct.findIndex(item => item.id === product.id)
      if (indexProduct !== -1) {
        addedProduct.splice(indexProduct, 1)
        return
      }
      addedProduct.push(product)
    }

    let totalPrice = computed(() => {
      return addedProduct.reduce((acc, item) => {
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
      addedProduct,
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
