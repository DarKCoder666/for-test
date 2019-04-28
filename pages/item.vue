<template scoped>
  <b-container class="item">
    <b-row class="item-inner-wrap">
      <b-col class="images-wrap">
        <item-images></item-images>
      </b-col>
      <b-col class="info-wrap">
        <item-info></item-info>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ItemImages from "../components/item/itemImages";
import ItemInfo from "../components/item/itemInfo";

export default {
  components: {
    ItemImages,
    ItemInfo
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
  max-width: 45%;
  margin-right: 14px;

  @media screen and (max-width: $sm) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 24px;
  }
}

</style>
