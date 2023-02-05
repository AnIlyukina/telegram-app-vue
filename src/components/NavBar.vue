<template>
  <div class="header">
    <tg-button @click="onClose">Закрыть</tg-button>
    <span class="username">
      {{ username }}
    </span>
  </div>
  
</template>

<script>
import { defineComponent } from 'vue';
import TgButton from './TgButton.vue';
import { useTelegram } from '@/hooks/useTelegram.js'
export default defineComponent({
  name: "NavBar",
  components: { TgButton },
 setup() {
    const {tg , username, onClose} = useTelegram()
    // приложение проинициализировалось
    tg.ready()

  
    
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
  padding: 0 20px;
  box-sizing: border-box;
}

.username {
  margin-left: auto;
}
</style>