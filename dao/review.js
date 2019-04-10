const models = require('../model')
const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')
const Op = Sequelize.Op

exports.getReviewList = async ({
    pageNumber = 0,
    pageSize = 10,
    keyword,
    contentId,
    reviewUser,
    status,
}) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    let options = {}
    if (contentId) {
        options.contentId = contentId
    }
    if (status) {
        options.status = status
    }
    if (reviewUser) {
        options.reviewUser = reviewUser
    }
    return await models.Review.findAndCountAll({
        where: {
            ...options
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']]
    })
}


exports.updateReview = async ({
    id,
    contentId,
    status,
    opinion,
    remark,
    reviewUser
}) => {
    return await models.Review.update(
        {
            contentId,
            status,
            opinion,
            remark,
            reviewUser
        },
        {
            where: {
                id,
            }
        }
    )
}

// 返回最早指定条数记录
exports.getEarliestReview = async (contentId, limit) => {
    return await models.Review.findAll({
        attributes: [ 'id', 'createdAt' ],
        where: {
            contentId,
        },
        order: [['createdAt', 'ASC']],
        limit
    })
}

exports.deleteReview = async (id) => {
    return await models.Review.destroy({
        where: {
            id
        }
    })
}

exports.addReview = async ({
    contentId,
    status,
    opinion,
    remark,
    reviewUser
}) => {
    return await models.Review.create({
        contentId,
        status,
        opinion,
        remark,
        reviewUser
    })
}
