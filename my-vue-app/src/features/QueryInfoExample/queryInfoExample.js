import { createApp } from 'vue'
import App from './QueryInfoExample.vue'

import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from '../../plugins/vuetify.js'

createApp(App)
    .use(vuetify)   // ⭐ Vuetify
    .mount('#app')