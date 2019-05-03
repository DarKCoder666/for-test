<template scoped>
  <div class="itemImage">
    <b-carousel :interval="4000" controls indicators>
      <!-- Slides with image only -->
      <b-carousel-slide v-for="(img, index) in images" v-bind:key="index" v-bind:img-src="img"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: ["images"]
};
</script>

<style lang="scss" scoped>
.itemImage {
  height: 100%;

  * {
    height: 100%;
  }

  .carousel-inner {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
