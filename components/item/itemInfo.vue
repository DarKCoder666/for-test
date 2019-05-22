<template scoped>
  <div v-if="data && data.barcode" class="item-info">
    <h1 class="item-title">{{data.barcode.title}}</h1>
    <b-row class="item-section">
      <b-col>
        <p>СЕБЕСТОИМОСТЬ</p>
        <span>{{data.barcode.selling_price}} c</span>
      </b-col>
    </b-row>

    <b-row class="item-section justify-content-between" row>
      <b-col class="item-section-cat">
        <p>Категория</p>
      </b-col>
      <b-col>
        <span>{{data.barcode.category.name}}</span>
      </b-col>
    </b-row>

    <b-row class="item-section" v-if="sizes.length">
      <b-col cols="12">
        <p>Размеры</p>
      </b-col>
      <b-col v-for="(size, index) in sizes" v-bind:key="index" class="item-size">{{size.name}}</b-col>
    </b-row>

    <b-row class="item-section">
      <b-col>
        <p>ОПИСАНИЕ</p>
        <span>{{data.barcode.description}}</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["data", "sizes"],
};
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

.item-section {
  padding: 24px 0;
  border-bottom: 1px solid #e1e1e1;

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

.item-size {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  margin: 0 5px;
  padding: 7px 0;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  text-align: center;
  cursor: pointer;
}
</style>
