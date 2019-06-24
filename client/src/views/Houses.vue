<template>

  <!-- Pseudo code for walkthough -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        Choose a House to Enter:
      </div>
    </div>
    <div class="row">
      <div class="col-6 house height-25 mb-3" v-for="house in houses">
        <div class="row height-25 justify-content-center">
          <div class="col-10 align-self-center bg-transparent rounded">
            <router-link :to="{name: 'home', params: {houseId: house._id}}">
              <h5 @click="setActiveHouse(house._id)">
                <strong>{{house.name}}</strong></h5>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src


  export default {
    name: 'houses',
    components: {

    },
    computed: {
      house() {
        return this.$store.state.house
      },
      houses() {
        return this.$store.state.houses
      },
      user() {
        return this.$store.state.user
      }
      // users() {
      //   return this.$store.state.users
      // }
    },
    methods: {
      setActiveHouse(houseId) {
        this.$store.dispatch('getActiveHouse', houseId)
      }
    }
  }
</script>
<style>
  .height-25 {
    height: 25vw;
  }

  .house {
    background-image: url('../assets/house.png');
    background-size: 20vw;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    text-shadow: 0px 0px 3px #000;

  }
</style>