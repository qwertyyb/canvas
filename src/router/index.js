import Vue from 'vue'
import Router from 'vue-router'
import Clock from '@/components/Clock'
import Linear from '@/components/Linear'
import Stars from '@/components/Stars'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Clock',
      component: Clock
    },{
      path: '/linear',
      name: 'Linear',
      component: Linear
    },{
      path: '/Stars',
      name: 'Stars',
      component: Stars
    }
  ]
})