<script setup>
import { queryIndexInfos } from '../api/index'
import menuList from '../assets/category'
const carousels = ref([])

const isActive = ref(false)
function handleScroll({ scrollTop }) {
  isActive.value = scrollTop > 172
}
const hotGoodses = ref([])
const newGoodses = ref([])
const recommendGoodses = ref([])
const loading = ref(true)
onMounted(async () => {
  let data = await queryIndexInfos()
  carousels.value = data.carousels // 轮播图的数据获取成功
  hotGoodses.value = data.hotGoodses
  newGoodses.value = data.newGoodses
  recommendGoodses.value = data.recommendGoodses
  loading.value = false
})
</script>
<template>
  <div style="position: absolute; width: 100%; z-index: 100">
    <van-sticky @scroll="handleScroll">
      <div class="home-header" :class="{ active: isActive }">
        <div class="menu">
          <router-link to="/category">
            <van-icon name="wap-nav" />
          </router-link>
        </div>
        <div class="search">
          <span>美淘商城</span>
          <van-icon name="search" />
          <router-link to="/search">山河无恙，人间皆安</router-link>
        </div>
        <div class="login">
          <router-link to="/login">登录</router-link>
        </div>
      </div>
    </van-sticky>
  </div>
  <van-swipe class="swipe" :autoplay="3000" indicator-color="@theme">
    <template v-for="(item, index) of carousels" :key="index">
      <van-swipe-item>
        <img :src="item.carouselUrl" />
      </van-swipe-item>
    </template>
  </van-swipe>

  <van-grid :column-num="5" :border="false">
    <van-grid-item
      v-for="menu in menuList"
      :key="menu.name"
      :icon="menu.imgUrl"
      :text="menu.name"
      @click="$showToast('敬请期待')"
    />
  </van-grid>

  <van-skeleton :row="5" :loading="loading">
    <HomeGoodsItem title="新品上线" :goods-list="hotGoodses"></HomeGoodsItem>
    <HomeGoodsItem title="热门商品" :goods-list="newGoodses"></HomeGoodsItem>
    <HomeGoodsItem title="最新推荐" :goods-list="recommendGoodses"></HomeGoodsItem>
  </van-skeleton>
</template>
<style scoped lang="less">
.home-header {
  padding: 0 20px;
  display: flex;
  background: rgba(255, 255, 255, 0.7);
  justify-content: space-between;
  align-items: center;
  a {
    color: #444;
  }
  &.active {
    background: @theme;
    span {
      color: #fff;
    }
    a {
      color: #fff;
    }
  }
}
.search {
  width: 255px;
}
.van-icon {
  font-size: 20px;
}
.search {
  span {
    color: @theme;
    font-size: 22px;
    padding-right: 20px;
    font-weight: bold;
  }
  line-height: 50px;
  display: flex;
  align-items: center;
}
.swipe {
  height: 172px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
