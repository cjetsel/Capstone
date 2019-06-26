<template>
  <div class="col-12">
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
          <div class="col clickable">View Chore List</div>
        </div>
      </div>

    </div>
    <div class="row" v-for="chore in myChores" :key="chore._id">{{chore.name}}</div>
  </div>
</template>
<script>
  export default {
    name: 'Member',
    props: ['member'],
    data() {
      return {
        hideChores: true
      }
    },
    mounted() {
      this.$store.dispatch('getMembers', this.houseId)
      this.$store.dispatch('getChores', this.houseId)

    },
    computed: {
      chores() {
        return this.$store.state.chores
      },
      myChores() {
        return this.chores.filter(c => c.memberId == this.member._id)
      }
    },
    methods: {

    },
  }

</script>

<style>
  .clickable {
    cursor: pointer;
  }
</style>