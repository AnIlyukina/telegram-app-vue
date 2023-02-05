<template>
  <div class="product">
    <div class="img"/>
    <div class="title">{{ product.title }}</div>
    <div class="description">{{ product.description }}</div>
    <div class="price">
      <span>
        Стоимость: <b>{{ product.price }}</b>
      </span>
    </div>
    <tg-button
      class="add-btn">
      Добавить в корзину
    </tg-button>
  </div>
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
  }

})
</script>

<style>
.product{
  display: flex;
  flex-direction: column;
  border: 1px solid var(--tg-theme-button-color);
  padding: 15px;
  width: 170px;
}
.img {
  width: 100%;
  background: lightgray;
  height: 100px;
  margin: 0 auto;
  background: var(--tg-theme-button-color);
}
.description {
  font-size: .8em;
}
.add-btn {
  width: 100%;
}
</style>