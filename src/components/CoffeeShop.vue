<template>
  <product-list
    v-if="step === 'first'"
    :products="products"
    @add-in-order="addInOrder"
  >
    <tg-button
      @click="openOrderDetails"
    >
    <span v-if="totalPrice">
      В корзину ({{totalPrice}} ₽.)
    </span>
      <span v-else>
      В корзине пусто :(
    </span>
    </tg-button>
  </product-list>
  <order-details
    v-if="step === 'second'"
  >
    <tg-button
      @click="step = 'first'"
    >
      Назад
    </tg-button>
    <div v-if="order.length">
      <h4 class="mb-4 mt-2">Ваш заказ?</h4>
      <order-s
        :order="order"
        :total-price="totalPrice"
        @changeOrder="changeOrder"
      />
      <h4 class="mb-4">Куда везем?</h4>
    </div>
    <div
      v-else
      class="text-center mt-4"
    >
      Корзина пуста, выбери товар и возврашайся
    </div>
    <form-delivery
      :order="order"
      :payment-type="paymentType"
    />
  </order-details>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import OrderDetails from "@/components/OrderDetails.vue"
import { useTelegram } from "@/hooks/useTelegram";
import FormDelivery from "@/components/FormDelivery";
import OrderS from "@/components/Order";
import paymentType from '@/database/paymentType.json'
import {computed, onMounted, reactive, ref, watchEffect} from "vue";

import TgButton from './TgButton.vue'

export default {
  name: "CoffeeShop",
  components: {
    ProductList,
    OrderDetails,
    FormDelivery,
    OrderS,
    TgButton
  },
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
        variants: [
          {id: 1, volume: 200, price: 100},
          {id: 2, volume: 250, price: 150},
          {id: 3, volume: 300, price: 200},
          {id: 4, volume: 350, price: 250},
        ],
        toppingGroups: [1,2,3]
      },
    ]
    const { tg }  = useTelegram()
    // приложение проинициализировалось
    tg.ready()
    let step = ref('first')
    let orderProducts = reactive([])
    const addInOrder = (product) => {
      orderProducts.push(product)
    }

    const order = computed(() => {
      // группирую по миллитрам и id
      let groups = orderProducts.reduce((acc, cur) => {
        let key = cur.id + cur.volume
        acc[key] = acc[key] || {
          id: cur.id,
          name: cur.name,
          volume: cur.volume,
          price: cur.price,
          count: 0
        }
        acc[key].count += 1
        return acc
      }, {})

      return Object.values(groups)
    })

    let totalPrice = computed(() => {
      return orderProducts.reduce((acc, item) => {
        return acc += item.price
      }, 0)
    })


    onMounted(()=> {
      tg.onEvent('mainButtonClicked', openOrderDetails)
    })

    watchEffect(
      () => {
        let message = totalPrice.value ? `В корзину (${totalPrice.value}₽.)` : 'В корзине пусто :('
        tg.MainButton.setParams({
          text: message,
          is_visible: true
        })
        if (orderProducts.length) {
          tg.MainButton.enable()
        } else {
          tg.MainButton.disable()
        }
      },
      {
        flush: 'post'
      }
    )

    const openOrderDetails = () => {
      if (totalPrice.value) {
        step.value = 'second'
        tg.offEvent('mainButtonClicked', openOrderDetails)
      }
    }

    const changeOrder = (product, action) => {
      delete product['count']
      let deleteIndex
      switch (action) {
        case 'increment':
          orderProducts.push(product)
          break;
        case 'decrement':
          deleteIndex = orderProducts.findIndex(orderProduct => orderProduct.id === product.id )
          orderProducts.splice(deleteIndex, 1)
          break;
        default:
          alert( "Ошибка, которой быть не должно и быть не может" );
      }
    }


    return {
      products,
      paymentType,
      orderProducts,
      totalPrice,
      addInOrder,
      order,
      step,
      openOrderDetails,
      changeOrder
    }
  }
}
</script>

