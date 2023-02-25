<template>
  <v-layout>
    <header-menu
      v-model="selectedPosition"
      :step="step"
      :menu="menu"
      :total-price="totalPrice"
      @backInCatalog="backInCatalog"
      @openOrderDetails="openOrderDetails"
    />
    <v-main>
      <product-list
        v-if="step === 'first'"
        :products="products"
        @add-in-order="addInOrder"
      />
      <order-details v-if="step === 'second'">
        <div v-if="order.length">
          <h4 class="mb-4 mt-2">Ваш заказ?</h4>
          <order-s
            :order="order"
            :total-price="totalPrice"
            @changeOrder="changeOrder"
          />
          <h4 class="mb-4">Куда везем?</h4>
        </div>
        <div v-else class="text-center mt-4">
          Корзина пуста, выбери товар и возврашайся
        </div>
        <form-delivery
          :order="order"
          :total-price="totalPrice"
          :payment-type="paymentType"
        />
      </order-details>
    </v-main>
  </v-layout>
</template>

<script>
// то что нужно получать с бекенда
import paymentType from "@/database/paymentType.json";
import groups from "@/database/groups.json";
import allProducts from "@/database/products";

import { useTelegram } from "@/hooks/useTelegram";

import ProductList from "@/components/ProductList.vue";
import OrderDetails from "@/components/OrderDetails.vue";
import FormDelivery from "@/components/FormDelivery";
import OrderS from "@/components/Order";
import HeaderMenu from "@/components/HeaderMenu.vue";
import Products from "@/models/Products";
import { computed, reactive, ref } from "vue";

export default {
  name: "CoffeeShop",
  components: {
    ProductList,
    OrderDetails,
    FormDelivery,
    OrderS,
    HeaderMenu,
  },
  setup() {
    const { tg } = useTelegram();
    // приложение проинициализировалось
    tg.ready();

    let step = ref("first");
    let selectedPosition = ref(1);

    const { menu } = Products.setData({ groups, allProducts });
  
    const products = computed(() => {
      return menu.filter((item) => item.groupId === selectedPosition.value)[0]
        .products;
    });

    let orderProducts = reactive([]);
    const addInOrder = (product) => {
      orderProducts.push(product);
    };

    const order = computed(() => {
      // группирую по миллитрам и id
      let groups = orderProducts.reduce((acc, cur) => {
        let key = cur.id + cur.volume;
        acc[key] = acc[key] || {
          id: cur.id,
          name: cur.name,
          groupName: cur.groupName,
          volume: cur.volume,
          price: cur.price,
          count: 0,
        };
        acc[key].count += 1;
        return acc;
      }, {});

      return Object.values(groups);
    });

    let totalPrice = computed(() => {
      return orderProducts.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);
    });

    const openOrderDetails = () => {
      if (totalPrice.value) {
        step.value = "second";
      }
    };

    const changeOrder = (product, action) => {
      delete product["count"];
      let deleteIndex;
      switch (action) {
        case "increment":
          orderProducts.push(product);
          break;
        case "decrement":
          deleteIndex = orderProducts.findIndex(
            (orderProduct) => orderProduct.id === product.id
          );
          orderProducts.splice(deleteIndex, 1);
          break;
        default:
          alert("Ошибка, которой быть не должно и быть не может");
      }
    };

    const backInCatalog = () => {
      step.value = "first";
    };

    return {
      products,
      paymentType,
      orderProducts,
      totalPrice,
      addInOrder,
      order,
      step,
      backInCatalog,
      openOrderDetails,
      changeOrder,
      selectedPosition,
      menu,
    };
  },
};
</script>
