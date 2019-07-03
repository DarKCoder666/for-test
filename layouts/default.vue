<template scoped>
  <div>
    <div class="header" :class="{'mobile-search-active' : mobile_search_state}">
      <b-container>
        <b-row>
          <b-col class="logo">
            <font-awesome-icon
              v-if="showArrow"
              class="arrow-left"
              :icon="['fas', 'arrow-left']"
              @click="goBack"
            />
            <nuxt-link to="/">
              UNO
            </nuxt-link>
          </b-col>
          <b-col class="logIn">
            <nuxt-link v-if="!loggedIn" to="/auth/login">
              Войти
            </nuxt-link>
            <nuxt-link v-else to="/auth/logout">
              Выйти
            </nuxt-link>
          </b-col>
          <b-col class="search-block-wrap">
            <b-input-group class="search-block">
              <b-input-group-prepend class="search-icon" @click="toggleSearchState()">
                <font-awesome-icon :icon="['fas', 'search']" />
              </b-input-group-prepend>
              <b-input-group-prepend class="search-input-wrap">
                <b-form-input
                  v-model="searchLine"
                  class="search-input"
                  placeholder="Найти товар"
                  @input="onSearchLineChange"
                />
              </b-input-group-prepend>
            </b-input-group>
          </b-col>

          <b-col v-if="loggedIn" class="orders">
            <nuxt-link to="/orders">
              Мои заказы
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { LIST_ALL } from '../keys/itemsKeys'

export default {
  data: () => ({
    mobile_search_state: false,
    searchLine: '',
    phone: null
  }),

  computed: {
    showArrow() {
      return this.$route.path !== '/'
    },
    ...mapState('auth', {
      loggedIn: state => state.loggedIn
    })
  },

  methods: {
    toggleSearchState() {
      this.mobile_search_state = !this.mobile_search_state
    },
    onSearchLineChange(newVal) {
      this.$router.push({
        path: '/'
      })
      this.$store.commit('items/resetPaginationStates')
      this.$store.commit('items/setSearchLine', {
        value: newVal,
        listType: LIST_ALL
      })
      this.$store.dispatch('items/loadMoreItems', { listType: LIST_ALL })
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.logIn,
.orders {
  color: #fff;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.arrow-left {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin-right: 12px;
  display: none;
  @media screen and (max-width: $lg) {
    display: block;
  }
}

.header {
  padding: 24px 0;
  background-color: #918ffe !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.12);

  @media screen and (max-width: $sm) {
    padding: 14px 0;
  }
}

@media screen and (max-width: $sm) {
  .mobile-search-active {
    .search-input-wrap {
      visibility: visible;
      width: 100% !important;
      opacity: 1;
    }

    .search-block {
      background-color: rgba(255, 255, 255, 0.4);
    }

    .logo {
      width: 0% !important;
      overflow: hidden;
      flex-grow: 0;
      padding: 0;
    }
  }
}

.logo {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  color: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  transition: 0.4s ease-in-out;

  @media screen and (max-width: $sm) {
    font-size: 20px;
  }
}

.search-block {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 21.5px;
  display: flex;
  align-items: center;
  max-width: 502px;
  margin-left: auto;
  display: flex;
  flex-wrap: nowrap;
  transition: 0.4s ease-in-out;

  @media screen and (max-width: $sm) {
    background-color: transparent;
    justify-content: flex-end;
  }
}

.search-input-wrap {
  visibility: visible;
  opacity: 1;
  display: inline-block;
  transition: 0.4s ease-in-out;
  width: 100%;

  @media screen and (max-width: $sm) {
    visibility: hidden;
    width: 0% !important;
    opacity: 0;
  }
}

.search-input {
  background-color: transparent;
  border: none;
  padding: 0;
  height: 17px;
  color: #fff;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    color: #fff;
    background-color: transparent;
    box-shadow: none;
  }
}

.search-icon {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 17px;
  margin: 13px;
}
</style>
