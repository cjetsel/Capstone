<template>
  <div class="container-fluid">
    <navbar :houseId="this.houseId" class="mt-3"></navbar>
    <div v-if="isAdmin">
      <!-- OPEN/HIDE FORM -->
      <div class="row justify-content-center mt-3">
        <button
          v-if="!hideForm"
          class="btn btn-primary col-10"
          @click="hideForm = !hideForm"
        >Hide Reward Creator</button>
        <button v-else class="btn btn-primary col-10 mb-2" @click="hideForm = !hideForm">Add Reward!</button>
      </div>
      <!-- REWARD FORM TO OPEN/HIDE -->
      <div class="row" v-if="!hideForm">
        <div class="col">
          <form class="align-self-center" @submit.prevent="createReward(); hideForm=!hideForm">
            <div class="col-12">
              <input
                type="text"
                class="form-control mt-1"
                placeholder="Name"
                v-model="newReward.title"
              />
              <input
                type="Number"
                class="form-control my-1"
                placeholder="Cost"
                v-model="newReward.cost"
              />
            </div>

            <div class="col-12">
              <textarea
                class="form-control mb-1"
                id
                cols="15"
                rows="3"
                placeholder="Description"
                v-model="newReward.description"
              ></textarea>
              <button class="btn btn-success" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>

      <div class="row">
        <reward-edit v-for="reward in rewards" v-bind:reward="reward"></reward-edit>
      </div>
    </div>
    <div v-else>
      Claim Rewards!
      <div>Available</div>
      <div v-for="reward in rewards" class="col-11 btn btn-secondary">
        <div class="row h-12">
          <div class="col-2 points mx-1 p-0 align-content-center">
            <div class="row justify-content-center h-12">
              <div class="col-12 p-0 align-self-center"></div>
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
                    <button @click="claimReward(reward._id)">Claim</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        Claimed Rewards
        <div v-for="claimedReward in claimedRewards">
          <div>{{claimedReward.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import RewardEdit from "@/components/RewardEdit.vue";
export default {
  name: "Rewards",
  props: ["houseId"],
  data() {
    return {
      hideForm: true,
      newReward: {
        title: "",
        description: "",
        cost: Number,
        houseId: this.houseId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getActiveHouse", this.houseId);
    this.$store.dispatch("authenticate");
    this.$store.dispatch("getRewards", this.houseId);
    this.$store.dispatch("getRewardsByUserId", this.user._id);
  },
  methods: {
    createReward() {
      this.$store.dispatch("createReward", this.newReward);
    },
    claimReward(id) {
      this.$store.dispatch("claimReward", id);
    }
  },
  computed: {
    rewards() {
      return this.$store.state.rewards;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    user() {
      return this.$store.state.user;
    },
    claimedRewards() {
      return this.$store.state.claimedRewards;
    }
  },
  components: {
    Navbar,
    RewardEdit
  }
};
</script>

<style>
.back-img {
  width: 3vh;
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