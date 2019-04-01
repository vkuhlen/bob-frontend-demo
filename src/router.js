import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DS1820 from './views/DS1820.vue'
import HX711 from './views/HX711.vue'
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
        component: DS1820
    },
    {
        path: '/sensors/hx711',
        name: 'hx711',
        component: HX711
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
