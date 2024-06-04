<script setup>
import { queryGoodsInfo } from '@/api'
import { processURL } from '../utils'
import { useCartStore } from '../stores/cart.js'
const route = useRoute()
const router = useRouter()
const currentGoods = ref(null)
onMounted(async () => {
  const id = route.params.id
  if (!id) {
    return router.push('/')
  }
  currentGoods.value = await queryGoodsInfo(id)
})
// 购物车store
const store = useCartStore()
const { list } = storeToRefs(store) // 购物车的数据

function findCurrentItem() {
  return list.value.find((item) => item.goodsId == route.params.id)
}

const { proxy } = getCurrentInstance()
function addCart() {
  const current = findCurrentItem()
  if (current) {
    // 修改数量
    if (current.goodsCount == 5) {
      return proxy.$showToast('超出最大购买限制')
    }
    store.setShopCartItem(current.cartItemId, current.goodsCount + 1)
  } else {
    // 新增
    store.addShopCartItem(route.params.id)
  }
}
</script>

<template>
  <div class="detail-box">
    <!-- 导航 -->
    <TopBar title="商品详情"></TopBar>
    <!-- 商品详情 -->
    <div class="info" v-if="currentGoods">
      <van-image lazy-load :src="processURL(currentGoods.goodsCoverImg)" />
      <div class="desc">
        <h3 class="title">{{ currentGoods.goodsName }}</h3>
        <p class="tag">{{ currentGoods.goodsIntro }}</p>
        <p class="price">￥{{ currentGoods.sellingPrice }}</p>
      </div>
      <div class="tab">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">安装服务</a>
        <span>|</span>
        <a href="javascript:;">常见问题</a>
      </div>
      <div class="content" v-html="currentGoods.goodsDetailContent"></div>
    </div>

    <!-- 相关操作 -->
    <van-action-bar style="max-width: 540px">
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/cart')"
        :badge="store.badge"
      />
      <van-action-bar-button
        color="linear-gradient(90deg,#6bd8d8,#1baeae)"
        text="加入购物车"
        @click="addCart"
      />
      <van-action-bar-button color="linear-gradient(90deg,#0dc3c3,#098888)" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.van-skeleton {
  margin-top: 20px;
}

.detail-box {
  padding-bottom: 50px;
  .info {
    padding: 0 10px;
    .content {
      :deep(img) {
        max-width: 100%;
      }
    }
    .van-image {
      width: 100%;
      min-height: 240px;
    }

    .desc {
      .title {
        font-size: 18px;
        color: #555;
        font-weight: normal;
      }

      .tag {
        padding: 10px 0;
        font-size: 14px;
        color: #999;
      }
      .price {
        font-size: 18px;
        color: #f63515;
      }
    }
    .tab {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      a,
      span {
        font-size: 15px;
        color: #555;
      }

      a {
        padding: 0 10px;
      }
    }
  }
}
</style>
