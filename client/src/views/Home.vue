<template>

  <!-- Pseudo code for walkthough -->
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-1">
        <router-link :to="{name: 'houses', params: {userId: user._id}}"><img class="back-img"
            src="../assets/backarrow.png">
        </router-link><small>Houses</small>
      </div>
      <div class="col-1">
        <button class="btn btn-primary" @click="logout">logout</button>
      </div>
      <div class="col-11">
        <h3>Welcome to House {{house.name}}, {{user.name}}!</h3>
      </div>
    </div>
    <div class="row button-routes mb-2">
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
          <div class="col-2 mx-2">
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
    <div class="row">
      <!-- v-for user in users -->
      <div class="col-12" v-for="member in members">
        <div class="row bg-primary my-1">
          <div class="col-1 bg-white border border-white"> <img class="button-img" src="../assets/pokeball.png" alt="">
          </div>
          <div class="col-10">
            <div class="row justify-content-between ">
              <div class="col">{{member.name}}</div>
              <div class="col">{{member.points}}</div>
            </div>
            <div class="row ">
              <div class="col">trophies</div>
              <div class="col">{{member.rewards}}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src


  export default {
    name: 'home',
    props: ['houseId'],
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('authenticate');
      this.$store.dispatch('getMembers', this.houseId)
    },
    computed: {
      house() {
        return this.$store.state.house
      },
      user() {
        return this.$store.state.user
      },
      members() {
        return this.$store.state.members
      }
      // users() {
      //   return this.$store.state.users
      // }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>