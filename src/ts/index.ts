import '../less/global.less'

import { env, logger, LogLevel, Router } from 'winged'

// NOTE: 如果要关闭懒加载，将下面一行取消注释
// import './allComponents'

declare namespace window {
  let router: Router | undefined
}

// NOTE: for parcel hmr support
if (window.router) {
  window.router.destroy()
}

env.setTarget('web')
logger.setLevel(LogLevel.INFO)

window.router = new Router({
  // NOTE: 使用懒加载，异步初始化页面
  '/': async () => (await import(/* webpackChunkName: "HomePage" */'./pages/HomePage')).HomePage,

  // NOTE: 如果不需要使用懒加载，则页面应该使用同步方式初始化。同步方式
  // '/': HomePage
})
