/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

// root:true 当前是根项目的配置
// extends 集成自带的规范
// env 环境 支持哪些语法

// babel/preset -> extends
// babel/plugin -> rules
module.exports = {
  env: {
    browser: true,
    node: true
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    '.eslintrc-auto-import.json'
  ],
  rules: {
    'vue/multi-word-component-names': 0
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
