<template scoped>
  <div class="item">
    <nuxt-link v-bind:to="`/store/${shopID}`">
      <div class="item-header">
        <div class="item-logo">
          <img
            v-if="shopLogo"
            v-bind:src="imagesPrefixUrl + shopLogo"
          >
        </div>
        <div class="item-title">
          <p>{{shopName}}</p>
          <span>{{shopAddress}}</span>
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
          <p>{{info.barcode.title}}</p>
          <span>{{info.barcode.selling_price}}</span>
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
    },
    shopAddress() {
      if (this.info.barcode.storage && this.info.barcode.storage.shop) {
        return this.info.barcode.storage.shop.address;
      }

      return this.$store.state.items.currentShopInfo.address;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-top: 26px;
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
    font-size: 13px;
    line-height: 15px;
    color: #000000;
    margin-bottom: 0;
  }

  span {
    font-size: 12px;
    line-height: 14px;
    color: #bdbdbd;
  }
}

.item-body {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 164px;
  display: flex;
  align-items: flex-end;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
}

.item-info {
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  padding: 10px;

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #090909;
    margin: 0;
  }

  span {
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
}
</style>
