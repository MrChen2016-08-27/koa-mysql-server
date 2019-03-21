const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

// 预生成邀请码列表
const Code = mysqlORM.define('Code', {
    code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        unique: true
    }
})

module.exports = Code
