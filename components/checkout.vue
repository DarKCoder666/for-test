<template>
  <div class="checkout">
    <h1 class="checkout-title">
      Оформление заказа
    </h1>

    <div class="checkout-back">
      <font-awesome-icon class="arrow-left" :icon="['fas', 'chevron-left']" @click="back" />
      <span>Вернуться к товару</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Checkout extends Vue {
  back() {
    this.$router.back()
  }

  get cart() {
    return this.$store.state
  }
}
</script>
