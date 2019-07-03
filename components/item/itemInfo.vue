<template scoped>
  <b-container v-if="data && data.barcode" class="item-info">
    <h1 class="item-title">
      {{ title }}
    </h1>

    <b-row class="item-section item-description">
      <b-col>
        <span>{{ description }}</span>
      </b-col>
    </b-row>

    <b-row class="item-section">
      <b-col>
        <p>Цена</p>
        <span>{{ price }} c</span>
      </b-col>
    </b-row>

    <b-row class="item-section justify-content-between" row>
      <b-col class="item-section-cat">
        <p>Категория</p>
      </b-col>
      <b-col>
        <span>{{ category }}</span>
      </b-col>
    </b-row>

    <b-row v-if="sizes.length" class="item-section">
      <b-col cols="12">
        <p>Размеры</p>
      </b-col>

      <b-form-group class="item-sizes">
        <b-form-radio-group
          id="radio-group-2"
          v-model="selected"
          buttons
          name="radio-sub-component"
        >
          <b-form-radio v-for="size in sizes" :key="size.id" :value="size.id">
            <b-col class="item-size" @click="onSizeChange">
              {{ size.name }}
            </b-col>
          </b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-row>

    <b-row class="item-section item-in-stock" :class="!inStock ? 'item-not-in-stock' : ''">
      <b-col>
        <span v-if="inStock">Есть в наличии</span>
        <span v-else>Нет в наличии</span>
      </b-col>
    </b-row>

    <b-row>
      <div class="btn-section">
        <div v-if="inStock" v-b-modal.checout-modal class="buy_btn">
          Купить
        </div>
        <div v-else class="buy_btn buy_btn_disabled">
          Купить
        </div>
        <div v-if="isError" class="sizes_error">
          Пожалуйста, выберите размер товара
        </div>
      </div>
    </b-row>

    <cart-modal :item="itemForCart" :can-show-modal="canShowModal" @show="onModalOpen" />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import CartModal from '~/components/cart/cartModal.vue';

@Component({
  components: {
    CartModal
  }
})
export default class ItemInfoComponent extends Vue {
  @Prop({ default: {} }) data!: [object];
  @Prop({ default: [] }) sizes!: [string];

  @Watch('sizes')
  onShowModalChange(this: any) {
    this.canShowModal = this.sizes.length === 0;
  }

  selected: string = '';
  isError: boolean = false;
  canShowModal: boolean = false;

  get itemForCart(this: any): object {
    let currentSize: any = null;
    let currentSizeID;
    const resSizes = this.data.barcode.category.sizes;

    if (resSizes.length) {
      currentSizeID = this.sizes.length ? this.selected : resSizes[0].id;
      currentSize = {
        id: currentSizeID
      };

      if (this.sizes.length) {
        this.sizes.some((size: any) => {
          if (size.id === currentSizeID) {
            currentSize = size;
            return true;
          }
        });
      }
    }

    return {
      imgUrl: this.data.barcode.images[0],
      currentSize,
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      amount: 1,
      shopName: this.data.shop.name,
      data: this.data
    };
  }

  get title(this: any): string {
    return this.data.barcode.title;
  }

  get description(this: any): string {
    return this.data.barcode.description;
  }

  get price(this: any): string {
    return this.data.barcode.selling_price;
  }

  get category(this: any): string {
    return this.data.barcode.category.name;
  }

  get inStock(this: any): boolean {
    return this.data.barcode.category.sizes.length !== 0;
  }

  onSizeChange() {
    this.isError = false;
    this.canShowModal = true;
  }

  onModalOpen(this: any) {
    if (this.selected === '' && this.sizes.length !== 0) {
      this.isError = true;
      return;
    }

    this.canShowModal = true;
  }
}
</script>

<style lang="scss" scoped>
.item-info {
  p {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #666666;
  }

  span {
    font-size: 18px;
    line-height: 21px;
    color: #000000;
  }
}

.item-sizes {
  width: 100%;

  div {
    width: 100%;
  }

  label {
    padding: 0;
    background-color: transparent;
    border: none;
    margin: 0 13px;

    &:first-child {
      margin-left: 0;
    }

    &.active {
      background-color: transparent !important;

      .item-size {
        border-color: $orange;
      }
    }

    &:active {
      background-color: transparent !important;
    }

    &.focus {
      box-shadow: none !important;
    }
  }
}

.item-size {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  padding: 7px 0;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.1s ease-in-out;
}

.item-section {
  padding: 24px 0;
  border-bottom: 1px solid #e1e1e1;

  div,
  .col {
    padding-left: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &-cat {
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
  }
}

.item-title {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
}

.item-description {
  border: none;
  padding-top: 0;

  span {
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.7);
  }
}

.item-in-stock {
  border: none;

  span {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #2196f3;
  }
}

.item-not-in-stock {
  span {
    color: #ff0f0f;
  }
}

.btn-section {
  display: flex;
  align-items: center;

  .sizes_error {
    margin-left: 7px;
    font-size: 14px;
    line-height: 16px;
    color: #E67C73;
  }
}

.buy_btn {
  width: 212px;
  padding: 17px;
  box-sizing: border-box;
  text-transform: uppercase;
  color: #fff;
  font-family: "Roboto";
  font-size: 14px;
  line-height: 16px;
  background-color: $orange;
  text-align: center;
  cursor: pointer;

  &_disabled {
    background-color: #adb5bd;
    cursor: default;
  }
}
</style>
