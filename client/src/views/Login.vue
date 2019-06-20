<template>


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