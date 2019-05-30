<template scoped>
  <div class="item">
    <nuxt-link v-bind:to="`/store/${shopID}`">
      <div class="item-header">
        <div class="item-logo" v-bind:class="{'default-logo': !shopLogo}">
          <img
            v-if="shopLogo"
            v-bind:src="imagesPrefixUrl + shopLogo"
          >
        </div>
        <div class="item-title">
          <p>{{shopName}}</p>
        </div>
      </div>
    </nuxt-link>

    <nuxt-link v-bind:to="`/item/${shopID}/${info.id}`">
      <div class="item-body">
        <img
          v-if="info.barcode.images[0]"
          v-bind:src="imagesPrefixUrl + info.barcode.images[0]"
          class="item-bg"
        >
        <div class="item-info">
          <div class="item-info-inner-wrap">
            <p>{{info.barcode.title}}</p>
            <span>{{info.barcode.selling_price}} с</span>
          </div>
          <p class="item-info-description">{{info.barcode.description}}</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { links } from "../settings/links";

export default {
  props: ["info"],
  data: function() {
    return {
      imagesPrefixUrl: links.imagesPrefixUrl
    };
  },
  computed: {
    shopLogo() {
      if (this.info.barcode.storage && this.info.barcode.storage.shop) {
        return this.info.barcode.storage.shop.icon;
      }

      return this.$store.state.items.currentShopInfo.icon;
    },
    shopID() {
      if (this.info.barcode.storage && this.info.barcode.storage.shop) {
        return this.info.barcode.storage.shop.id;
      }

      return this.$store.state.items.currentShopInfo.id;
    },
    shopName() {
      if (this.info.barcode.storage && this.info.barcode.storage.shop) {
        return this.info.barcode.storage.shop.name;
      }

      return this.$store.state.items.currentShopInfo.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-top: 26px;
  padding: 9px;
  transition: all .3s ease-in-out;
  
  &:hover {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  }
}

.default-logo {
  width: 41px;
  height: 41px;
  background: #999;
}

.item-header {
  display: flex;
  margin-bottom: 10px;
}

.item-logo {
  border-radius: 50%;
  margin-right: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #cfcfcf;
  overflow: hidden;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
}

.item-title {
  justify-content: center;
  display: flex;
  flex-direction: column;

  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    margin-bottom: 0;
  }
}

.item-body {
  position: relative;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    z-index: -1;
  }
}

.item-info {
  width: 100%;
  padding: 10px 0;
  color: #090909;

  &-inner-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: normal
  }

  &-description {
    font-size: 12px;
    line-height: 14px;
    color: #BDBDBD;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    text-transform: capitalize;
    margin: 0;
  }

  span {
    font-size: 13px;
    line-height: 15px;
    text-align: right;
  }
}
</style>
