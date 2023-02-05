<template>
  <div class="app">
    <nav-bar/>
    <button @click="onToggleButton">toggle</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const tg = window.Telegram.WebApp
    // приложение проинициализировалось
    tg.ready()
    const onToggleButton = () => {
      if (tg.MainButton.isVisible) {
        tg.MainButton.hide()
      } else {
        tg.MainButton.show()
      }
    }
    return {
      onToggleButton
    }
  }
});
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
