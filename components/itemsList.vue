<template scoped>
  <b-container>
    <b-row>
      <b-col v-for="(item, index) in items" v-bind:key="item.id" cols="12" xs="12" sm="6" lg="4">
        <item-card v-bind:info="item" :ref="(index == items.length - 1) ? 'lastCard' : ''"></item-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ItemCard from "./itemCard";
import { domUtils } from '../utils/dom'
import { LIST_STORE, LIST_ALL } from '../keys/itemsKeys'

export default {
  components: { ItemCard },
  props: ['listType', 'storeID'],

  data() {
    return {};
  },

  computed: {
    items() {
      if (this.listType === LIST_ALL) {
        return this.$store.state.items.currentItems || [];
      } else if (this.listType === LIST_STORE) {
        return this.$store.state.items.currentStoreItems || [];
      }
    }
  },

  methods: {
    handleScroll(event) {
      const winOffset = window.pageYOffset || document.documentElement.scrollTop,
            clientHeight = document.documentElement.clientHeight,
            lastCardOffset = this.$refs.lastCard ? domUtils.getCords(this.$refs.lastCard[0].$el).top : 0;

      if(winOffset + clientHeight >= lastCardOffset - 200) {
        this.$store.dispatch(
          'items/loadMoreItems',
          {listType: this.listType, storeID: this.storeID}
        )
      }
    }
  },

  created() {
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
