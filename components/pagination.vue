<template>
  <b-pagination
    v-on:change="onPageChange"
    v-model="thisPage"
    :total-rows="pRows"
    v-bind:per-page="perPage"
  ></b-pagination>
</template>

<script>
export default {
  props: ["currentPage", "perPage", "rows"],

  data() {
    return {
      thisPage: this.currentPage
    };
  },

  computed: {
    pRows: function() {
      return this.rows;
    }
  },

  methods: {
    onPageChange(newPage) {
      this.$store.dispatch("items/changePage", { newPage });
    }
  }
};
</script>

<style>
</style>
