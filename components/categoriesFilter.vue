<template scoped>
  <div class="categories">
    <b-container>
      <b-row>
        <b-form-group class="categories-form-group">
          <div class="select-title">Категории</div>
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: null,
    options: [
      { value: null, text: "Выберите категорию" },
      { value: "a", text: "Первая категория" },
      { value: "b", text: "Вторая категория" }
    ]
  })
};
</script>

<style lang="scss" scoped>
.categories {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: $sm) {
    padding: 0 15px;
  }
}

.categories-form-group {
  width: 100%;
  margin: 0;
  position: relative;

  select {
    text-align-last: right;
    direction: rtl;
    border: none;
    height: 50px;
    padding: 0 30px 0 0;
    display: flex;
    align-items: center;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;

    &:focus {
      box-shadow: none;
    }
  }

  option {
    padding: 10px;
  }
}

.select-title {
  font-size: 16px;
  line-height: 19px;
  color: #b4b4b4;
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
