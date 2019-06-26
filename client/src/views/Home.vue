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
    <navbar :houseId="this.houseId">
    </navbar>
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
              <div class="col" @click="filterChores(member._id)">View Chore List</div>
            </div>
          </div>

        </div>
        <div class="row" v-for="chore in chores" :key="memberId">chore</div>
      </div>

    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue"


  export default {
    name: 'home',
    props: ['houseId'],
    beforeCreated() {
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('authenticate');
      this.$store.dispatch('getMembers', this.houseId)
      this.$store.dispatch('getChores', this.houseId)

    },
    computed: {
      isAdmin() {
        return this.$store.getters.isAdmin
      },
      house() {
        return this.$store.state.house
      },
      user() {
        return this.$store.state.user
      },
      members() {
        return this.$store.state.members
      },
      chores() {
        return this.$store.state.chores
      },
      activeChores() {
        return this.$store.state.chores
      }

    },

    // users() {
    //   return this.$store.state.users
    // }

    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      filterChores(memberId) {
        let chores = this.chores.filter(chore => chore.memberId == memberId)
        this.$store.dispatch('setActiveChoreList', chores)
      }

    },
    components: {
      Navbar
    }
  }
</script>