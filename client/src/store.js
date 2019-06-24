import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})


export default new Vuex.Store({
  state: {
    user: {},
    house: {},
    houses: [],
    chores: []

  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setActiveHouse(state, house) {
      state.house = house
    },
    setHouses(state, houses) {
      state.houses = houses
    },


    setChores(state, chores) {
      state.chores = chores
    }
  },
  actions: {

    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'createhouse' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          dispatch('getHouses')
        })

    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          router.push({ name: 'login' })
        })
    },
    //#endregion
    //#region --House Stuff--
    async addHouse({ commit, dispatch }, newHouse) {
      await api.post('/house', newHouse)
        .then(res => {
          dispatch('getHouses')
        })
    },
    async getActiveHouse({ commit, dispatch }, houseId) {
      await api.get('/house/' + houseId)
        .then(res => {
          commit('setActiveHouse', res.data)
          router.push({ name: 'home', params: { houseId: houseId } })
        })
    },

    async getHouses({ commit, dispatch }) {
      await api.get('/house/')
        .then(res => {
          commit('setHouses', res.data)
          router.push({ name: 'houses' })
        })
    },

    async createChore({ commit, dispatch }, newChore) {
      await api.post('/chores')
        .then(res => {
          dispatch('getChores', res.data)
        })
    },
    async getChores({ commit, dispatch }) {
      await api.get('/chores')
        .then(res => {
          commit('setChores', res.data)
        })
    }


    // #endregion
  }
})
