<template>
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
                <small class="mt-1" @click="hideAssign=!hideAssign">Assign</small>
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
    <div class="row justify-content-center" v-if="!hideAssign">
      <div class="col-11">
        <form @submit.prevent="assignChore(chore._id); hideAssign=!hideAssign">
          <div class="row justify-content-between my-1">
            <select class="form-control" id="memberId" v-model="assignedChore.memberId">
              <option v-for="member in members" v-bind:value="member._id">{{member.name}}
              </option>
            </select>
          </div>
          <div class="row my-1">
            <div class="col">
              <button class="btn btn-success" type="submit">Assign</button>
            </div>
          </div>
        </form>
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
              <input class="form-control" type="number" :placeholder="chore.pointValue"
                v-model="editedChore.pointValue">
            </div>
          </div>
          <div class="row my-1">
            <div class="col-12">
              <input class="form-control" type="text" :placeholder="chore.icon" v-model="editedChore.icon">
            </div>
          </div>
          <div class="row my-1">
            <div class="col">
              <textarea class="input form-control" :placeholder="chore.description" v-model="editedChore.description">
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
</template>
<script>
  export default {
    name: "Choreedit",
    props: ['chore'],
    data() {
      return {
        hideEdit: true,
        hideAssign: true,

        editedChore: {
          houseId: this.chore.houseId,
          name: "",
          pointValue: Number,
          icon: "",
          description: ""
        },
        assignedChore: {
          houseId: this.chore.houseId,
          memberId: ''
        }

      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.chore.houseId);
      // this.$store.dispatch('authenticate')
      // debugger
      // this.$store.dispatch('getChores', this.houseId)
    },
    methods: {

      deleteChore(choreId) {
        let data = {
          _id: choreId,
          houseId: this.chore.houseId
        }
        this.$store.dispatch('deleteChore', data)
      },
      editChore(choreId) {
        debugger
        let data = {
          _id: choreId,
          editedChore: this.editedChore
        }
        this.$store.dispatch('editChore', data)
      },
      assignChore(choreId) {
        debugger
        let data = {
          _id: choreId,
          editedChore: this.assignedChore,
          memberId: this.assignedChore.memberId
        }
        this.$store.dispatch('editChore', data)
      }


    },
    computed: {
      chores() {
        return this.$store.state.chores
      },
      isAdmin() {
        return this.$store.getters.isAdmin
      },
      house() {
        return this.$store.state.house
      },
      members() {
        return this.$store.state.members
      }


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