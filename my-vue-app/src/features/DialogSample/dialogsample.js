import { createApp } from 'vue'

import '@mdi/font/css/materialdesignicons.css'

import DialogSample from './DialogSample.vue'
import { vuetify } from '../../plugins/vuetify.js'

const app = createApp(DialogSample)

app.use(vuetify)

app.mount('#app')