<template>
  <div class="cart">
    <div class="cart__img">
      <img :src="imagesPrefixUrl + item.imgUrl" alt="Item">
    </div>
    <div class="cart__info">
      <div class="cart__shop-name">
        {{ item.shopName }}
      </div>
      <div class="cart__title-wrap">
        <div class="cart__title-name">
          {{ item.title }}
        </div>
        <div class="cart__title-price">
          {{ item.price }} с
        </div>
      </div>
      <div class="cart__title-wrap">
        <div v-if="item.currentSize && item.currentSize.name" class="cart__title-sizes">
          <span>{{ item.currentSize.name }}</span>
        </div>
        <div class="cart__title-amount">
          {{ item.amount }} шт.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { links } from '~/settings/links';

@Component
export default class CartItem extends Vue {
  @Prop()
  item: any;

  imagesPrefixUrl: string | null = links.imagesPrefixUrl;
}
</script>

<style lang="scss" scoped>
.cart {
  font-family: Roboto;
  display: flex;

  &__img {
    width: 20%;

    img {
      width: 100%;
    }
  }

  &__info {
    padding-left: 10px;
    box-sizing: border-box;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__shop-name {
    font-size: 12px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.87);
  }

  &__title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title-name,
  &__title-price {
    font-size: 14px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.87);
  }

  &__title-sizes {
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

  &__title-amount {
    font-size: 13px;
    line-height: 15px;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
