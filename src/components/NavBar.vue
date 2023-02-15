<template>
  <v-container>
    <v-row class="header">
      <tg-button @click="onClose">Закрыть</tg-button>
      <span class="username">
      {{ username }}
    </span>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useTelegram } from '@/hooks/useTelegram.js'

import TgButton from './TgButton.vue';
export default defineComponent({
  name: "NavBar",
  components: { TgButton },
 setup() {
    const { username, onClose} = useTelegram()

    return {
      onClose,
      username
    }

  }
})
</script>

<style>
.header{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.username {
  margin-left: auto;
}
</style>
