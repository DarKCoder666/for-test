<template>
  <items-list></items-list>
</template>

<script>
import ItemsList from "../components/itemsList";

export default {
  components: {
    ItemsList
  },

  beforeCreate() {
    this.$store.dispatch('items/receiveItems', {pageID: 0});
  }

};
</script>

<style>
</style>
