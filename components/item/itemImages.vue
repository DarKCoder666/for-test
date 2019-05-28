<template scoped>
  <div class="item-image">
    <product-zoomer :base-images="getZoomerImages" :base-zoomer-options="containerOptions"></product-zoomer>
    <br>
    <br>
    <br>
    <product-zoomer :base-images="getZoomerImages" :base-zoomer-options="containerRoundOptions"></product-zoomer>
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
      },
      containerRoundOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },

  computed: {
    getZoomerImages() {
      const images = {
        // thumbs: [
        //   {
        //     id: 1,
        //     url:
        //       "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
        //   }
        // ],
        thumbs: [
          {
            id: 1,
            url:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
          },
          {
            id: 2,
            url:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
          },
          {
            id: 3,
            url:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
          }
        ],
        normal_size: [
          {
            id: 1,
            url:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
          },
          {
            id: 2,
            url:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
          },
          {
            id: 3,
            url:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
          }
        ],
        large_size: [
          {
            id: 1,
            url:
              "https://j.plenio.de/images/igallery/resized/401-500/jplenio_DSC02004-430-4000-4000-100.jpg"
          },
          {
            id: 2,
            url:
              "https://j.plenio.de/images/igallery/resized/401-500/jplenio_DSC02004-430-4000-4000-100.jpg"
          },
          {
            id: 3,
            url:
              "https://j.plenio.de/images/igallery/resized/401-500/jplenio_DSC02004-430-4000-4000-100.jpg"
          }
        ]
      };

      return images;
    }
  }
};
</script>

<style lang="scss">
.pane-container {
  top: 0 !important;
  left: 15px !important;
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
