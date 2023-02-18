<template>
  <v-container class="text-center header">
      <h5>
        {{ username ? username : "Рады видеть вас!" }}
      </h5>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useTelegram } from '@/hooks/useTelegram.js'

export default defineComponent({
  name: "NavBar",
 setup() {
    const { username } = useTelegram()

    return {
      username
    }

  }
})
</script>

<style lang="scss">
.header {
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
}
</style>

