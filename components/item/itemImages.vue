<template scoped>
  <div class="item-image">
    <product-zoomer :base-images="getZoomerImages" :base-zoomer-options="containerOptions" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { links } from '~/settings/links';

@Component
export default class ItemImagesComponent extends Vue {
  @Prop({ default: [] }) images!: string[];

  imagesPrefixUrl: string | null = links.imagesPrefixUrl;
  isModalOpen: boolean = false;
  containerOptions = {
    zoomFactor: 4,
    pane: 'container',
    hoverDelay: 300,
    namespace: 'container-zoomer',
    move_by_click: true,
    scroll_items: 4
  };

  get getZoomerImages() {
    const that = this;
    const images: zoomerImages = {
      normal_size: []
    };

    const transformedImages: zoomerImage[] = this.images.map(
      (img, i): zoomerImage => ({
        id: i,
        url: that.imagesPrefixUrl + img
      })
    );

    images.normal_size = transformedImages;

    return images;
  }
}

type zoomerImages = {
  // eslint-disable-next-line camelcase
  normal_size: zoomerImage[]
};

type zoomerImage = {
  id: number
  url: string
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
