<template>

  <!-- Pseudo code for walkthough -->
  <div class="container-fluid">
    <navbar :houseId="this.houseId">
    </navbar>
    <div class="row mt-5 justify-content-center">
      <div class="col-1">
        <router-link :to="{name: 'home', params: {houseId}}"><img class="back-img" src="../assets/backarrow.png">
        </router-link><small>Home</small>
      </div>
      <div class="col-11">
        <h3>{{house.name}} Settings</h3>
      </div>
    </div>
    <div class="row mb-2 justify-content-center">
      <div class="col-12">
        <div class="row" v-if="isAdmin">
          <div class="col-12">
            <h5>House Name: {{house.name}}</h5>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="row justify-content-center">
              Name: {{user.name}}
            </div>
            <div class="row justify-content-center">
              <form @submit.prevent="editUser(user._id)">
                <input type="text" placeholder="New Name" v-model="editMember.name">
                <input type="text" placeholder="icon" v-model="editMember.icon">
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
        <div class="row justify-content-center" v-if="isAdmin">
          <div class="col-12">
            <div class="row justify-content-center">
              <h5>Add New User to House:</h5>
            </div>
            <div class="row justify-content-center">
              <form class="form-row" @submit.prevent="addMember">
                <input type="text" v-model="newMember.email" placeholder="Member Email" class="form-control col-7">
                <button class="btn btn-success" type="submit">Add Member</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="isAdmin">
      <!-- v-for user in users -->
      <div class="col-12" v-for="member in members">
        <div class="row bg-primary my-1">
          <div class="col-1 bg-white border border-white"> <img class="button-img" src="../assets/pokeball.png" alt="">
          </div>
          <div class="col-10">
            <div class="row justify-content-between ">
              <div class="col">{{member.name}}</div>
              <div class="col-5">
                <div class="row h-12 justify-content-center">
                  <!-- <div class="col-3 assign mx-1 p-0 align-content-center">
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
                  </div> -->
                  <div class="col-3 del mx-1 p-0 align-content-center" @click="deleteMember(member._id)">
                    <div class="row justify-content-center h-12">
                      <div class="col-12 p-0 align-self-center">
                        <small class="align-self-center mt-1">Delete</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'settings',
    props: ['houseId'],
    data() {
      return {
        newMember: {
          email: "",
          houseId: this.houseId
        },
        editMember: {
          name: '',
          icon: ''
        },
        promote: {

        },
      }
    },
    mounted() {
      this.$store.dispatch('getActiveHouse', this.houseId);
      this.$store.dispatch('authenticate');
      this.$store.dispatch('getMembers', this.houseId)
    },
    computed: {
      house() {
        return this.$store.state.house
      },
      user() {
        return this.$store.state.user
      },
      members() {
        return this.$store.state.members
      },
      isAdmin() {
        return this.$store.getters.isAdmin
      }
    },
    methods: {
      addMember() {
        this.$store.dispatch('addMember', this.newMember)
      },
      deleteMember(memberId) {
        this.$store.dispatch('deleteMember', { _id: memberId, house: this.houseId })
      },
      editUser(memberId) {

        let data = {
          _id: memberId,
          name: this.editMember.name,
          icon: this.editMember.icon
        }
        this.$store.dispatch('editUser', data)
      }
    },
    components: {
      Navbar
    }
  }
</script>