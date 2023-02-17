<template>
  <v-container>
    <v-row class="text-end">
       {{ username }}
    </v-row>
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

