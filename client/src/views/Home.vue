<template>

  <!-- Pseudo code for walkthough -->

  <div class="container-fluid">
    <navbar :houseId="this.houseId" class="mt-3">
    </navbar>
    <div class="row mt-5">

      <!-- <div class="col-1">
        <router-link :to="{name: 'houses', params: {userId: user._id}}"><img class="back-img"
            src="../assets/backarrow.png">
        </router-link><small>Houses</small>
      </div> -->
      <!-- <div class="col-1">
        <button class="btn btn-primary" @click="logout">logout</button>
      </div> -->
      <div class="col-11">
        <h3>Welcome to House {{house.name}}, {{user.name}}!</h3>
      </div>
    </div>
    <div v-if="isAdmin" class="row">
      <member v-bind:member="member" v-for="member in members" :key="member._id" />
    </div>
    <div v-else>


    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue"
  import Member from "@/components/member.vue"

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
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      Navbar,
      Member
    }
  }
</script>