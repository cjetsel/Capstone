<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-1">
        <router-link :to="{name: 'home', params: {houseId}}"><img class="back-img" src="../assets/backarrow.png">
        </router-link><small>Home</small>
      </div>
      <div class="col-11">
        <h1>Add a Chore</h1>

      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col my-1"><img class="chore-img" src="../assets/livingroom.png"><small>Living Room</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/bedroom.png"><small>Bedroom</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/kitchen.png"><small>Kitchen</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/bathroom.png"><small>Bathroom</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/yard.png"><small>Yard</small></div>
      <div class="col my-1"><img class="chore-img" src="../assets/misc.png"><small>Misc.</small></div>
    </div>
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
              <input class="form-control" type="number" placeholder="Points" v-model="newChore.pointValue">
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
    <div v-for="chore in chores" class="row justify-content-center mt-1">
      <div class="col-11 btn btn-secondary">
        <div class="row h-12">

          <div class="col-2 points mx-1 p-0 align-content-center">
            <div class="row justify-content-center h-12">
              <div class="col-12 p-0 align-self-center">

              </div>
            </div>
          </div>

          <div class="col-8 align-self-center">{{chore.name}}</div>
        </div>
        <div class="row">
          <div class="col-2">
            <small class="mt-1">{{chore.pointValue}}</small>
          </div>
          <div class="col-5"></div>
          <div class="col-5">
            <div class="row h-12 justify-content-center">
              <div class="col-3 assign mx-1 p-0 align-content-center">
                <div class="row justify-content-center h-12">
                  <div class="col-12 p-0 align-self-center">
                    <small class="mt-1">Assign</small>
                  </div>
                </div>
              </div>
              <div class="col-3 edit mx-1 p-0 align-content-center">
                <div class="row justify-content-center h-12">
                  <div class="col-12 p-0 align-self-center">
                    <small class="align-self-center mt-1" @click="hideEdit=!hideEdit">Edit</small>
                  </div>
                </div>
              </div>
              <div class="col-3 del mx-1 p-0 align-content-center" @click="deleteChore(chore._id)">
                <div class="row justify-content-center h-12">
                  <div class="col-12 p-0 align-self-center">
                    <small class="align-self-center mt-1">Delete</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="row justify-content-center" v-if="!hideEdit">
          <div class="col-11">
            <form @submit.prevent="editChore(chore._id); hideEdit=!hideEdit">
              <div class="row justify-content-between my-1">
                <div class="col-8">
                  <input class="form-control" type="text" :placeholder="chore.name" v-model="editedChore.name">
                </div>
                <div class="col-3">
                  <input class="form-control" type="N
                  umber" :placeholder="chore.pointValue" v-model="editedChore.pointValue">
                </div>
              </div>
              <div class="row my-1">
                <div class="col-12">
                  <input class="form-control" type="text" :placeholder="chore.icon" v-model="editedChore.icon">
                </div>
              </div>
              <div class="row my-1">
                <div class="col">
                  <textarea class="input form-control" :placeholder="chore.description"
                    v-model="editedChore.description">
                                       </textarea>
                </div>
              </div>
              <div class="row my-1">
                <div class="col">
                  <button class="btn btn-success" type="submit">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>




  </div>
  </div>
</template>

<script>
  export default {
    name: "Chore",
    props: ["houseId"],
    data() {
      return {
        hideForm: true,
        hideEdit: true,
        newChore: {
          houseId: this.houseId,
          name: "",
          pointValue: Number,
          icon: "",
          description: "",
        },
        editedChore: {
          houseId: this.houseId,
          name: "",
          pointValue: Number,
          icon: "",
          description: "",
        },

      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getChores', this.houseId)
    },
    methods: {
      createChore() {
        this.$store.dispatch('createChore', this.newChore)
      },
      deleteChore(choreId) {
        let data = {
          _id: choreId,
          houseId: this.houseId
        }
        this.$store.dispatch('deleteChore', data)
      },
      editChore(choreId) {

        let data = {
          _id: choreId,
          editedChore: this.editedChore
        }
        this.$store.dispatch('editChore', data)
      }

    },
    computed: {
      chores() {
        return this.$store.state.chores
      },

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