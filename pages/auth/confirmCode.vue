<template>
  <b-row class="auth-inner-wrap">
    <b-col class="auth-logo">
      <img src="~assets/images/auth_logo.svg" alt="LOGO">
    </b-col>
    <b-col class="auth-description">
      Введите код из СМС
    </b-col>
    <b-col class="auth-input-code">
      <b-form-input v-model="code" maxlength="4" />
    </b-col>
    <b-col class="auth-description2">
      Код действителен в течение 1 минуты
    </b-col>
    <b-col class="auth-btn" @click="confirmCode()">
      <span>Продолжить</span>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import '~/assets/scss/auth.scss';
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'auth'
})
export default class ConfirmCode extends Vue {
  code: string = '';

  confirmCode() {
    if (this.code.length !== 4) {
      alert('Код должен состоять из четырёх символов!');
      return;
    }

    this.$store.dispatch('auth/confirmCode', { code: this.code });
  }
};

</script>

<style>
</style>
