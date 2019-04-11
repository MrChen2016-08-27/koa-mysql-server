const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

const Column = mysqlORM.define('column', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    moduleMark: {
        type: Sequelize.INTEGER
    },
    // 最后一次修改用户
    cuser: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Column
