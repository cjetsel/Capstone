<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">Create New House</div>

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
      <div class="col-12">To Join Existing House Notify Administrator</div>
      <button @click="logout()" class="btn btn-danger rounded-circle" type="button"> <img class="button-img"
          src="../assets/pokeball.png" alt=""></button>
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
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>