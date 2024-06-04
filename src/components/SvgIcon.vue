<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClass"></use>
  </svg>
</template>
<script setup>
// icon-class 是决定用户采用的是哪一张图片
// custorm-class 给icon设置class 可以采用这个字段
const props = defineProps(['icon-class', 'custorm-class'])
const iconClass = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => (props.svgClass ? `icon ${props['custorm-class']}` : 'icon'))
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
