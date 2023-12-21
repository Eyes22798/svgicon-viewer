// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import ViteComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Icon View',
      link: [{ rel: 'icon', type: 'image/*', href: '/favicon.svg' }]
    }
  },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    'unplugin-icons/nuxt',
    '@vueuse/nuxt'
  ],
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({
            componentPrefix: ''
          })
        ],
        dts: true
      })
    ]
  },
  dev: true,
  devServer: {
    host: '',
    port: 5000
  }
})
