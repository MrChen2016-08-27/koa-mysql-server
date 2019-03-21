const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

// 预生成邀请码列表
const UserSn = mysqlORM.define('UserSn', {
    sn: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        unique: true
    }
})

module.exports = UserSn
