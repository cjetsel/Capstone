<template>
  <div>
    <div v-for="chore in myChores">
      {{chore.name}}
    </div>

  </div>


</template>



<script>
  export default {
    name: "memberChores",
    props: ['houseId', 'userId'],
    //     data() {
    //       return {
    // name:
    //       }
    //     },
    mounted() {
      this.$store.dispatch('getChores', this.houseId)

    },
    computed: {
      user() {
        return this.$store.state.user
      },
      chores() {
        return this.$store.state.chores
      },
      myChores() {
        debugger
        return this.chores.filter(c => c.memberId == this.userId)
      }

    },


  }






</script>