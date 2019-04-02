import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SensorsDS1820 from './views/SensorsDS1820.vue'
import SensorsHX711Calibration from './views/SensorsHX711Calibration.vue'
import ConfigWLan from './views/ConfigWLan.vue'
import ConfigAccessPoint from './views/ConfigAccessPoint'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/sensors/ds1820',
        name: 'ds1820',
        component: SensorsDS1820
    },
    {
        path: '/sensors/hx711/calibrate',
        name: 'hx711calibration',
        component: SensorsHX711Calibration
    },
    {
        path: '/config/wlan',
        name: 'wlan',
        component: ConfigWLan
    },
    {
        path: '/config/ap',
        name: 'ap',
        component: ConfigAccessPoint
    }
  ]
})
