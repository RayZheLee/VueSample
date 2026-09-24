import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { vuetifyTheme } from './theme.js'

export const vuetify = createVuetify({
  theme: vuetifyTheme,
})