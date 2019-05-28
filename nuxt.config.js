import pkg from './package'

// const API_URL = process.env.API_URL || 'https://api.dev.uno.kg/v2'
const API_URL = process.env.API_URL || 'https://api.test.olalaland.store/v2'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    API_URL: API_URL
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [

  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/vue-phone-number-input.js", ssr: false },
    { src: "~/plugins/vue-image-zoom.js", ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'nuxt-client-init-module',
    [
      'nuxt-fontawesome', {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ]
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: 'https://api.test.olalaland.store/v2',
    baseURL: API_URL,
    'Access-Control-Allow-Origin': '*',
  },

  styleResources: {
    scss: [
      'assets/scss/global.scss',
      'assets/scss/variables.scss',
      'assets/scss/auth.scss'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }, 
    vendor: ['vue-phone-number-input', 'vue-product-zoomer']
  }
}
