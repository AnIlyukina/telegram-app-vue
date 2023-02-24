<template>
  <v-app-bar
    :color="'var(--tg-theme-button-color)'"
    :class="[step === 'first' ? 'position-fixed' : '']"
  >
    <v-app-bar-nav-icon
      v-if="step === 'first'"
      variant="text"
      :color="'var(--tg-theme-button-text-color)'"
      @click.stop="drawer = !drawer"/>
    <v-spacer></v-spacer>
    <div class="mr-3">
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
  </v-app-bar>
  <v-navigation-drawer
    :class="[step === 'first' ? 'position-fixed' : '']"
    v-model="drawer"
    temporary
    location="top"
  >
    <v-list
      density="compact"
      nav>
        <v-list-item
          v-for="(position, index) in menu"
          :key="index"
          prepend-icon="mdi-thumb-up"
          :title="position.name"
          :value="position.groupId"
          @click="updateValue(position.groupId)"
        />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { defineComponent, ref } from 'vue';
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

    let drawer = ref(false)
    const openOrderDetails = () => {
      if (!drawer.value) {
        emit('openOrderDetails')
      }
    }

     const backInCatalog = () => {
      emit('backInCatalog')
    }

    const updateValue = (target) => {
      emit('update:modelValue', target);
      drawer.value = false
    }

    return {
      username,
      openOrderDetails,
      backInCatalog,
      updateValue,
      drawer
    }

  }
})
</script>

<style lang="scss">
.header-menu {
  position: fixed;
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
    color: var(--tg-theme-button-text-color);
    right: 25px;
    bottom: 10px;
  }
  &__back{
    //color: var(--tg-theme-button-text-color);;
    cursor: pointer;
  }
}
</style>

