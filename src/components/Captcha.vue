<template>
  <canvas :width="width" :height="height" ref="canvas" @click="generateCaptcha"></canvas>
</template>
<script setup>
const width = 120
const height = 30
function getRandom() {
  let str = 'abcdefgghijklmnopqrstuvwxyz'
  str += str.toUpperCase()
  str += '0123456789'

  let idx = 0
  let status = ''
  while (idx < 4) {
    status += str[Math.round(Math.random() * 61)]
    idx++
  }
  return status
}
const canvas = ref(null)

const emit = defineEmits(['update:text'])
function generateCaptcha() {
  const context = canvas.value.getContext('2d')
  context.clearRect(0, 0, width, height)
  context.fillStyle = '#00f'
  context.font = 'italic 30px 黑体'
  context.textBaseline = 'top'
  const text = getRandom()
  context.fillText(text, 10, 0)

  for (let i = 0; i < 4; i++) {
    context.beginPath()
    context.moveTo(Math.random() * width, Math.random() * height)
    context.lineTo(Math.random() * width, Math.random() * height)
    context.strokeStyle = '#005588'
    context.stroke()
  }
  emit('update:text', '1111' || text)
}

defineExpose({
  reset: generateCaptcha
})
onMounted(() => {
  generateCaptcha()
})
</script>
