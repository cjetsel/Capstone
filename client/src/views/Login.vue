<template>
  <div class="login container-fluid mt-5">
    <div class="row mb-3">
      <div class="col">
        <h1>Choremander</h1>
      </div>
    </div>
    <div v-if="loginForm" class="row mb-3">
      <div class="col">
        <img src="../assets/charmander.png" alt="Choremander">
      </div>
      <div class="col-12 mb-3">
        <h6>demo mode</h6>
      </div>
      <div class="col-12">
        <div class="row justify-content-center">
          <form @submit.prevent="loginUser">
            <div class="col-12">
              <input class="form-control mb-3" type="text" placeholder="Username" v-model="creds.username">
              <input class="form-control mb-3" type="text" placeholder="Password" v-model="creds.password">
            </div>
            <div class="col">
              <button class="btn btn-danger rounded-circle" type="submit"> <img class="button-img"
                  src="../assets/pokeball.png" alt=""></button>
            </div>
          </form>

        </div>
      </div>
    </div>
    <div v-else class="row justify-content-center">
      <form @submit.prevent="register">
        <div class="col-12 align-content-center">
          <h6>Choose an avatar:</h6>
          <img class="button-img" src="../assets/pokeball.png" alt="" v-model="newUser.icon">
          <img class="button-img" src="../assets/pokeball.png" alt="" v-model="newUser.icon">
          <img class="button-img" src="../assets/pokeball.png" alt="" v-model="newUser.icon">
          <img class="button-img" src="../assets/pokeball.png" alt="" v-model="newUser.icon">
          <img class="button-img" src="../assets/pokeball.png" alt="" v-model="newUser.icon">
          <img class="button-img" src="../assets/pokeball.png" alt="" v-model="newUser.icon">
          <br>
          <br>
          <!-- this is a temporary break -->
          <input class="form-control mb-3" type="text" placeholder="Your Name" v-model="newUser.name">
          <input class="form-control mb-3" type="text" placeholder="Username" v-model="newUser.username">
          <input class="form-control mb-3" type="text" placeholder="Email" v-model="newUser.email">
          <input class="form-control mb-3" type="text" placeholder="Password" v-model="newUser.password">
        </div>
        <div class="col">
          <button class="btn btn-danger rounded-circle" type="submit"> <img class="button-img"
              src="../assets/pokeball.png" alt=""></button>
        </div>
      </form>

    </div>
    <div class="row mt-3 action" @click="loginForm = !loginForm">
      <div class="col-12">
        <h6 v-if="loginForm">Not registered? Click here to create a user!</h6>
        <h6 v-else>Already registered? Click here to log in!</h6>
      </div>
    </div>
  </div>
  </div>
  </div>

  </div>

</template>


<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          username: "",
          password: ""
        },
        newUser: {
          email: "",
          icon: "",
          name: "",
          username: "",
          password: ""
        }
      }
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser)
      },
      loginUser() {
        this.$store.dispatch("login", this.creds)
      }
    }
  }
</script>