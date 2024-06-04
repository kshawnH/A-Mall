import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/iconfont'

// 修改主题色，改造的是vant-ui中的颜色
import './assets/theme.css'
// 根据当前的 屏幕大小 / 10 来计算根节点的font-size
import 'lib-flexible'
import { installVant } from './installVant'

const app = createApp(App)
installVant(app)
app.use(createPinia())
app.use(router)
app.mount('#app')

// 配置提交的钩子， 每次提交前，校验一下写的代码是否合法
