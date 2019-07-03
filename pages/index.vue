<template>
  <items-list :list-type="listType" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { LIST_ALL } from '../keys/itemsKeys';
import ItemsList from '~/components/itemsList.vue';

@Component({
  components: {
    ItemsList
  }
})
export default class Home extends Vue {
  listType = LIST_ALL;

  beforeCreate() {
    this.$store.commit('items/resetPaginationStates');
    this.$store.dispatch('items/loadMoreItems', {
      listType: LIST_ALL
    });
  }
}
</script>
