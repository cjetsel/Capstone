<template>
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

  </template>

  <script>
    export default {
      name: "ClaimedReward",
      props: ['reward'],
      data() {
        return {

        }

      },
      mounted() {
        this.$store.dispatch('getActiveHouse', this.reward.houseId);
        this.$store.dispatch('authenticate')
      },
      methods: {

      }
    }

  </script>