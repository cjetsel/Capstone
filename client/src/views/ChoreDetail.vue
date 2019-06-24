<template>
  <!-- Drunk chelsey decided to 'impart knowledge'
  enjoy brothers.
  container-fluid with
  row 2 col
  row col-12
  row textarea
  row button
  -->

  <div class="container-fluid">
    <form @submit.prevent="createChore">
      <div class="row justify-content-between my-1">
        <div class="col-8">
          <input class="form-control" type="text" placeholder="Chore Name" v-model="newChore.name">
        </div>
        <div class="col-3">
          <input class="form-control" type="number" placeholder="Points" v-model="newChore.value">
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


</template>

<script>
  export default {
    name: "choreDetail",
    data() {
      return {
        newChore: {
          name: "",
          value: "",
          icon: "",
          description: "",
        }
      }
    },
    methods: {
      createChore() {
        this.$store.dispatch('createChore', this.newChore)
      }
    },
    computed: {

    }
  }


</script>




<style>

</style>