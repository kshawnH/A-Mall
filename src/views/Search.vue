<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '../stores/category'
const route = useRoute()
const goodsCategoryId = ref(parseInt(route.query.categoryId) || '')
const categoryOptions = ref([{ text: '全部分类', value: '' }])
const orderBy = ref('')
const sortOptions = [
  { text: '综合排序', value: '' },
  { text: '时间排序', value: 'new' },
  { text: '价格排序', value: 'price' }
]

const store = useCategoryStore()
const { list } = storeToRefs(store)
onMounted(async () => {
  if (list.value.length == 0) {
    await store.getCategories()
  }
  const result = []
  const stack = toRaw(list.value) // 所以的数据
  // 树的遍历， 层序遍历
  let index = 0 // 指针
  let current
  // 递归会出现爆栈的问题，避免用递归
  while ((current = stack[index++]) != null) {
    if (current.categoryLevel == 1) {
      stack.push(...current.secondLevelCategoryVOS)
    } else if (current.categoryLevel == 2) {
      stack.push(...current.thirdLevelCategoryVOS)
    } else {
      result.push({ text: current.categoryName, value: current.categoryId })
    }
  }
  categoryOptions.value.push(...result)
})
</script>

<template>
  <div class="search-box">
    <!-- 头部导航 -->
    <TopBar>
      <template #title>
        <van-search />
      </template>
      <template #right>
        <van-button type="primary" size="small"> 搜索 </van-button>
      </template>
    </TopBar>
    <!-- 筛选 -->
    <van-dropdown-menu>
      <van-dropdown-item :options="categoryOptions" v-model="goodsCategoryId" />
      <van-dropdown-item :options="sortOptions" v-model="orderBy" />
    </van-dropdown-menu>
    <!-- 内容 -->
    <div class="content">
      <van-empty description="赶快搜索你想要的产品吧" />
      <van-list>
        <!-- <GoodsItem /> -->
      </van-list>
    </div>
  </div>
</template>

<style scoped>
.content {
  height: calc(100vh - 94px);
  overflow: scroll;
}
</style>
