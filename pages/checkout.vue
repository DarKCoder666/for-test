<template scoped>
  <b-container>
    <div class="checkout">
      <h1 class="checkout__title">
        Оформление заказа
      </h1>

      <div class="checkout__back" @click="goBack">
        <font-awesome-icon class="arrow-left" :icon="['fas', 'chevron-left']" />
        <span>Вернуться к товару</span>
      </div>

      <div class="checkout__inner-wrap">
        <table class="checkout__table">
          <thead>
            <tr>
              <th>Наименование и описание</th>
              <th>Количество</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="index">
              <td>
                <div class="checkout__item-wrap checkout__border-bottom">
                  <div class="checkout__item-img">
                    <img :src="imagesPrefixUrl + item.imgUrl" alt="Image">
                  </div>

                  <div class="checkout__item-info">
                    <p class="checkout__shop-name">
                      {{ item.shopName }}
                    </p>
                    <p class="checkout__item-name">
                      {{ item.title }}
                    </p>
                    <div v-if="item.currentSize && item.currentSize.name" class="checkout__sizes">
                      <span>{{ item.currentSize.name }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <td class="checkout__amount">
                <div>{{ item.amount }}</div>
              </td>
              <td class="checkout__price">
                <div>{{ item.price }} c</div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="checkout__footer" :class="{'align-right': loggedIn}">
          <div v-if="!loggedIn && !isCodeSent" class="checkout__phone auth-input auth-input-black">
            <p class="checkout__phone-title">
              Введите свой номер телефона для оформления заказа
            </p>
            <div class="checkout__phone-wrap">
              <vue-tel-input
                v-model="phone.number"
                autocomplete="off"
                input-classes="auth-input-phone"
                wrapper-classes="input-tel-wrap"
                placeholder
                :enabled-country-code="true"
                :disabled-formatting="true"
                @input="onInput"
              />
              <div class="checkout__btn" @click="sendCode">
                Выслать
              </div>
            </div>
            <p
              class="checkout__phone-description"
            >
              Вам будет выслано уведомление по смс о подтверждении заказа
            </p>
          </div>

          <div v-if="!loggedIn && isCodeSent" class="checkout__confirm">
            <p class="checkout__phone-title">
              Введите код подтверждения
            </p>
            <div class="checkout__confirm-wrap auth-input-code">
              <b-form-input v-model="code" class="checkout__confirm-input" maxlength="4" />
              <div class="checkout__btn" @click="confirmCode">
                Подтвердить
              </div>
            </div>
            <p class="checkout__phone-description">
              Код действителен в течение 1 минуты
            </p>
          </div>

          <div class="checkout__buy">
            <div class="checkout__buy-title">
              Общая сумма:
              <span v-if="cart[0]">{{ cart[0].price }} c</span>
            </div>
            <div class="checkout__buy-btn" :class="{disabled: !loggedIn}" @click="makeOrder">
              ЗАКАЗАТЬ
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VueTelInput from 'vue-tel-input'
import { links } from '~/settings/links'

@Component({
  components: {
    VueTelInput
  },
  middleware: ['checkoutMiddleware']
})
export default class Checkout extends Vue {
  imagesPrefixUrl: string | null = links.imagesPrefixUrl
  code: string = ''
  phone = {
    number: '',
    isValid: false,
    countryCode: undefined
  }
  isCodeSent: boolean = false

  destroyed() {
    this.$store.commit('order/cleanCart')
  }

  get cart() {
    return this.$store.state.order.cart
  }

  get loggedIn() {
    return this.$store.state.auth.loggedIn
  }

  goBack() {
    this.$router.back()
  }

  onInput(value, { number, isValid, country }) {
    this.phone.number = number
    this.phone.isValid = isValid
    this.phone.countryCode = country.dialCode
  }

  sendCode() {
    if (!this.phone.isValid) {
      alert('Номер телефона не валидный! Попробуйте ещё раз.')
      return
    }
    const phoneNumber = '+' + this.phone.countryCode + this.phone.number

    this.$store.dispatch('auth/sendCode', {
      phone: phoneNumber,
      redirect: false
    })
    this.isCodeSent = true
  }

  confirmCode() {
    if (this.code.length !== 4) {
      alert('Код должен состоять из четырёх символов!')
      return
    }

    this.$store.dispatch('auth/confirmCode', {
      code: this.code,
      redirect: false
    })
  }

  makeOrder() {
    if (!this.loggedIn) return
    this.$store.dispatch('order/makeOrder')
  }
}
</script>

<style lang="scss" scoped>
.checkout {
  &__title {
    margin: 42px 0 0;
    padding-bottom: 30px;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
    border-bottom: 1px solid #e1e1e1;
  }

  &__back {
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
    margin: 24px 0 40px;
    cursor: pointer;

    span {
      margin-left: 10px;
    }
  }

  &__inner-wrap {
    background: #ffffff;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding-bottom: 20px;
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    overflow: overlay;

    thead {
      border-bottom: 1px solid #e1e1e1;
      th {
        padding: 24px;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.43);
        font-weight: normal;
      }
    }

    tbody {
      td {
        padding: 24px;
        box-sizing: border-box;
      }
    }
  }

  &__item-wrap {
    display: flex;
  }

  &__item-img {
    img {
      width: 90px;
      height: 90px;
      object-fit: contain;
    }
  }

  &__item-info {
    margin-left: 24px;
  }

  &__shop-name {
    font-size: 12px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.6);
    margin: 0;
  }

  &__item-name {
    font-size: 14px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.87);
    margin: 0;
  }

  &__sizes {
    span {
      font-size: 12px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.87);
      border: 1px solid #ccc;
      box-sizing: border-box;
      border-radius: 6px;
      padding: 1px 7px;
      text-transform: uppercase;
    }
  }

  &__footer {
    margin: 24px;
    padding-top: 15px;
    border-top: 1px solid #e1e1e1;
    display: flex;
    justify-content: space-between;

    &.align-right {
      justify-content: flex-end;
    }

    @media screen and (max-width: $md) {
      flex-direction: column;
    }
  }

  &__phone-title {
    margin: 0 0 11px;
    font-size: 12px;
    line-height: 15px;
    color: rgba(0, 0, 0, 0.87);
  }

  &__phone-wrap {
    display: flex;

    @media screen and (max-width: $md) {
      flex-direction: column;
    }
  }

  &__btn {
    padding: 10px;
    background: $orange;
    color: #fff;
    margin-left: 15px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: $md) {
      margin-left: 0;
      margin-top: 15px;
    }
  }

  &__phone-description {
    font-size: 12px;
    line-height: 15px;
    color: rgba(0, 0, 0, 0.43);
    margin-top: 8px;
  }

  &__confirm-wrap {
    display: flex;

    .checkout__confirm-input {
      border-bottom: 2px solid #e1e1e1 !important;
      color: #000 !important;
      max-width: 220px;
    }
  }

  &__buy {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__buy-title {
    font-size: 14px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 24px;
    text-align: right;

    span {
      font-size: 18px;
      line-height: 24px;
      color: $orange;
    }
  }

  &__buy-btn {
    padding: 17px;
    width: 212px;
    color: #fff;
    background-color: $orange;
    text-align: center;
    cursor: pointer;

    &.disabled {
      color: rgba(255, 255, 255, .5);
      background-color: #D0D0D0;
    }

    @media screen and (max-width: $md) {
      width: 100%;
    }
  }
}
</style>
