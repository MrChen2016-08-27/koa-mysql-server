const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

const Module = mysqlORM.define('module', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 标识
    mark: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    // 最后一次修改用户
    cuser: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Module
