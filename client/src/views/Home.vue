<template>

  <!-- Pseudo code for walkthough -->

  <div class="container-fluid">
    <navbar :houseId="this.houseId" class="mt-3">
    </navbar>
    <div class="row mt-2">

      <div class="col-12">
        <div v-if="isAdmin" class="row">
          <h3>Household : {{house.name}}</h3>
          <h5>Members:</h5>
          <member v-bind:member="member" v-for="member in members" :key="member._id" />
        </div>
        <div v-else>
          <h5>Your Chores:</h5>
          <member-chores :houseId="houseId" :userId="this.user._id">


          </member-chores>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue"
  import Member from "@/components/member.vue"
  import MemberChores from "@/components/MemberChores.vue"

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
      Member,
      MemberChores
    }
  }
</script>