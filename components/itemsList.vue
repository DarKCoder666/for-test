<template scoped>
  <b-container>
    <b-row>
      <b-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <item-card :ref="(index == items.length - 1) ? 'lastCard' : ''" :info="item" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { domUtils } from '../utils/dom';
import { LIST_STORE, LIST_ALL } from '../keys/itemsKeys';
import ItemCard from './itemCard.vue';

@Component({
  components: {
    ItemCard
  }
})
export default class ItemsList extends Vue {
  @Prop()
  listType!: string;

  @Prop()
  storeID!: string;

  get items() {
    if (this.listType === LIST_ALL) {
      return this.$store.state.items.currentItems || [];
    } else if (this.listType === LIST_STORE) {
      return this.$store.state.items.currentStoreItems || [];
    }
  }

  handleScroll() {
    const winOffset = window.pageYOffset || document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const lastCardOffset = this.$refs.lastCard
      ? domUtils.getCords(this.$refs.lastCard[0].$el).top
      : 0;

    if (winOffset + clientHeight >= lastCardOffset - 200) {
      this.$store.dispatch('items/loadMoreItems', {
        listType: this.listType,
        storeID: this.storeID
      });
    }
  }

  created() {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
