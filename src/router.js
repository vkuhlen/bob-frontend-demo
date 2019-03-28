import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DS1820 from './views/DS1820.vue'
import ConfigWLan from './views/ConfigWLan.vue'

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
        path: '/config/wlan',
        name: 'wlan',
        component: ConfigWLan
    }
  ]
})
