<template>
  <v-container
    :class="[step === 'second' ? 'order' : '', 'justify-space-between d-flex header-menu pt-2 pb-1']">
    <div 
      v-if="step === 'first'">
      <v-select
        :model-value="modelValue"
        :items="menu"
        :hide-details="true"
        variant="outlined"
        density="compact"
        item-title="name"
        item-value="groupId"
        @update:modelValue="updateValue"
      />
    </div>
    <div class="d-flex align-center">
      <h5>
        {{ username ? username : "Закажи домой" }}
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
    },
    menu: {
      type: Array,
      default: () => []
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    modelValue: "",
  },
  emits: ['openOrderDetails', 'backInCatalog', 'update:modelValue'],
  setup(props, {emit}) {
    const { username } = useTelegram()
    const openOrderDetails = () => {
      emit('openOrderDetails')
    }

     const backInCatalog = () => {
      emit('backInCatalog')
    }

    const updateValue = (target) => {
      emit('update:modelValue', target);
    }
 
    return {
      username,
      openOrderDetails,
      backInCatalog,
      updateValue
    }

  }
})
</script>

<style lang="scss">
.header-menu {
  position: fixed;
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  z-index: 2;

  &.order{
    position: relative;
  }

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

