## 删除目录

- 移除 assets 资源文件
- 移除 components 目录下的所有组件
- 删除 router 中的路由配置，页面的配置
- 移除 stores 中的状态管理
- 移除 views 下的所有页面组件
- app.vue 中删除 没用的信息
- main.js 中移除导入的 css 文件

## 项目需要的 vscode 插件

- eslint 插件保证代码是正确的，符合规范
- prettier 可以帮助我们格式化代码的
- 需要配置格式化的方式 设置-》 formatter (配置什么时候来做 format)
- 配置右键的格式化，全部使用 prettier 来做代码格式化

- .eslintrc.cjs
- .prettierrc.json

## 支持 pxtoRem

- pnpm i lib-flexible # 引入样式
  pnpm i postcss-pxtorem -D

## 配置组件的按需导入

## 配置方法的按需导入

```js
import AutoImport from 'unplugin-auto-import/vite'

AutoImport({
  // vue  vue-router pinia 中的方法都不需要手动的import 直接使用方法即可
  imports: ['vue', 'vue-router', 'pinia'],
  eslintrc: {
    // 第一次运行dev的时候 需要将enabled 改为true，会生产一个eslint文件， 改为false防止浪费性能
    enabled: false // 开启后，生成eslint配置文件;
  }
})
```

将文件引入到 eslintrc 中 extends 中 配置此文件，则后续不要在导入引入了

## 每次提交前要执行

```shell
git init # git 仓库初始化
pnpm install husky -D # 安装 husky 包 做添加git钩子的
npm pkg set scripts.prepare="husky install" # 设置 prepare 命令脚本
pnpm prepare # 执行 prepare 命令 , 生产git钩子
npx husky add .husky/pre-commit "pnpm lint" # 添加提交钩子，在提交前做校验
```
