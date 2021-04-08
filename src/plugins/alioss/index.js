import Uploader from './index.vue'

const OSS = require('ali-oss/dist/aliyun-oss-sdk')
const config = require('@/constant/alioss').config

const client = new OSS(config)

export default {
  install (Vue) {
    Vue.prototype.$oss = client
    Vue.component('Uploader', Uploader)
  }
}
