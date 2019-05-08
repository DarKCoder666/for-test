<template scoped>
  <div class="itemImage">
    <b-carousel :interval="4000" indicators>
      <!-- Slides with image only -->
      <b-carousel-slide v-for="(img, index) in images" v-bind:key="index" v-bind:img-src="imagesPrefixUrl + img"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>

import { links } from  '../../settings/links'

export default {
  props: ["images"],

  data: function() {
    return {
      imagesPrefixUrl: links.imagesPrefixUrl
    }
  }
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

<style lang="scss">
.itemImage {
  .carousel-indicators {
    li {
      width: 8px;
      height: 8px;
      background-color: #fff;
      opacity: 0.5;
      border-radius: 50%;

      &.active {
        background-color: #918FFE;
        opacity: 1;
      }
    }
  }
}
</style>
