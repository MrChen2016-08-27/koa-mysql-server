const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

// 内容
const Content = mysqlORM.define('content', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 标题
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // 描述
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // 内容
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // 栏目ID
    columnId: {
        type: Sequelize.INTEGER
    },
    // 分类ID
    typeId: {
        type: Sequelize.INTEGER
    },
    // 关键字
    keywords: {
        type: Sequelize.STRING
    },
    // 浏览次数
    views: {
        type: Sequelize.STRING
    },
    // 创建用户
    cuser: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // 最后一次修改用户
    muser: {
        type: Sequelize.STRING
    }
})

module.exports = Content
