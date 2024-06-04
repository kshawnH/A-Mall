import { queryCategories } from '@/api'
export const useCategoryStore = defineStore('category', () => {
  const list = ref([]) // 默认所有分类的信息
  async function getCategories() {
    // 获取分类将获取的数据保存到list变量中
    list.value = await queryCategories()
  }
  return { list, getCategories }
})
