// 1.获取购物车列表queryShopCart
// 2.修改数量 哪个商品的数量是多少 setCartCount
// 3.删除购物车的某个商品 removeCart
// 4.新增只传递新增的id即可addNewCart
import { queryShopCart, setCartCount, removeCart, addNewCart } from '@/api'
export const useCartStore = defineStore('cart', () => {
  const list = ref([])
  const hasCartStore = ref(false)
  // 在pinia中缓存数据
  async function getShopCartList() {
    list.value = await queryShopCart()
    hasCartStore.value = true
  }
  async function setShopCartItem(id, count) {
    await setCartCount(id, count)
    // 将列表中的数据也要更新，如果是修改也可以不发请求 通过id 获取到这一项，更改数量即可
    list.value.find((item) => item.cartItemId == id).goodsCount = count
  }
  async function removeShopCartItem(id) {
    await removeCart(id)
    // 将列表中的数据也要更新
    list.value = list.value.filter((item) => item.cartItemId != id)
  }
  async function addShopCartItem(id) {
    await addNewCart(id)
    // 将列表中的数据也要更新
    // 正常操作的情况下 应该是添加成功后，返回添加后的值
    getShopCartList()
  }

  const badge = computed(() => {
    // 暂时先计算出 我们当前选中的详情页的数量
    const current = list.value.reduce((memo, current) => ((memo += current.goodsCount), memo), 0)
    return current
  })

  const total = computed(() => {
    return list.value.reduce((memo, current) => {
      if (current.checked) {
        // 选中就累加
        memo += current.goodsCount * current.sellingPrice
      }
      return memo
    }, 0)
  })
  const isCheckedAll = computed({
    get() {
      if (list.value.length == 0) return false // 修复默认无值的时候 应该为非全选
      return list.value.every((item) => item.checked)
    },
    set(newVal) {
      list.value.forEach((item) => (item.checked = newVal))
    }
  })
  return {
    total,
    isCheckedAll,
    hasCartStore,
    badge,
    list,
    getShopCartList,
    setShopCartItem,
    removeShopCartItem,
    addShopCartItem
  }
})
