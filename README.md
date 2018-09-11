# 准备工作


# 开发排期，工作顺序
1. 换肤机制设计
2. 首页布局通过数据渲染组件设计 以及首页组件开发
3. 商品列表页
4. 商品详情以及购买流程
5. 我的订单
6. 优惠券
7. 签到


# 前言




# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── alertTip.vue                    // 弹出框组件
│   │   ├── footer
│   │   │   └── footGuide.vue                   // 底部公共组件
│   │   └── header
│   │       └── head.vue                        // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── page
│   │   ├── msite
│   │   │   └── msite.vue                       // 首页
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│       └── swiper.min.css
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

56 directories, 203 files
```

# 隧道代理
./ngrok -config ngrok.cfg -subdomain saas_watch 8072


# 预览
http://saas_watch.tunnel.qydev.com


系统win10 :
1.下载apache服务器
2.cmd进入apache安装目录的bin文件夹
3.开始玩测试：ab -n1000 -c10 http://saas_watch.tunnel.qydev.com

./ab -n1000 -c10 http://saas_watch.tunnel.qydev.com

./ab -n1000 -c10 http://localhost:8072/

-n1000是说总的请求数是1000个它默认值是1，

-c10 这是说并发数是10默认值也是1

http://localhost:2017/
是输入要测试的地址，注意地址后面需要加斜线

-t是用来测试进行总时间，
-p是post的数据文件
-w是以html表格的格式输出结果




SlimAdam
samured.com


samuredwonder
Dmc741456

Token值：ed214e7d7cddda0b6f449da56e342f82