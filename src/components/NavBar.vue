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

export default defineComponent({
  name: "NavBar",
  components: { TgButton },
 setup() {
    const tg = window.Telegram.WebApp
    // приложение проинициализировалось
    tg.ready()


    const username = tg.initDataUnsafe?.user?.username
    const onClose = () => {
      tg.close()
    }
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
}

.username {
  margin-left: auto;
}
</style>