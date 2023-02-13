import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import vuetify from './plugins/vuetify.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { loadFonts } from './plugins/webfontloader.js'
loadFonts()

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
