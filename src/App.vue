<template>
  <div class="app">
    <nav-bar/>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue'
import { useTelegram } from '@/hooks/useTelegram.js'
export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const {tg, onToggleButton}  = useTelegram()
    // приложение проинициализировалось
    tg.ready()
   
    return {
      onToggleButton
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
