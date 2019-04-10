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
    // 封面图
    icon: {
        type: Sequelize.STRING
    },
    // 描述
    description: {
        type: Sequelize.STRING(1234),
        allowNull: false
    },
    // 内容
    content: {
        type: Sequelize.TEXT
    },
    // 来源类型 0.自定义 1.链接
    sourceType: {
        type: Sequelize.INTEGER
    },
    // 来源链接
    source: {
        type: Sequelize.STRING
    },
    // 栏目ID
    columnId: {
        type: Sequelize.INTEGER
    },
    // 栏目子分类Id
    columnTypeId: {
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
