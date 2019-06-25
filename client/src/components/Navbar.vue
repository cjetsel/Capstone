<template>
  <div>
    <div class="row button-routes mb-2" v-if="isAdmin">

      <div class="col-12">
        <div class="row justify-content-center">
          <!-- --this should be EDIT, it contains all edit of household info so ?? ask team mystic-- -->
          <div class="col-2 mx-2">
            <router-link :to="{name: 'settings', params: {houseId}}"><img class="button-img" src="../assets/house.png"
                alt="">
            </router-link>
            Settings
          </div>
          <!-- to add and assign chores, click the chore button! -->
          <div class="col-2 mx-2" v-if="">
            <router-link :to="{name: 'chore', params: {houseId}}"><img class="button-img" src="../assets/cleaner.png"
                alt="">
            </router-link>Chore
          </div>
          <!-- to view and edit points, click the points button -->
          <div class="col-2 mx-2"><img class="button-img" src="../assets/money-bag.png" alt="">View Pts</div>

          <div class="col-2 mx-2"><img class="button-img" src="../assets/incentive.png" alt="">Rewards</div>
        </div>
      </div>
    </div>
    <div class="row button-routes mb-2" v-else>

      <div class="col-12">
        <div class="row justify-content-center">
          <!-- --this should be EDIT, it contains all edit of household info so ?? ask team mystic-- -->
          <div class="col-2 mx-2">
            <img class="button-img" src="../assets/kitchen.png" alt="">
            Settings
          </div>
          <!-- to add and assign chores, click the chore button! -->
          <div class="col-2 mx-2">
            <img class="button-img" src="../assets/livingroom.png" alt="">
            Chore
          </div>
          <!-- to view and edit points, click the points button -->
          <div class="col-2 mx-2"><img class="button-img" src="../assets/money-bag.png" alt="">View Pts</div>

          <div class="col-2 mx-2"><img class="button-img" src="../assets/incentive.png" alt="">Rewards</div>
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
    }
  }

</script>