<script setup>
const isVisible = ref(true)
</script>

<template>
  <!-- wrapper 用来控制是否有底部的padding -->
  <div id="wrapper" :class="{ hasBottom: isVisible }">
    <router-view></router-view>
    <!-- 让navbar组件告诉我是否需要有padding -->
    <NavBar v-model:visible="isVisible"></NavBar>
  </div>
</template>
<style scoped lang="less">
.hasBottom {
  padding-bottom: 50px;
}
</style>
