<template>
  <b-modal id="checout-modal" modal-class="checkout-modal" title="Покупка товара" @show="show">
    <div class="checkout-items">
      <cart-item :item="item" />
    </div>
    <div slot="modal-footer">
      <div class="chechout-footer" @click="acceptOrder">
        Оформить заказ
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CartItem from '~/components/cart/cartItem.vue'

@Component({
  components: {
    CartItem
  }
})
export default class CartModal extends Vue {
  @Prop()
  canShowModal!: boolean

  @Prop()
  item!: object

  show(this: any, bvModalEvt: any) {
    this.$emit('show')

    if (!this.canShowModal) {
      bvModalEvt.preventDefault()
    }
  }

  acceptOrder() {
    this.$store.commit('order/addToCart', this.item)
    this.$router.push('/checkout')
  }
}
</script>

<style lang="scss">
.checkout-modal {
  .modal-footer {
    font-size: 14px;
    line-height: 16px;
    background-color: $orange;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    border: none;
    justify-content: center;
    margin-top: 30px;
    padding: 0;

    div {
      width: 100%;
    }
  }

  .chechout-footer {
    padding: 17px;
    cursor: pointer;
  }

  .modal-content {
    border: none;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
