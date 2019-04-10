# koa-mysql-server

> 基于 koa-generator 改良后的项目，修改了一部分结构，添加了session,redis,以及安全性(helmet, rsa)配置

> 示范中的登录加密解密与的前端方面模板搭配请参考 [vueAdmin](https://github.com/MrChen2016-08-27/vueAdmn)

* koa2
* koa-router
* helmet
* node-rsa
* koa-session-redis
* koa-body
* sequelize

### 部分目录结构说明

* config (项目配置文件)
    * errorCode.js (错误码映射列表)
* controller (对应路由映射的控制层, 调用dao层)
* dao (使用 orm 对model操作)
* middleware (中间件)
    * authority.js (权限控制, session过滤api 和 page)
    * base.js (基本中间件)
    * rest.js (对于rest api的一些配置与错误处理)
    * router.js (路由中间件配置)
* model (定义数据库模型)
* public (公共静态文件, js,css,img..静态文件)
* routes (路由，对路由列表的配置，通常对应 controller)
    * api (提供 api 接口)
    * page (提供 需要 seo 的页面 ejs 渲染路由)
* tool (工具)
    * rsa.js (node-rsa 加密封装)
    * upload (文件上传, 目前已废弃，具体参考 router -> api -> fileupload)
    * token (每隔一段时间定时获取第三方tokens, 在 middleware/base.js 下取消注释开启)
    * redis
    * redis_tool (快捷操作 redis, promise封装)

> 关于 rsa 加密方式
    具体参考 tool/rsa.js 前端(请参考 [vueAdmin](https://github.com/MrChen2016-08-27/vueAdmn))页面加载时请求 getKey 接口， 生成key存于 session 并返回给前端, 前端通过 JSEncrypt 将key存储，最后登录时将 key 和 密码 加密后给服务端

> 注意事项
    安全起见，项目 config 中记得修改 mysql 配置 以及 自定义 jwt 的 secret 加密密钥




