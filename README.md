## Vue 3 + TypeScript + Vite
### 初始化
#### git
git init
#### 删除无用组件
#### 配置别名@
vite.config.ts中配置
tsconfig.json中配置
### 项目结构
src
	api
	assets
	components
	config
	hooks
	plugins
	router
	store
	types
	utils
	views
### 安装相关工具
#### Vue
```bash
yarn add pinia
# or with npm
npm install pinia
```
```bash
yarn add vue-router@4
npm install vue-router@4
```
```bash
npm install axios
yarn add axios
```
#### UI 框架
```bash
npm install element-plus --save
yarn add element-plus
```
#### 样式
```bash
# 格式化样式
npm install --save normalize.css
# main.js/ts 引入
import 'normalize.css/normalize.css'
```
```bash
npm install postcss-px-to-viewport --save-dev
yarn add -D postcss-px-to-viewport
```
```bash
npm i autoprefixer -D
```
```bash
npm i sass -D
```
#### 工具
```bash
npm i js-cookie
```
```bash
npm install dayjs --save
```
```bash
npm i --save lodash
```
```bash
# 浏览器唯一标识
npm i @fingerprintjs/fingerprintjs
```
```bash
npm i jwt-decode
```
#### 便捷
```bash
# 自动引入vue api
npm i -D unplugin-auto-import
```
```bash
# 自动引入vue组件
npm i unplugin-vue-components -D
```
