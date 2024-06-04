<script setup>
import classify from '@/assets/images/classify.png'
import { useCategoryStore } from '../stores/category'
import { computed, onMounted } from 'vue'

const store = useCategoryStore()
// 通过storeToRefs 将store中的所有属性，转换成ref不包过方法
// toRefs 在转化的时候会将函数也转成ref
const { list } = storeToRefs(store)
onMounted(async () => {
  // 没有数据我要获取数据
  if (list.value.length == 0) {
    await store.getCategories()
  }
})
const activeIndex = ref(5)
const contentArray = computed(() => {
  return list.value[activeIndex.value]?.secondLevelCategoryVOS
})
</script>
<template>
  <TopBar>
    <template #title>
      <van-search placeholder="搜索需要的产品" @click="$router.push('/search')"></van-search>
    </template>
  </TopBar>
  <div class="main">
    <van-sidebar v-model="activeIndex">
      <van-sidebar-item
        :title="category.categoryName"
        v-for="category in list"
        :key="category.categoryName"
      />
    </van-sidebar>
    <div class="content" v-if="contentArray && contentArray.length > 0">
      <div v-for="content in contentArray" :key="content.categoryId">
        <h3 class="title">{{ content.categoryName }}</h3>
        <div class="list">
          <router-link
            :to="{
              path: '/search',
              query: {
                categoryId: item.categoryId
              }
            }"
            v-for="item in content.thirdLevelCategoryVOS"
            :key="item.categoryId"
          >
            <van-image :src="classify" />
            <span>{{ item.categoryName }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.van-search {
  :deep(.van-search__content) {
    border-radius: 20px;
  }
}
.main {
  height: calc(100vh - 96px);
  display: flex;
}
.van-sidebar {
  width: 120px;
  height: 100%;
  background-color: #f7f8fa;
}
.van-sidebar-item {
  padding: 15px 10px;
}
.content {
  width: 255px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .title {
    padding-left: 15px;
    font-size: 16px;
    line-height: 40px;
    margin-bottom: 15px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    a {
      margin-right: 2%;
      margin-bottom: 10px;
      width: 32%;
      .van-image {
        display: block;
        margin: 0 auto;
        width: 30px;
        height: 30px;
      }
      span {
        display: block;
        text-align: center;
        line-height: 30px;
        color: #555;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
