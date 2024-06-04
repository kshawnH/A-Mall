import http from '@/utils/http.js'
import md5 from 'blueimp-md5'
const API_LIST = {
  queryIndexInfos: '/index-infos', // 首页的获取数据接口，都在这里
  userLogin: '/user/login',
  userRegister: '/user/register',
  queryCategories: '/categories', // 查询分类的路径
  queryGoodsInfo: '/goods/detail'
}
// 首页数据的获取，直接通过 api 这个文件来操作
export function queryIndexInfos() {
  return http.get(API_LIST.queryIndexInfos)
}
// md5特点？ 不是加密算法，摘要算法 1）内容不同摘要的结果不同 2） 如果内容发生一点变化就会发生翻天覆地的变化 ， 雪崩效应
// 3) 生成长度一致  4）相同的内容生成的结果一直 5） 不可逆
export const userLogin = (loginName, password) => {
  password = md5(password)
  return http.post(API_LIST.userLogin, {
    loginName,
    passwordMd5: password
  })
}
// 用户注册
export const userRegister = (loginName, password) => {
  return http.post(API_LIST.userRegister, {
    loginName,
    password
  })
}
// 查询所有的分类
export function queryCategories() {
  return http.get(API_LIST.queryCategories)
}

// 查询商品的详细信息
export const queryGoodsInfo = (id) => {
  return http.get(API_LIST.queryGoodsInfo + `/${id}`)
}

// 1.获取购物车列表queryShopCart
// 2.修改数量 哪个商品的数量是多少 setCartCount
// 3.删除购物车的某个商品 removeCart
// 4.新增只传递新增的id即可addNewCart
export const queryShopCart = () => http.get('/shop-cart')
export const setCartCount = (cartItemId, goodsCount) => {
  return http.request({
    url: '/shop-cart',
    method: 'PUT',
    data: {
      cartItemId,
      goodsCount
    }
  })
}
export const removeCart = (cartItemId) =>
  http.request({
    url: `/shop-cart/${cartItemId}`,
    method: 'DELETE'
  })

export const addNewCart = (goodsId, goodsCount = 1) => {
  return http.post('/shop-cart', {
    goodsId,
    goodsCount
  })
}
