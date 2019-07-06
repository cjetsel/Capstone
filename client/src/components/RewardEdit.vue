<template>
  <div class="col-11 btn btn-secondary">
    <div class="row h-12">

      <div class="col-2 points mx-1 p-0 align-content-center">
        <div class="row justify-content-center h-12">
          <div class="col-12 p-0 align-self-center">

          </div>
        </div>
      </div>

      <div class="col-8 align-self-center">{{reward.title}}</div>
    </div>
    <div class="row">
      <div class="col-2">
        <small class="mt-1">{{reward.cost}}</small>
      </div>
      <div class="col-5"></div>
      <div class="col-5">
        <div class="row h-12 justify-content-center">
          <div class="col-3 mx-1 p-0 align-content-center">
            <div class="row justify-content-center h-12">
              <div class="col-12 p-0 align-self-center">

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
          <div class="col-3 del mx-1 p-0 align-content-center" @click="deleteReward(reward._id)">
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
        <form @submit.prevent="editReward(reward._id); hideEdit=!hideEdit">
          <div class="row justify-content-between my-1">
            <div class="col-8">
              <input class="form-control" type="text" :placeholder="reward.title" v-model="editedReward.title">
            </div>
            <div class="col-3">
              <input class="form-control" type="Number" :placeholder="reward.cost" v-model="editedReward.cost">
            </div>
          </div>


          <div class="row my-1">
            <div class="col">
              <textarea class="input form-control" :placeholder="reward.description" v-model="editedReward.description">
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
    name: "RewardEdit",
    props: ['reward'],
    data() {
      return {
        hideEdit: true,
        hideAssign: true,

        editedReward: {
          houseId: this.reward.houseId,
          name: "",
          cost: Number,
          description: ""
        },


      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.reward.houseId);
      this.$store.dispatch('authenticate')


    },
    methods: {

      deleteReward(rewardId) {
        let data = {
          _id: rewardId,
          houseId: this.reward.houseId
        }
        this.$store.dispatch('deleteReward', data)
      },
      editReward(rewardId) {

        let data = {
          _id: rewardId,
          editedReward: this.editedReward
        }
        this.$store.dispatch('editReward', data)
      },
      // assignReward(choreId) {
      //   debugger
      //   let data = {
      //     _id: choreId,
      //     editedChore: this.assignedChore,
      //     memberId: this.assignedChore.memberId
      //   }
      //   this.$store.dispatch('editChore', data)
      // }


    },
    computed: {
      isAdmin() {
        return this.$store.getters.isAdmin
      },
      house() {
        return this.$store.state.house
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