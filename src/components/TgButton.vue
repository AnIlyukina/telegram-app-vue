<template>
  <v-btn
    rounded="pill"
    :color="'var(--tg-theme-button-color)'"
    variant="tonal"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TgButton'
});
</script>
