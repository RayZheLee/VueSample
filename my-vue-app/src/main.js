import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify.js'
import { alertPlugin } from './plugins/alertPlugin.js';

createApp(App)
    .use(vuetify)   // ⭐ Vuetify
    .use(router)    // ⭐ Router
    .use(alertPlugin) 
    .mount('#app')