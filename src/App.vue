<template>
  <v-container class="app">
    <nav-bar/>
    <router-view />
  </v-container>
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
    const { tg }  = useTelegram()
    // приложение проинициализировалось
    tg.ready()
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
