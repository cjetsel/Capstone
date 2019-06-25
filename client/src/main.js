import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
Vue.config.productionTip = false

let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = axios.create({
  baseURL: base + "auth/",
  timeout: 9000,
  // was 3000
  withCredentials: true
})

auth.get('authenticate')
  .then(res => {
    store.commit('setUser', res.data)
    store.dispatch('getHousesByMember', res.data._id)
    // router.push({ name: 'boards' })

    new Vue({
      router,
      store,
      render: function (h) { return h(App) }
    }).$mount('#app')

  })
  .catch(res => {
    new Vue({
      router,
      store,
      render: function (h) { return h(App) }
    }).$mount('#app')

    router.push({ name: 'login' })
  })