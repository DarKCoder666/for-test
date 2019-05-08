<template scoped>
  <div>
    <div class="header">
      <b-container>
        <b-row class="header-inner-wrap">
          <div class="logo tempLogo">
            <img v-bind:src="imagesPrefixUrl + shopInfo.icon" alt>
          </div>

          <div class="info">
            <h1>{{shopInfo.name}}</h1>
            <p>Официальный магазин</p>
            <span>{{shopInfo.address}} {{shopInfo.phone}}</span>
          </div>
        </b-row>
      </b-container>
    </div>

    <categories-filter></categories-filter>

    <items-list></items-list>
  </div>
</template>

<script>
import ItemsList from "../../components/itemsList";
import CategoriesFilter from "../../components/categoriesFilter";
import { mapState } from "vuex";
import { links } from "../../settings/links";

export default {
  components: {
    ItemsList,
    CategoriesFilter
  },

  data: function() {
    return {
      imagesPrefixUrl: links.imagesPrefixUrl
    };
  },

  computed: {
    ...mapState({
      shopInfo: state => state.items.currentShopInfo
    })
  },

  beforeCreate() {
    this.$store.commit("items/resetPage");
    this.$store.dispatch("items/receiveStoreItems", {
      storeID: this.$route.params.storeID
    });
    this.$store.dispatch("items/receiveShopInfo", {
      storeID: this.$route.params.storeID
    });
    // this.$store.dispatch("items/resetPage");
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 39px 0 33px;
  // background: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%),
  //   url(~assets/images/storeBG.png);
  background-color: #444;
  background-position: right bottom;
  background-size: cover;

  @media screen and (max-width: $sm) {
    padding: 60px 16px 37px;
  }
}

.header-inner-wrap {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 15px;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
}

// Remove when api will be connected!
.tempLogo {
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.info {
  h1 {
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
    color: #ffffff;
    margin: 0;

    @media screen and (max-width: $sm) {
      font-size: 20px;
      line-height: 23px;
    }
  }

  p {
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin: 0;

    @media screen and (max-width: $sm) {
      font-size: 16px;
      line-height: 19px;
    }
  }

  span {
    font-size: 13px;
    line-height: 15px;
    color: #bdbdbd;

    @media screen and (max-width: $sm) {
      font-size: 13px;
      line-height: 15px;
    }
  }
}
</style>