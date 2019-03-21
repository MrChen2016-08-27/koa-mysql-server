const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

const Type = mysqlORM.define('type', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    columnId: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // 最后一次修改用户
    cuser: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Type
