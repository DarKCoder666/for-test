<template scoped>
  <div>
    <div v-if="shopInfo" class="header">
      <b-container>
        <b-row class="header-inner-wrap">
          <div class="logo tempLogo">
            <img v-if="shopInfo.icon" v-bind:src="imagesPrefixUrl + shopInfo.icon" alt>
          </div>

          <div class="info">
            <h1>{{shopInfo.name}}</h1>
            <p>Официальный магазин</p>
            <span>{{shopInfo.address}} {{shopInfo.phone}}</span>
          </div>
        </b-row>
      </b-container>
    </div>

    <div v-if="loggedIn" class="subscribe">
      <b-container class="subscribe-container">
        <div v-if="shopInfo.sub" class="subscribe-text">
          <font-awesome-icon class="arrow-left" :icon="['fas', 'heart']"/>
          ВЫ ПОДПИСАННЫ
        </div>

        <div v-else class="subscribe-text" @click="subscribe">
          <img src="~/assets/images/heart.svg" alt="img">
          ПОДПИСАТЬСЯ
        </div>

        <div class="subscribe-current">
          122
          <font-awesome-icon class="arrow-left" :icon="['fas', 'heart']"/>
        </div>
      </b-container>
    </div>

    <!-- <categories-filter></categories-filter> -->

    <items-list :listType="listType" :storeID="$route.params.storeID"></items-list>
  </div>
</template>

<script>
import ItemsList from "../../components/itemsList";
import CategoriesFilter from "../../components/categoriesFilter";
import { mapState, mapActions } from "vuex";
import { links } from "../../settings/links";
import { LIST_STORE } from "../../keys/itemsKeys";

export default {
  components: {
    ItemsList
    // CategoriesFilter
  },

  data: function() {
    return {
      imagesPrefixUrl: links.imagesPrefixUrl,
      listType: LIST_STORE
    };
  },

  computed: {
    ...mapState({
      shopInfo: state => state.items.currentShopInfo,
      loggedIn: state => state.auth.loggedIn
    })
  },

  methods: {
    subscribe() {
      this.$store.dispatch("items/subscribeStore")
    }
  },

  beforeCreate() {
    this.$store.commit("items/resetPaginationStates");
    this.$store.dispatch("items/loadMoreItems", {
      listType: LIST_STORE,
      storeID: this.$route.params.storeID
    });
    this.$store.dispatch("items/receiveShopInfo", {
      storeID: this.$route.params.storeID
    });
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
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
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

.subscribe {
  background: #918ffe;
  padding: 10px 0;

  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-items: center;
    }
  }

  &-text {
    font-family: Roboto;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.11em;
    color: #ffffff;

    img {
      margin-right: 8px;
    }

    svg {
      margin-right: 4px;
    }
  }

  &-current {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.11em;
  
    svg {
      margin-left: 4px;
    }
  }
}
</style>