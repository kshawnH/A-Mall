<script setup>
import empty from '@/assets/images/empty-car.png'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const store = useCartStore()
const { list, total } = storeToRefs(store)

function remove(id) {
  store.removeShopCartItem(id)
}
</script>
<template>
  <div class="cart-box">
    <!-- 头部导航 -->
    <TopBar title="购物车"></TopBar>
    <van-empty description="购物车空空如也" :image="empty" v-if="list.length == 0" />
    <!-- 中间列表 -->
    <div class="cart-list" v-else>
      <van-swipe-cell v-for="item in list" :key="item.goodsId">
        <div class="item">
          <van-checkbox checked-color="#1baeae" v-model="item.checked"></van-checkbox>
          <GoodsItem :cart="true" :info="item" />
        </div>
        <template #right>
          <van-button square type="danger" text="删除" @click="remove(item.cartItemId)" />
        </template>
      </van-swipe-cell>
    </div>

    <!-- 底部结算 -->
    <van-submit-bar :price="total * 100" button-text="结算" button-type="primary">
      <van-checkbox v-model="store.isCheckedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<style lang="less" scoped>
.van-submit-bar {
  bottom: 60px;
}

.cart-box {
  padding: 0 10px;

  .cart-list {
    height: calc(100vh - 46px - 110px);
    overflow-y: auto;

    .item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;

      .van-checkbox {
        flex: 0 0 auto;
        width: 20px;
      }
    }
  }
}

.van-button--square {
  height: 100%;
}

:deep(.van-swipe-cell__right) {
  right: -1px;
}
</style>
