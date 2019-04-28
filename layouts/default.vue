<template scoped>
  <div>
    <div class="header" v-bind:class="{'mobile-search-active' : mobile_search_state}">
      <b-container>
        <b-row>
          <b-col class="logo">
            <nuxt-link to="/">OLA</nuxt-link>
          </b-col>
          <b-col class="search-block-wrap">
            <b-input-group class="search-block">
              <b-input-group-prepend class="search-icon" v-on:click="toggleSearchState()">
                <font-awesome-icon :icon="['fas', 'search']"/>
              </b-input-group-prepend>
              <b-input-group-prepend class="search-input-wrap">
                <b-form-input class="search-input" placeholder="Найти товар"></b-form-input>
              </b-input-group-prepend>
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <nuxt/>

  </div>
</template>

<script>
export default {
  data: () => ({
    mobile_search_state: false
  }),

  methods: {
    toggleSearchState() {
      this.mobile_search_state = !this.mobile_search_state;
    }
  }
};
</script>

<style lang="scss" scoped>
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
