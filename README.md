## 仿 QQ 音乐

### 简介

* 移动 web 端模仿 QQ 音乐，采用原生 JS 实现推荐页、排行榜页和搜索页
* 数据通过伪造请求获取 QQ 音乐的数据，实现推荐页、排行榜页和搜索页的同步
* 播放器页面显示可以进行播放、暂停、循环播放以及歌词同步高亮显示
* 采用模块化的思想实现: Tab组件、推荐页组件、排行榜组件、搜索组件、播放器组件、歌词组件和进度条组件
* 待实现：歌单页面
* 首页轮播采用第三方组件swiper，图片加载采用 lazyload，对于滚动优化使用 throttle 函数

### 技术栈

ES6 + Webpack + Sass + Nodejs + Express + Cors + Request 

### 安装

1. 将项目克隆到本地
```
git@github.com:Pegggy/QQmusic.git
```
2. 安装依赖
```
npm install
```
3. 启动本地后台服务器
```
node server.js &
```
4. 启动项目
```
npm run server
```

**说明**

* 启动本地后台服务器后可以退出(ctrl + c)，因为 `&` 操作使 server.js 仍然运行，只是 bash 界面被释放出来了，可以进行其他操作。
* server.js 的服务器端口为4000，当前端进行数据获取时存在跨域，因此引入 CORS 解决跨域问题。

**其他命令**
```
## 将 scss 文件夹下实时 app.scss 编译到 css 文件夹下
npm run css

## 将 scripts 文件夹下 app.js 文件编译到 dist 夹下
npm run build 
```
