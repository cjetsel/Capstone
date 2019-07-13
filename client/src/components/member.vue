<template>
  <div class="col-12">
    <div class="row m-1 p-1 rounded bg-member">
      <div class="col-2"><img class="icon-user" src="../assets/3.png" alt="">
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-10">
            <h5>{{member.name}}</h5>
          </div>
          <div class="col-2">
            <img class="icon-point" src="../assets/points.png" alt="">
          </div>

        </div>

        <div class="row">
          <!-- trophies eventually -->
          <div class="col-10 clickable" @click="hideChores=!hideChores">View Chore List</div>
          <div class="col-2">
            <small>{{member.points}}</small>
          </div>
        </div>
      </div>


    </div>
    <div v-if="!hideChores">
      <div class="row m-1 justify-content-end rounded bg-chore" v-for="chore in myChores" :key="chore._id">
        <div class="col-8 p-1 pr-0 mr-0 ">
          <h6 class="m-0 ml-2 text-left"><strong>{{chore.name}}</strong></h6>
        </div>
        <div class="col-4 p-1 pr-0 mr-0">
          <h6 class="m-0"><small>{{chore.pointValue}}</small></h6>
        </div>
        <div class="col-3 m-0 p-1 pr-0 mr-0">
          <h6 class="m-0 ml-2 mr-2 text-left"><small>Description:</small></h6>
        </div>
        <div class="col-8 p-1 pr-0 mr-0 ">
          <h6 class="m-0 ml-2 text-left"><small>{{chore.description}}</small></h6>
        </div>


      </div>
    </div>
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

  .icon-user {
    width: 18vw;
    border: 5px solid #ea4444;
    border-radius: 50%;
  }

  .icon-point {
    width: 9vw;
    border: 3px solid #ffaa00;
    border-radius: 50%;
  }

  .bg-chore {
    background-color: #fdd14c25;
    border: 2px solid #ffd34f;
  }

  .bg-member {
    background-color: #ffd34f;
  }
</style>