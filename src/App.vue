<template>
  <div class="main-page">
    <button
      class="close-button"
      @click="close"
      >
      Закрыть
    </button>

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const tg = window.Telegram.WebApp
    // приложение проинициализировалось
    tg.ready()

    console.log(tg, 'tg')
    const close = () => {
      console.log('close')
      tg.close()
    }
    return {
      close
    }

  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
