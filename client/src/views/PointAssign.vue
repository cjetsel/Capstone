<template>
  <div class="container-fluid">
    <navbar :houseId="this.houseId" class="mt-3">
    </navbar>
    <div class="row mt-5">
      <div class="col-1">
      </div>
      <div class="col-1">
      </div>
      <div class="col-11">
        <h3>Welcome {{user.name}}!</h3>
      </div>
    </div>


    <div class="row">
      <!-- v-for user in users -->
      <div class="col-12" v-for='chore in chores'>
        <div class="row bg-primary my-1">
          <div class="col-1 bg-white border border-white"> <img class="button-img" src="../assets/pokeball.png" alt="">
          </div>
          <div class="col-10">
            <div class="row justify-content-between justify-content-center">
              <div class="col-6 justify-content-center">{{chore.name}}</div>
              <div class="col-6 justify-content-center">Points: {{chore.pointValue}}</div>
            </div>
            <div class="row ">
              <div v-if="chore.adminComplete == false && chore.memberComplete == false" class="col"> Awaiting Completion
              </div>
              <div v-else-if="chore.adminComplete == false" class="col">Pending Approval</div>
              <div v-else="chore.adminComplete == true" class="col">Verified</div>
              <div v-if="chore.memberComplete == false" class="col">Status: Incomplete</div>
              <div v-else="chore.memberComplete == true" class="col">Status: Done</div>
              <div class="col-2 btn points" @click="adminVerify(chore._id)">Verify</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
//
<script>
  import Navbar from "@/components/Navbar.vue"
  export default {
    name: "PointAssign",
    props: ["houseId"],
    data() {
      return {
        editedChore: {
          houseId: this.houseId,
          adminComplete: true
        }
      }

    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('authenticate');
      this.$store.dispatch('getChores', this.houseId)
    },

    computed: {
      user() {
        return this.$store.state.user
      },
      chores() {
        return this.$store.state.chores
      },
      isAdmin() {
        return this.$store.getters.isAdmin
      },
      house() {
        return this.$store.state.house
      },
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      adminVerify(choreId) {
        let data = {
          _id: choreId,
          editedChore: this.editedChore,
          adminComplete: true
        }

        this.$store.dispatch('editChore', data)
      }
    },
    components: {
      Navbar
    }
  }
</script>
<style>
  .back-img {
    width: 3vh
  }

  .chore-img {
    width: 20vw;
  }

  .h-12 {
    height: 10vw;
  }

  .points {
    background-image: url("../assets/points.png");
    background-size: 12vw;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    text-shadow: 0px 0px 3px #000;
  }

  .assign {
    background-image: url("../assets/assign.png");
    background-size: 8vw;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    text-shadow: 0px 0px 3px #000;
  }

  .edit {
    background-image: url("../assets/edit.png");
    background-size: 8vw;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    text-shadow: 0px 0px 3px #000;
  }

  .del {
    background-image: url("../assets/delete.png");
    background-size: 8vw;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    text-shadow: 0px 0px 3px #000;
  }
</style>