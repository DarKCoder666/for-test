<template scoped>
  <b-container class="item">
    <b-row class="item-inner-wrap">
      <b-col class="images-wrap">
        <item-images v-if="data.barcode && data.barcode.images" v-bind:images="data.barcode.images"></item-images>
      </b-col>
      <b-col class="info-wrap">
        <item-info v-bind:data="data"></item-info>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ItemImages from "../../../components/item/itemImages";
import ItemInfo from "../../../components/item/itemInfo";

export default {
  components: {
    ItemImages,
    ItemInfo
  },

  computed: {
    data: function() {
      return this.$store.state.items.currentItem;
    }
  },

  beforeCreate() {
    this.$store.dispatch("items/receiveItem", {
      itemID: this.$route.params.id,
      shopID: this.$route.params.shopID
    });
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin: 20px auto;
}

.item-inner-wrap {
  @media screen and (max-width: $sm) {
    flex-direction: column;
  }
}

.images-wrap {
  align-self: flex-start;
  max-width: 45%;
  margin-right: 14px;

  @media screen and (max-width: $sm) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 24px;
  }
}
</style>
