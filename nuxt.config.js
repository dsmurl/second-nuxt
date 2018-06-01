const pkg = require('./package');
const bodyParser = require('body-parser');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Sam\'s Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#0f2680',
    height: 4,
    duration: 5000
  },
  loadingIndicator: {
    name: 'circle',
    color: '#0f2680',
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'top-right',
    duration: 3000,
    action: [
      {
        text: 'X',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      }
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

    }
  },
  env: {
    fireBaseUrl: process.env.FIRE_BASE_URL || 'https://nuxt-blog-1b48c.firebaseio.com/',
    fireAuthSigninUrl:  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=',
    fireAuthSignupUrl:  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=',
    fireApiKey: process.env.FIRE_API_KEY || '',
    adminEmail: process.env.ADMIN_EMAIL || 'sam@sam.com',
    imageServerBaseUrl: process.env.IMAGE_SERVER_BASE_URL || "http://www.UNINIT-IMAGE-ADDRESS.com/"
  },
  // ,  router: {  // For subpath publishing
  //   base: '/nuxt-blog/'
  // },
  srcDir: 'client-app/',
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ]
};
