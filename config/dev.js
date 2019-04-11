const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')

module.exports = {
    server: {
        port: 3000
    },
    api: {
        baseUrl: '',
        baseUrl2: '',
        baseUrl3: '',
        // 支付宝
        payUrl: ''
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        ttl: 7200
    },
    mysql: {
        database: 'test',
        username: 'root',
        password: 'xxxxxx',
        host: 'xxxxxxx',
        port: '3306',
        pool: {
            max: 20,
            min: 0,
            idle: 10000
        },
        logging: false
    },
    jwt: {
        secret: 'jwt-secret',
        expiresIn: '24h'
    },
    apiFilter: [
        // /^\/^(api)+/,
        // /^\/api/,
        /^\/api\/user\/admin/,
        /^\/public/,
        /^\/api\/user\/register/,
        /^\/api\/user\/login/,
        /^\/api\/user\/getKey/,
        /^\/page\/auth/,
        /^\/page/
        // /^\/$/
    ],
    file: {
        wwww: '/file_dist',
        local: 'public/file_dist'
    },
    image: {
        wwww: '/img_dist',
        local: 'public/img_dist'
    },
    upload: {
        file: 'public/file_dist'
    },
    https: {
        key: '',
        cert: '',
        port: 443
    },
    // 资源配置, 路径相对于/middleware, 可以使用绝对路径
    resource: {
        context: 'xxx',
        public: 'public'
    },
    // api 权限
    apiKeys: ['增加', '删除', '修改', '查询']
}
