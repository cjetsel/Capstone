<template>
  <div class="container-fluid">
    <navbar :houseId="this.houseId">
    </navbar>
    <div class="row">
      rewards
    </div>
    <div class="row">
      <div class="col-2">point notify</div>
      <div class="col-10">chore assigned to : name</div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue"
  export default {
    name: "Rewards",
    props: ["houseId"],
    data() {
      return {

      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('authenticate')
    },
    methods: {


    },
    computed: {


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