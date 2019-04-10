const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

const Review = mysqlORM.define('Review', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contentId: {
        type: Sequelize.INTEGER,
    },
    // 审核状态 -1 未通过, 1.审核中, 2.已通过
    status: {
        type: Sequelize.INTEGER,
    },
    // 审核意见
    opinion: {
        type: Sequelize.TEXT
    },
    // 备注
    remark: {
        type: Sequelize.TEXT
    },
    // 审核人
    reviewUser: {
        type: Sequelize.STRING
    }
});

module.exports = Review