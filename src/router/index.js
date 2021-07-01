import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'

const loadView = (view, index = 'index') => () =>
  import(`@/views/${view}/${index}.vue`)

Vue.use(Router)

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)

  return originalReplace.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/livePersonal',
        },
        {
          path: 'livePersonal',
          name: 'livePersonal',
          component: loadView('livePersonal'),
        },
        {
          path: 'insuredPersonal',
          component: loadView('insuredPersonal'),
          children: [
            {
              path: '/',
              name: 'insuredPersonal',
              component: loadView('insuredPersonal', 'detalt'),
            },
            {
              path: 'downloadProve',
              name: 'downloadProve',
              component: loadView('insuredPersonal/downloadProve'),
            },
          ],
        },
      ],
    },
  ],
})
