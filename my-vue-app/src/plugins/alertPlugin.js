import { JxAlert } from '../utils/JxAlert.js';

export const alertPlugin = {
  install(app) {
    app.config.globalProperties.$alert = JxAlert
    app.provide('alert', JxAlert)
  },
}