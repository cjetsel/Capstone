<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-1">
        <router-link :to="{name: 'home', params: {userId: user._id}}"><img class="back-img"
            src="../assets/backarrow.png">
        </router-link><small>Home</small>
      </div>
      <div class="col-1">
        <button class="btn btn-primary" @click="logout">logout</button>
      </div>
      <div class="col-11">
        <h3>Welcome {{user.name}}!</h3>
      </div>
    </div>
    <navbar :houseId="this.houseId">
    </navbar>

    <div class="row">
      <!-- v-for user in users -->
      <div class="col-12" v-for='chore in chores'>
        <div class="row bg-primary my-1">
          <div class="col-1 bg-white border border-white"> <img class="button-img" src="../assets/pokeball.png" alt="">
          </div>
          <div class="col-10">
            <div class="row justify-content-between ">
              <div class="col">{{chore.name}}</div>
              <div class="col">Points: {{chore.pointValue}}</div>
            </div>
            <div class="row ">
              <div v-if="chore.adminComplete == false && chore.adminComplete == false" class="col"> Awaiting Completion
              </div>
              <div v-else-if="chore.adminComplete == false" class="col">Verify: Pending</div>
              <div v-else="chore.adminComplete == true" class="col">Verify: Complete</div>
              <div v-if="chore.memberComplete == false" class="col">Status: Incomplete</div>
              <div v-else="chore.memberComplete == true" class="col">Status: Done</div>
            </div>
            <button class="btn btn-info" @click="adminVerify(chore._id)">Complete</button>
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
    background-size: 8vw;
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