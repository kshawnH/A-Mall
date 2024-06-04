<template>
  <div :class="{ 'goods-item-box': true, 'goods-cart': cart }">
    <router-link :to="`/detail/${info.goodsId}`">
      <van-image :src="processURL(info.goodsCoverImg)" />
      <div class="desc" v-if="!cart">
        <h3 class="title">{{ info.goodsName }}</h3>
        <p class="info">商品介绍</p>
        <p class="price">{{ info.sellingPrice }}</p>
      </div>
      <div class="cart-desc" v-else>
        <h3 class="title">{{ info.goodsName }}</h3>
        <p class="info">
          <span>{{ info.sellingPrice }}</span>
          <van-stepper max="5" :modelValue="info.goodsCount" @change="handle" />
        </p>
      </div>
    </router-link>
  </div>
</template>
<script setup>
import { useCartStore } from '../stores/cart'
import { processURL } from '../utils'

const props = defineProps(['cart', 'info'])
const store = useCartStore()
function handle(value) {
  store.setShopCartItem(props.info.cartItemId, value)
}
</script>

<style lang="less" scoped>
.clip {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.goods-item-box {
  padding: 10px;
  border-bottom: 1px solid #eee;

  a {
    display: flex;

    .van-image {
      margin-right: 10px;
      width: 120px;
      height: 120px;
      flex: 0 0 auto;
    }

    .desc {
      color: #555;
      flex: 1 0;

      .title {
        .clip;
        font-size: 14px;
        font-weight: normal;
        line-height: 20px;
        max-height: 40px;
      }

      .info {
        .clip;
        padding: 8px 0;
        color: #999;
        font-size: 12px;
        line-height: 16px;
        max-height: 32px;
      }

      .price {
        color: @theme;
        font-size: 14px;
      }
    }
  }

  /* 购物车独有 */
  &.goods-cart {
    border-bottom: none;

    a {
      .van-image {
        width: 100px;
        height: 100px;
      }

      .cart-desc {
        box-sizing: border-box;
        padding: 10px;
        min-width: 220px;
        color: #555;
        flex: 1 0;

        .title {
          .clip;
          font-size: 14px;
          font-weight: normal;
          line-height: 20px;
          max-height: 40px;
        }

        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          line-height: 28px;

          span {
            font-size: 14px;
            color: #ee0a24;
          }
        }
      }
    }
  }
}
</style>
