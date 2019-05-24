<template>
  <items-list :listType="listType"></items-list>
</template>

<script>
import ItemsList from "../components/itemsList";
import { LIST_ALL } from '../keys/itemsKeys'

export default {
  components: {
    ItemsList
  },

  data: function() {
    return {
      listType: LIST_ALL
    }
  },

  beforeCreate() {
    this.$store.commit("items/resetPaginationStates");
    this.$store.dispatch("items/loadMoreItems", { 
      listType: LIST_ALL,
     });
  }
};
</script>

<style>
</style>
