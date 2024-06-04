import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useCartStore } from '@/stores/cart'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { title: '首页' }
    },
    {
      path: '/category',
      meta: { title: '分类' },
      name: 'category',
      component: () => import('../views/Category.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue'),
      meta: {
        needLogin: true // 需要登录才能访问的 我们需要配置这个属性
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {
        needLogin: true
      },
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        needLogin: true
      },
      component: () => import('../views/Search.vue')
    }
  ]
})

// 鉴权看是否登录过
router.beforeEach(async (to) => {
  let token = localStorage.getItem('token')
  if (token) {
    // 如果有token 说明登录成功，但是如果你访问的还是登录
    if (to.name === 'login') {
      return { path: '/' }
    }
  } else {
    // 没有登录，跳转到登录页面
    // /a/b  -> ['/a','/a/b']
    if (to.matched.some((item) => item.meta.needLogin)) {
      // 此路由需要登录但是没有登录， 应该跳转到登录页面
      return {
        path: '/login',
        query: {
          redirect: to.path, // 跳转到登录页面，并且告诉登录页面稍后回调回来
          ...to.query // 当前页面的其他参数也添加进去
        }
      }
    }
  }
})
// 如果登陆过查询是否已经获取购物车信息
// 获取购物车的信息存储到pinia中
router.beforeEach(() => {
  let token = localStorage.getItem('token')
  if (token) {
    const store = useCartStore()
    if (!store.hasCartStore) {
      // 如果当前没有获取过购物车信息
      store.getShopCartList()
    }
  }
})
export default router
