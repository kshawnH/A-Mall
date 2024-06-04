<template>
  <van-tabbar route v-if="props.visible">
    <van-tabbar-item to="/home">
      <template #icon>
        <SvgIcon icon-class="home"></SvgIcon>
      </template>
      首页</van-tabbar-item
    >
    <van-tabbar-item to="/category">
      <template #icon>
        <SvgIcon icon-class="category"></SvgIcon>
      </template>
      分类</van-tabbar-item
    >
    <van-tabbar-item to="/cart" :badge="store.badge">
      <template #icon>
        <SvgIcon icon-class="cart"></SvgIcon>
      </template>
      购物车</van-tabbar-item
    >
    <van-tabbar-item to="/user">
      <template #icon>
        <SvgIcon icon-class="user"></SvgIcon>
      </template>
      我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script setup>
import { useCartStore } from '../stores/cart'

const route = useRoute()
// 父组件告诉我要不要渲染，我自己判断如果需要渲染，告诉父亲
const props = defineProps(['visible'])
const emit = defineEmits(['update:visible'])
watchEffect(() => {
  // 根据路由判断是否要渲染
  const paths = ['/home', '/category', '/cart', '/user']
  // 如果访问的是这几个页面
  emit('update:visible', paths.includes(route.path))
  // 通知父组件我的最新状态是多少
})
const store = useCartStore()
</script>
