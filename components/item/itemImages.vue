<template scoped>
  <div class="item-image">
    <product-zoomer :base-images="getZoomerImages" :base-zoomer-options="containerOptions"></product-zoomer>
  </div>
</template>

<script>
import { links } from "../../settings/links";

export default {
  props: ["images"],

  data: function() {
    return {
      imagesPrefixUrl: links.imagesPrefixUrl,
      isModalOpen: false,
      containerOptions: {
        zoomFactor: 4,
        pane: "container",
        hoverDelay: 300,
        namespace: "container-zoomer",
        move_by_click: true,
        scroll_items: 4
      }
    };
  },

  computed: {
    getZoomerImages() {
      const that = this
      const images = {
        normal_size: []
      }

      images.normal_size = this.images.map((img, i) => ({
        id: i,
        url: that.imagesPrefixUrl + img
      }))

      return images;
    }
  }
};
</script>

<style lang="scss">
.pane-container {
  top: 0 !important;
  left: 15px !important;

  @media screen and (max-width: $md) {
    display: none !important;
  }
}

.thumb-list {
  display: flex !important;
  justify-content: space-between;

  img {
    max-height: 75px;
    width: auto;
    margin: 0 2px;
  }

  & + .control {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.control-box {
  display: flex;
  justify-content: space-between;
}
</style>

<style lang="scss" scoped>
.item-image {
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

.images-wrap {
  position: relative;
  box-sizing: border-box;
}

.item-scale {
  position: absolute;
  bottom: 10px;
  right: 25px;
  width: auto;
  height: auto;
  display: flex;
  font-size: 26px;
  color: #767778;
  z-index: 999;
  cursor: pointer;
}
</style>

<style lang="scss">
.item-image {
  .carousel-indicators {
    li {
      width: 8px;
      height: 8px;
      background-color: #fff;
      opacity: 0.5;
      border-radius: 50%;

      &.active {
        background-color: #918ffe;
        opacity: 1;
      }
    }
  }
}
</style>
