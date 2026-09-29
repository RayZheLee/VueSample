// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify.js'

<<<<<<< HEAD
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router'

const vuetify = createVuetify({
    components,
    directives
})

createApp(App)
    .use(vuetify)   // ⭐ Vuetify
    .use(router)    // ⭐ Router
    .mount('#app')
=======
const app = createApp(App)
app.use(vuetify)
app.mount('#app')
>>>>>>> e82ff2f (feat: 建立員工部門選擇器與範例，vuetify引用共用、企業色)
