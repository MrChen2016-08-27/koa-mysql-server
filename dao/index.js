const Sequelize = require('sequelize')
const { mysql } = require('../config/index')
module.exports = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    port: mysql.port,
    pool: mysql.pool,
    logging: mysql.logging,
    // 是否将undefined转化为NULL
    // - 默认: false
    omitNull: true
})
