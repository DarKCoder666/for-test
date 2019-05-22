<template>
  <b-row class="auth-inner-wrap">
    <b-col class="auth-logo">
      <img src="~assets/images/auth_logo.svg" alt="LOGO">
    </b-col>
    <b-col class="auth-description">Введите ваш номер телефона</b-col>
    <b-col class="auth-input">
      <vue-tel-input
        v-model="phone"
        autocomplete="off"
        inputClasses="auth-input-phone"
        :enabledCountryCode="true"
        :disabledFormatting="true"
      ></vue-tel-input>
    </b-col>
    <b-col
      class="auth-description2"
    >На указанный номер будет отправлено СМС с кодом подтверждения номера.</b-col>
    <b-col class="auth-btn">
      <span>Продолжить</span>
    </b-col>
  </b-row>
</template>

<script>
import VueTelInput from "vue-tel-input";

export default {
  layout: "auth",
  components: {
    VueTelInput
  },
  data: function() {
    return {
      phone: ""
    };
  }
};
</script>

<style lang="scss">
.auth-inner-wrap {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

.auth-description {
  font-family: Roboto;
  font-size: 18px;
  line-height: 12px;
  color: #ffffff;
  margin-bottom: 53px;
}

.auth-description2 {
  font-family: Roboto;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px auto 53px;

  color: #ffffff;
}

.auth-input {
  .vue-tel-input {
    border: none;
  }

  .dropdown {
    padding: 0;

    &:hover {
      background-color: inherit;
    }
  }

  .dropdown-arrow {
    color: #fff;
    margin: 0 10px 0;
  }

  .country-code {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 24px;
    color: #fff;
    margin-left: 7px;
  }
}

.auth-btn {
  background: #ffffff;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  border-radius: 65px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.0357143em;
  text-transform: uppercase;
  color: #ff9800;
  padding: 20px;
  max-width: 270px;
  cursor: pointer;
}
</style>
