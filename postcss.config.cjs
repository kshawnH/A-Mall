module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootvalue是根据设计稿来计算的   vant在设计的时候 设计稿用的是375px
      rootValue: 37.5, // Vant 官方根字体大小是 37.5
      propList: ['*'] // 支持哪些属性的转换 
    }
  }
}
