<template>

  <!-- Pseudo code for walkthough -->

  <div class="container-fluid">
    <navbar :houseId="this.houseId" class="mt-3">
    </navbar>
    <div class="row mt-2">

      <div class="col-12">
        <h3>Household : {{house.name}}</h3>
        <h5>Members:</h5>
      </div>
    </div>
    <div class="row">
      <member v-bind:member="member" v-for="member in members" :key="member._id" />
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