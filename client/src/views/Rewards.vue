<template>
  <div class="container-fluid">
    <navbar :houseId="this.houseId">
    </navbar>
    <div class="row">
      <form @submit.prevent="createReward">

        <div class="col-12">
          <input type="text" placeholder="Name" v-model="newReward.title">
          <input type="Number" placeholder="Cost" v-model="newReward.cost">
        </div>

        <div class="col-12">
          <textarea id="" cols="15" rows="3" placeholder="Description" v-model="newReward.description"></textarea>
          <button type="submit">Create</button>
        </div>

      </form>

    </div>

    <!-- <div class="row">
      list of all rewards
    </div>
    <div class="row">
      <div class="col-2">Notify Admin</div>
      <div class="col-10">Claimed By: Name</div>
    </div> -->
  </div>

</template>

<script>
  import Navbar from "@/components/Navbar.vue"
  export default {
    name: "Rewards",
    props: ["houseId"],
    data() {
      return {
        newReward: {
          title: "",
          description: "",
          cost: Number,
          houseId: this.houseId
        }
      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getRewards', this.houseId)
    },
    methods: {
      createReward() {

        this.$store.dispatch('createReward', this.newReward)
      }



    },
    computed: {
      rewards() {
        return this.$store.state.rewards
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