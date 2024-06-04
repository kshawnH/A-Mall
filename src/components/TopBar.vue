<template>
  <van-nav-bar left-arrow @click-left="router.back()">
    <template #title>
      <slot name="title">
        {{ title || $route.meta.title }}
      </slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>
<script setup>
defineProps(['title'])
const router = useRouter()
</script>
