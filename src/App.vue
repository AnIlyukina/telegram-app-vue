<template>
  <v-app>
    <nav-bar/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
});
</script>
