import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Houses from './views/Houses.vue'
import Login from './views/Login.vue'
import CreateHouse from './views/CreateHouse.vue'
import Chore from './views/Chore.vue'
import ChoreDetail from './views/ChoreDetail.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:houseId',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/houses',
      name: 'houses',
      component: Houses
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/createhouse",
      name: "createhouse",
      component: CreateHouse
    },
    {
      path: "/:houseId/chore",
      name: "chore",
      component: Chore,
      props: true
    },

    {
      path: "/choredetail",
      name: "choreDetail",
      component: ChoreDetail
    },
  ]
})
