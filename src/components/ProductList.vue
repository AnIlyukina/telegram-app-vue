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
import {defineComponent, reactive, computed, onMounted, watchEffect} from 'vue'
import { useRouter } from 'vue-router'
import ProductItem from './ProductItem.vue'
import TgButton from './TgButton.vue'
import { useTelegram } from '@/hooks/useTelegram.js'

export default defineComponent({
  components: { ProductItem, TgButton },
  name: 'ProductList',
  setup() {
    const products = [
      {
        id: 1,
        name: 'Капучино',
        variants: [
          {id: 1, volume: 200, price: 100},
          {id: 2, volume: 250, price: 150},
          {id: 3, volume: 300, price: 200},
          {id: 4, volume: 350, price: 250},
        ]
      },
      { id: 2,
        name: 'Латте',
        variants: [
          {id: 1, volume: 200, price: 100},
          {id: 2, volume: 250, price: 150},
          {id: 3, volume: 300, price: 200},
          {id: 4, volume: 350, price: 250},
        ]
      },
      {
        id: 3,
        name: 'Флэт Уайт',
        variants: [
          {id: 1, volume: 200, price: 100},
          {id: 2, volume: 250, price: 150},
          {id: 3, volume: 300, price: 200},
          {id: 4, volume: 350, price: 250},
        ],
      },
      {
        id: 4,
        name: 'Раф кофе',
        price: 300,
        variants: [
          {id: 1, volume: 200, price: 100},
          {id: 2, volume: 250, price: 150},
          {id: 3, volume: 300, price: 200},
          {id: 4, volume: 350, price: 250},
        ],
      },
      {
        id: 5,
        name: 'Мокко',
        price: 400,
        variants: [
          {id: 1, volume: 200, price: 100},
          {id: 2, volume: 250, price: 150},
          {id: 3, volume: 300, price: 200},
          {id: 4, volume: 350, price: 250},
        ],
      },
      {
        id: 6,
        name: 'Гляссе',
        price: 500,
        variants: [
          {id: 1, volume: 200, price: 100},
          {id: 2, volume: 250, price: 150},
          {id: 3, volume: 300, price: 200},
          {id: 4, volume: 350, price: 250},
        ],
        toppingGroups: [1,2,3]
      },
    ]

    const syrups = [
          {id: 1, name: 'Без сиропа', price: 0 },
          {id: 2, name: 'Карамельный', price: 30 },
          {id: 3, name: 'Кокос', price: 30  }
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

    const { tg } = useTelegram()
 
    onMounted(()=> {
      tg.onEvent('mainButtonClicked', openFormDelivery)
      console.log('s')
    })

    watchEffect(
      () => {
          tg.MainButton.setParams({
            text: `В корзину (${orderProduct.length})`,
            is_visible: true
          })
        if (orderProduct.length) {
          tg.MainButton.enable()
        } else {
          tg.MainButton.disable()
        }
      },
      {
        flush: 'post'
      }
    )


    const router = useRouter() 
    const openFormDelivery = () => {
      if(orderProduct.length) {
        router.push({
        name: 'FormDelivery',
        state: { order: groupByCoffee.value }
      })
      }
    }

    const groupByCoffee = computed(() => {
      // группировка по кофе
      let groups = orderProduct.reduce((acc, cur) => {
        acc[cur.id] = acc[cur.id] || { 
          id: cur.id,
          name: cur.name,
          variants: []
        }
        acc[cur.id].variants.push({
          volume: cur.volume,
          price: cur.price
        })
        return acc
      }, {})

      return groups
    })

    return {
      products,
      orderProduct,
      totalPrice,
      addInBasket,
      openFormDelivery,
      groupByCoffee
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
