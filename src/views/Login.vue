<template>
  <div class="login">
    <TopBar :title="isLogin ? '登录' : '注册'"></TopBar>
    <img :src="logo" class="logo" />
    <van-form @submit="submit">
      <van-field
        label="手机号"
        name="loginName"
        v-model="state.loginName"
        :rules="[{ pattern: /^1\d{10}/, message: '请输入正确手机号' }]"
      />
      <van-field
        label="密码"
        type="password"
        name="password"
        v-model="state.password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      />
      <van-field
        label="验证码"
        name="captcha"
        v-model="state.captcha"
        :rules="[{ validator: validatorCaptcha, message: '验证码不正确' }]"
      >
        <template #button>
          <Captcha v-model:text="captchaImgText" ref="captcha"></Captcha>
        </template>
      </van-field>
      <a class="text" @click="changeLogin">
        {{ isLogin ? '还没账号,请点此注册' : '已有账号,请点此登录' }}
      </a>
      <div style="margin: 16px">
        <van-button round block color="#1baeae" native-type="submit"> 确认提交 </van-button>
      </div>
    </van-form>
    {{ captchaImgText }}
  </div>
</template>
<script setup>
import logo from '@/assets/images/newbee-mall-vue3-app-logo.png'
import { userLogin, userRegister } from '@/api'
import { useRoute } from 'vue-router'
const isLogin = ref(true) // 这个状态用来控制当前是哪一个页面
function changeLogin() {
  isLogin.value = !isLogin.value
  state.loginName = ''
  state.password = ''
  state.captcha = ''
  captcha.value.reset()
}
// 对用户的数据进行维护
const state = reactive({
  loginName: '', // 用户名
  password: '', // 密码
  captcha: '' // 验证码
})
const captchaImgText = ref('')
const captcha = ref(null)
function validatorCaptcha() {
  let isSame = state.captcha === captchaImgText.value // 如果相同
  if (!isSame) {
    captcha.value.reset()
    return false
  }
  return true
}
// 提交操作

const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
async function submit() {
  if (isLogin.value) {
    // 如果是200 我们直接拿到的就是token
    try {
      let token = await userLogin(state.loginName, state.password)
      proxy.$showToast('登录成功')
      localStorage.setItem('token', token)
      // 从别的页面跳转过来，会携带跳回的路径，和其他的查询参数
      let { redirect, ...query } = route.query
      redirect
        ? router.push({
            path: redirect,
            query
          })
        : router.push('/')
    } catch (e) {
      proxy.$showToast(e.message)
    }
  } else {
    try {
      await userRegister(state.loginName, state.password)
      proxy.$showToast('注册成功')
      changeLogin() // 注册成功跳转到登录
    } catch (e) {
      proxy.$showToast(e.message)
    }
  }
}
</script>

<style scoped lang="less">
.login {
  padding: 0 20px;
  .logo {
    display: block;
    margin: 20px auto 20px;
    width: 140px;
    height: 140px;
  }
}
.text {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 15px;
  color: #1989fa;
  font-size: 14px;
}
</style>
