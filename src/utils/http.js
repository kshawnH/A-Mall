import axios from 'axios'
// 请求的时候可以做什么事？ 1）拦截 携带token， 对响应状态码处理， 2）增加loading （增添一个队列）  3）接口可以保存取消的操作
class Http {
  constructor() {
    // 根据环境变量设置请求的路径
    this.baseURL = import.meta.env.DEV ? 'http://backend-api-01.newbee.ltd/api/v1' : '/'
    this.timeout = 5000
  }
  setInterceptor(instance) {
    instance.interceptors.request.use(
      (config) => {
        // 携带token来做处理
        let token = localStorage.getItem('token')
        if (token) {
          config.headers['token'] = token // 每次携带token
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    instance.interceptors.response.use(
      (res) => {
        if (res.data.resultCode == 200) {
          // 对返回值的状态码是200的情况统一处理
          return res.data.data
        }
        if (res.data.resultCode === 500) {
          return Promise.reject(res.data)
        }
        if (res.data.resultCode === 416) {
          localStorage.removeItem('token') // 416 可能是token错误，这个时候清除token，重新刷新
          // 刷新后就在此路由的全局钩子，就会走没有token的逻辑
          return window.location.reload()
          // return Promise.reject(res.data)
        }
        return res.data // {resultCode:200,data:{}}
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }
  request(options) {
    // 请求会实现拦截器
    const instance = axios.create() // 1.每次请求要创建一个新的实例
    this.setInterceptor(instance) // 2.设置拦截器
    // 发送请求参数
    return instance({
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout
    })
  }
  get(url, data) {
    return this.request({
      method: 'get',
      url,
      params: data
    })
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}
export default new Http()
