import { createApp } from 'vue'

// import './style.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './QueryEmpInfo.vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})

const app = createApp(App)

app.use(vuetify)

app.mount('#app')