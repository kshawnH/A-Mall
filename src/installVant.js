import { showToast, showDialog, showNotify, showImagePreview, Lazyload } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import 'vant/es/notify/style'

export function installVant(app) {
  // 属性
  app.config.globalProperties.$showToast = showToast
  app.config.globalProperties.$showDialog = showDialog
  app.config.globalProperties.$showNotify = showNotify
  app.config.globalProperties.$showImagePreview = showImagePreview
  // 指令
  app.use(Lazyload)

  // ... 配置vant中的指令和属性，增加相关配置
}
