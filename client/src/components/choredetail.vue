<template>

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
          assignedChore: this.assignedChore
        }
        this.$store.dispatch('assignChore', data)
      },


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