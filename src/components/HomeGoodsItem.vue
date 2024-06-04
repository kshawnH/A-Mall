<script setup>
import { processURL, addPrefix } from '../utils'
defineProps(['title', 'goodsList'])
</script>
<template>
  <div class="title">{{ title }}</div>
  <van-grid :column-num="2" :border="false">
    <van-grid-item v-for="goods in goodsList" :key="goods.goodsId">
      <router-link
        :to="`/detail/${goods.goodsId}`"
        style="display: flex; flex-direction: column; align-items: center"
      >
        <van-image :src="processURL(goods.goodsCoverImg)" lazy-load />
        <div class="desc">
          {{ goods.goodsIntro }}
        </div>
        <div class="price">
          {{ addPrefix(goods.sellingPrice) }}
        </div>
      </router-link>
    </van-grid-item>
  </van-grid>
</template>
<style scoped lang="less">
.title {
  color: @theme;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
}
.van-image {
  :deep(.van-image__img) {
    width: 120px;
    height: 140px;
  }
}
.desc {
  font-size: 14px;
  color: #555;
}
.price {
  color: @theme;
  font-size: 16px;
}
</style>
