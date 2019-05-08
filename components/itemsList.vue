<template scoped>
  <b-container>
    <b-row>
      <b-col v-for="item in items" v-bind:key="item.id" cols="12" xs="12" sm="6" lg="4">
        <item-card v-bind:info="item"></item-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="pagination">
        <pagination v-bind:currentPage="currentPage" v-bind:perPage="perPage" v-bind:rows="rows"></pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ItemCard from "./itemCard";
import Pagination from "./pagination";

export default {
  data() {
    return {};
  },

  computed: {
    currentPage: function() {
      return this.$store.state.items.currentPage + 1;
    },
    perPage: function() {
      return this.$store.state.items.itemsPerPage;
    },
    rows: function() {
      return this.$store.state.items.totalItems;
    },
    items() {
      return this.$store.state.items.currentItems || [];
    }
  },

  components: { ItemCard, Pagination }
};
</script>

<style lang="scss" scoped>

.pagination {
  margin: 20px auto;
}

</style>
