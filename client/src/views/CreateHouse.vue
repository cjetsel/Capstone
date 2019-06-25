<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">Add New House</div>

    </div>
    <div class="row">
      <form @submit.prevent="addHouse">
        <input type="text" placeholder="House Name" class="form-control" v-model="newHouse.name">
        <button class="btn btn-danger rounded-circle" type="submit"> <img class="button-img"
            src="../assets/pokeball.png" alt=""></button>
      </form>
    </div>
    <div class="row mt-5 mb-5">
      <div class="col">
        OR
      </div>
    </div>
    <div class="row">
      <div class="col-12">Join Existing House</div>
      <router-link :to="{name:'home'}"> <button class="btn btn-primary">homeview</button></router-link>
    </div>

    <!-- <div class="row">
      <form>
        <input type="text" placeholder="Admin Email" class="form-control" v-model="existingHouse.email">
        <button class="btn btn-danger rounded-circle" type="submit"> <img class="button-img"
            src="../assets/pokeball.png" alt=""></button>
      </form>
    </div> -->
  </div>
</template>

<script>
  // @ is an alias to /src

  import router from '@/router.js'
  export default {
    name: 'createHouse',
    data() {
      return {
        newHouse: {
          name: ""
        },
        existingHouse: {
          email: ""
        }
      }
    },
    components: {

    },
    methods: {
      addHouse() {
        let data = {
          name: this.newHouse.name
        }
        this.$store.dispatch('addHouse', data)
      },
    }
  }
</script>