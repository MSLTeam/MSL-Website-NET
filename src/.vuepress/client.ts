import { defineClientConfig } from 'vuepress/client'
import Changelog from './components/Changelog.vue' // 导入你的组件

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Changelog', Changelog)
  },
})