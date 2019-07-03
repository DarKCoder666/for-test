<template scoped>
  <b-container>
    <div class="orders">
      <h1 class="orders__title">
        Покупки
      </h1>

      <div class="orders__back" @click="goBack">
        <font-awesome-icon class="arrow-left" :icon="['fas', 'chevron-left']" />
        <span>Вернуться назад</span>
      </div>

      <div class="orders__inner-wrap">
        <table class="orders__table">
          <thead>
            <tr>
              <th>Наименование и описание</th>
              <th>Телефон</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" :key="index">
              <td>
                <div class="orders__item-wrap orders__border-bottom">
                  <div class="orders__item-img">
                    <img :src="imagesPrefixUrl + item.barcode.images[0]" alt="Image">
                  </div>

                  <div class="orders__item-info">
                    <p class="orders__shop-name">
                      {{ item.barcode.shop_name }}
                    </p>
                    <p class="orders__item-name">
                      {{ item.barcode.title }}
                    </p>
                    <div v-if="item.barcode.size !== 'Кол-во'" class="orders__sizes">
                      <span>{{ item.barcode.size }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <td>
                +999991231231
              </td>

              <td class="orders__amount">
                <div>{{ 1 }}</div>
              </td>

              <td class="orders__price">
                <div>{{ item.barcode.price }} c</div>
              </td>

              <td class="orders__status">
                <span v-if="item.status === 'done'" class="orders__status_done">Получено</span>
                <span v-else-if="item.status === 'confirmed'" class="orders__status_confirmed">Подтверждено</span>
                <span v-else-if="item.status === 'canceled'" class="orders__status_canceled">Отменено</span>
                <span v-else-if="item.status === 'pending'" class="orders__status_panding">В ожидании</span>
                <span v-else-if="item.status === 'in_way'" class="orders__status_confirmed">В пути</span>
              </td>

              <td>
                <div v-if="item.status === 'pending'" class="orders__btn_cancel" @click="cancelItem(item.id)">
                  Отменить
                </div>
                <div v-if="item.status === 'in_way'" class="orders__btn_confirm" @click="confirmItem(item.id)">
                  Получил
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { links } from '~/settings/links'

@Component
export default class Orders extends Vue {
  imagesPrefixUrl: string | null = links.imagesPrefixUrl

  fetch({ store }) {
    if (process.browser) {
      store.dispatch('order/receiveMyOrders')
    }
  }

  cancelItem(itemID: number) {
    this.$store.dispatch('order/cancelItem', { itemID })
  }

  confirmItem(itemID: number) {
    this.$store.dispatch('order/confirmItem', { itemID })
  }

  goBack() {
    this.$router.back();
  }

  get orders(this: any) {
    return this.$store.state.order.myOrders
  }
}
</script>

<style lang="scss" scoped>
.orders {
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

  &__status {
    span {
      font-size: 12px;
      line-height: 24px;
    }

    &_done,
    &_confirmed {
      color: #00B628;
    }

    &_pending {
      color: #868686;
    }

    &_canceled {
      color: #DB4437;
    }
  }

  &__btn_cancel, &__btn_confirm {
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
  }

  &__btn_cancel {
    color: #9E9E9E;
  }

  &__btn_confirm {
    color: #00B628;
  }
}
</style>
