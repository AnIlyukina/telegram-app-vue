<template>
  <v-container class="justify-space-between d-flex header-menu  ">
    <div class="d-flex align-center">
      <h5>
        {{ username ? username : "Рады видеть вас!" }}
      </h5>
    </div>
    <div>
      <div 
        v-if="step === 'first'"
        class="header-menu__basket"
        @click="openOrderDetails"
        >
        <small class="header-menu__price">
         ({{ totalPrice }}₽)
        </small>
        <v-icon
        icon="mdi-delete"
        :color="'var(--tg-theme-button-text-color)'"
        />
      </div>
      <div
        v-else
        class="header-menu__back"
        @click="backInCatalog"
      >
        <v-icon
          icon="mdi-arrow-left"
          :color="'var(--tg-theme-button-text-color)'"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useTelegram } from '@/hooks/useTelegram.js'

export default defineComponent({
  name: "HeaderMenu",
  props:{
    step: {
      type: String,
      defalt: 'first'
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  emits: ['openOrderDetails', 'backInCatalog'],
  setup(props, {emit}) {
    const { username } = useTelegram()

    const openOrderDetails = () => {
      emit('openOrderDetails')
    }

     const backInCatalog = () => {
      emit('backInCatalog')
    }
 
    return {
      username,
      openOrderDetails,
      backInCatalog
    }

  }
})
</script>

<style lang="scss">
.header-menu {
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);

  &__basket{
    position: relative;
    cursor:pointer;
  }
  &__price{
    position: absolute;
    // color: var(--tg-theme-button-text-color);
    right: 25px;
    bottom: 10px;
  }
  &__back{
    //color: var(--tg-theme-button-text-color);;
    cursor: pointer;
  }
}
</style>

