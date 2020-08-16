// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.prototype.axios = axios;
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
// 使用Vue.prototype实现全局变量
// http://www.axios-js.com/docs/index.html
// https://blog.csdn.net/lwpoor123/article/details/85259614
Vue.prototype.$ajax = axios
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.token) { // 判断当前的token是否存在
      next({
        path: '/userlogin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
import Vuex from 'vuex'

Vue.use(Vuex)
const key = 'user'
const isLogin = 'isLogin'
const store = new Vuex.Store({
  state () {
    return {
      user: null,
      isLogin: '0'
    }
  },
  getters: {
    getStorage: function (state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
        state.isLogin = localStorage.getItem(isLogin)
      }
      return state.user
    }
  },
  mutations: {
    $_setLogin (state, value) {
      state.isLogin = value
      localStorage.setItem(isLogin, value)
    },
    $_setStorage (state, value) {
      state.user = value
      localStorage.setItem(key, JSON.stringify(value))
    },
    $_removeStorage (state) {
      state.user = null
      localStorage.removeItem(key)
    }
  }
})

export default store

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
