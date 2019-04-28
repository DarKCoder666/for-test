<template scoped>
  <div class="item">
    <nuxt-link to="/store">
      <div class="item-header">
        <div class="item-logo">
          <img src="~/assets/images/itemLogo.png" alt>
        </div>
        <div class="item-title">
          <p>Adidas Men Store</p>
          <span>Боконбаева 163</span>
        </div>
      </div>
    </nuxt-link>
    <nuxt-link to="/item">
      <div class="item-body">
        <img src="~/assets/images/itemImg.png" class="item-bg" alt>
        <div class="item-info">
          <p>ADIDAS SPORTSWEAR</p>
          <span>4300 c</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.item {
  margin-top: 26px;
}

.item-header {
  display: flex;
  margin-bottom: 10px;
}

.item-logo {
  border-radius: 50%;
  margin-right: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #cfcfcf;
  overflow: hidden;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
}

.item-title {
  justify-content: center;
  display: flex;
  flex-direction: column;

  p {
    font-size: 13px;
    line-height: 15px;
    color: #000000;
    margin-bottom: 0;
  }

  span {
    font-size: 12px;
    line-height: 14px;
    color: #bdbdbd;
  }
}

.item-body {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 164px;
  display: flex;
  align-items: flex-end;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
}

.item-info {
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  padding: 10px;

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #090909;
    margin: 0;
  }

  span {
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
}
</style>
