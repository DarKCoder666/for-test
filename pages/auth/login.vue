<template>
  <b-row class="auth-inner-wrap">
    <b-col class="auth-logo">
      <img src="~assets/images/auth_logo.svg" alt="LOGO">
    </b-col>
    <b-col class="auth-description">Введите ваш номер телефона</b-col>
    <b-col class="auth-input">
      <vue-tel-input
        v-model="phone.number"
        autocomplete="off"
        inputClasses="auth-input-phone"
        wrapperClasses="input-tel-wrap"
        placeholder
        :enabledCountryCode="true"
        :disabledFormatting="true"
        @onInput="onInput"
      ></vue-tel-input>
    </b-col>
    <b-col class="auth-description2">
      На указанный номер будет отправлено СМС
      <br>с кодом подтверждения номера.
    </b-col>
    <b-col class="auth-btn" @click="sendCode()">
      <span>Продолжить</span>
    </b-col>
  </b-row>
</template>

<script>
import VueTelInput from "vue-tel-input";
import "~/assets/scss/auth.scss";

export default {
  layout: "auth",
  components: {
    VueTelInput
  },
  data: function() {
    return {
      phone: {
        number: "",
        isValid: false,
        countryCode: undefined
      }
    };
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.phone.number = number;
      this.phone.isValid = isValid;
      this.phone.countryCode= country.dialCode;
    },
    sendCode() {
      if(!this.phone.isValid) {
        alert('Номер телефона не валидный! Попробуйте ещё раз.');
        return;
      }
      const phoneNumber = '+' + this.phone.countryCode + this.phone.number

      this.$store.dispatch('auth/sendCode', {phone: phoneNumber})
    }
  }
};
</script>
