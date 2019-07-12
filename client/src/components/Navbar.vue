<template>
  <div>
    <div class="row button-routes mb-2" v-if="isAdmin">

      <div class="col-12">
        <div class="row justify-content-center">
          <!-- --this should be EDIT, it contains all edit of household info so ?? ask team mystic-- -->
          <div class="col mx-2">
            <router-link :to="{name: 'home', params: {houseId: this.houseId}}"><img class="button-img"
                src="../assets/house.png" alt="">
            </router-link>
            Home
          </div>
          <div class="col mx-2">
            <router-link :to="{name: 'settings', params: {houseId: this.houseId}}"><img class="button-img"
                src="../assets/settings.png" alt="">
            </router-link>
            Settings
          </div>
          <div class="col mx-2">
            <img class="button-img" src="../assets/backarrow.png" alt="" @click="logout">
            Logout
          </div>
          <!-- to add and assign chores, click the chore button! -->
          <div class="col mx-2" v-if="">
            <router-link :to="{name: 'chore', params: {houseId: this.houseId}}"><img class="button-img"
                src="../assets/cleaner.png" alt="">
            </router-link>Chores
          </div>
          <!-- to view and edit points, click the points button -->
          <div class="col mx-2">
            <router-link :to="{name: 'pointAssign', params: {houseId: this.houseId}}"><img class="button-img"
                src="../assets/money-bag.png" alt=""></router-link>Points
          </div>

          <div class="col mx-2">
            <router-link :to="{name: 'rewards', params: {houseId: this.houseId}}"><img class="button-img"
                src="../assets/incentive.png" alt="">
            </router-link>
            Rewards
          </div>

        </div>
      </div>
    </div>
    <div class="row button-routes mb-2" v-else>

      <div class="col-12">
        <div class="row justify-content-around">
          <!-- --this should be EDIT, it contains all edit of household info so ?? ask team mystic-- -->
          <div class="col-2 mx-2">
            <router-link :to="{name: 'home', params: {houseId: this.houseId}}"><img class="button-img"
                src="../assets/house.png" alt="">
            </router-link>
            Home
          </div>
          <!-- <div class="col mx-2">
            <router-link :to="{name: 'settings', params: {houseId: this.houseId}}"><img class="button-img"
                src="../assets/settings.png" alt="">
            </router-link>
            Settings
          </div> -->
          <div class="col-2 mx-2 align-content-center">
            <router-link :to="{name: 'rewards', params: {houseId: this.houseId}}"><img class=" button-img"
                src="../assets/incentive.png" alt="">
            </router-link>Rewards

          </div>


          <div class="col-2 mx-2">
            <img class="button-img" src="../assets/backarrow.png" alt="" @click="logout">
            Logout
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "navbar",
    props: ["houseId"],

    data() {
      return {
      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId)
    },
    computed: {
      house() {
        return this.$store.state.house
      },
      isAdmin() {
        return this.$store.getters.isAdmin
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }

</script>