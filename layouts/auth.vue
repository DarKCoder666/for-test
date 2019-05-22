<template scoped>
  <div class="auth">
    <div class="header">
      <b-container>
        <b-row>
          <b-col class="logo">
            <nuxt-link to="/">UNO</nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="auth-page">
      <b-container>
        <nuxt/>
      </b-container>
    </div>
  </div>
</template>

<script>
import VueTelInput from "vue-tel-input";

export default {};
</script>

<style lang="scss" scoped>
.header {
  padding: 24px 0;
  background-color: #918ffe !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.12);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; 
  @media screen and (max-width: $sm) {
    padding: 14px 0;
  }
}

.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~assets/images/auth_bg.svg");
  background-size: cover;
  background-position: center 0;
  min-height: 100vh;
}

.auth-page {

}

@media screen and (max-width: $sm) {
  .logo {
    width: 0% !important;
    overflow: hidden;
    flex-grow: 0;
    padding: 0;
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
</style>
