<template scoped>
  <b-container v-if="currentItem" class="item">
    <b-row class="item-inner-wrap">
      <b-col class="images-wrap">
        <item-images
          v-if="currentItem.barcode && currentItem.barcode.images"
          :images="currentItem.barcode.images"
        />
      </b-col>
      <b-col ref="infoWrap" class="info-wrap">
        <item-info :data="currentItem" :sizes="sizes" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ItemImages from '~/components/item/itemImages.vue';
import ItemInfo from '~/components/item/itemInfo.vue';

@Component({
  components: {
    ItemImages,
    ItemInfo
  }
})
export default class ItemShopID extends Vue {
  get currentItem() {
    return this.$store.state.items.currentItem;
  }
  get sizes() {
    let result;
    try {
      result = this.currentItem.barcode.category.sizes || [];
    } catch (e) {
      result = [];
    }

    if (result[0] && result[0].name === 'Кол-во') {
      result = [];
    }
    return result;
  }

  beforeCreate() {
    this.$store.dispatch('items/receiveItem', {
      itemID: this.$route.params.id,
      shopID: this.$route.params.shopID
    });
  }
}
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

<style lang="scss">
.checkout-modal {
  .modal-title {
    font-size: 14px;
    line-height: 24px;
    color: #909090;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;

    button {
      color: #909090;
      padding: 0;
      margin: -5px 0 0 0;
      font-size: 30px;
    }
  }
}
</style>
