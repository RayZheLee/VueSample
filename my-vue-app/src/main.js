import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify.js'

createApp(App)
    .use(vuetify)   // ⭐ Vuetify
    .use(router)    // ⭐ Router
    .mount('#app')