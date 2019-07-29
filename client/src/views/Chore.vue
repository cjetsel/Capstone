<template>
  <div class="container-fluid">
    <navbar :houseId="this.houseId" class="mt-3">
    </navbar>
    <div class="row mt-3">

      <div class="col-11">
        <h1>Add a Chore</h1>

      </div>
    </div>

    <!-- <div class="row justify-content-center">
      <div class="col my-1"><img class="chore-img" src="../assets/livingroom.png"><small>Living Room</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/bedroom.png"><small>Bedroom</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/kitchen.png"><small>Kitchen</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/bathroom.png"><small>Bathroom</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/yard.png"><small>Yard</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/misc.png"><small>Misc.</small></div>
    </div> -->
    <div class="row justify-content-center mt-3">
      <button v-if="!hideForm" class="btn btn-primary col-11" @click="hideForm = !hideForm">Hide Chore Creator</button>
      <button v-else class="btn btn-primary col-11" @click="hideForm = !hideForm">Add Chore!</button>
    </div>
    <!-- form to populate -->
    <div class="row justify-content-center" v-if="!hideForm">
      <div class="col-11">
        <form @submit.prevent="createChore(); hideForm=!hideForm">
          <div class="row justify-content-between my-1">
            <div class="col-8">
              <input class="form-control" type="text" placeholder="Chore Name" v-model="newChore.name">
            </div>
            <div class="col-3">
              <input class="form-control" type="Number" placeholder="Points" v-model="newChore.pointValue">
            </div>
          </div>
          <div class="row my-1">
            <div class="col-12">
              <input class="form-control" type="text" placeholder="Icon" v-model="newChore.icon">
            </div>
          </div>
          <div class="row my-1">
            <div class="col">
              <textarea class="input form-control" placeholder="Add description" v-model="newChore.description">
           </textarea>
            </div>
          </div>
          <div class="row my-1">
            <div class="col">
              <button class="btn btn-success" type="submit">Create Chore</button>
            </div>
          </div>
        </form>
      </div>
    </div>


    <!-- v-for chores -->
    <div class="row justify-content-center mt-1">
      <choreedit v-for="chore in chores" v-bind:chore="chore"></choreedit>

    </div>
  </div>

</template>

<script>
  import Choreedit from "@/components/choreedit.vue"
  import Navbar from "@/components/Navbar.vue"
  export default {
    name: "Chore",
    props: ["houseId"],
    data() {
      return {
        hideForm: true,

        newChore: {
          houseId: this.houseId,
          name: "",
          pointValue: Number,
          icon: "",
          description: "",
        }

      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('getChores', this.houseId)
    },
    methods: {
      createChore() {
        if (this.isAdmin) {
          this.$store.dispatch('createChore', this.newChore)
        }
      }

    },
    computed: {
      chores() {
        return this.$store.state.chores
      },
      isAdmin() {
        return this.$store.getters.isAdmin
      }

    },
    components: {
      Choreedit,
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