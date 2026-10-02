import { alert } from '../utils/Alert.js';

export const alertPlugin = {
  install(app) {
    app.config.globalProperties.$alert = alert
    app.provide('alert', alert)
  },
}