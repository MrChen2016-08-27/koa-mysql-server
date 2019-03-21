const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const session = require('koa-session-redis');
const config = require('../config');
const staticCache = require('koa-static-cache');
const path = require('path');
// 启动时获取第三方 token 并保存 redis
// require('../tool/token');


// 基本中间件
function base(app) {
    // middlewares
    app.use(staticCache(config.resource.context, {
        preload: true,
        dynamic: true
    }));
    app.use(bodyparser({
        enableTypes:['json', 'form', 'text']
    }));
    app.use(json());
    app.use(logger());
    app.use(staticCache(config.resource.public, {
        preload: true,
        dynamic: true
    }));

    app.use(views(__dirname + '/../views', {
        extension: 'ejs'
    }));

    // logger
    app.use(async(ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    });

    app.use(helmet());

    // koa-session-redis
    app.keys = ['app secret'];
    app.use(session({
        store: {
            host: config.redis.host,
            port: config.redis.port,
            ttl: config.redis.ttl
        }
    }));

}

module.exports = base;