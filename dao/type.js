const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getTypeList = async ({
    pageNumber = 0,
    pageSize = 10,
    keyword,
    columnId
}) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    return await models.Type.findAndCountAll({
        where: {
            name: {
                [Op.like]: keyword
            },
            columnId: columnId ? columnId : null
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']]
    })
}

exports.getType = async id => {
    let column = await models.Type.findById(id)
    return column
}

exports.updateType = async ({ id, name, columnId, cuser }) => {
    return await models.Type.update(
        {
            name,
            cuser,
            columnId
        },
        {
            where: {
                id
            }
        }
    )
}

exports.deleteType = async id => {
    return await models.Type.destroy({
        where: {
            id
        }
    })
}

exports.addType = async ({ name, cuser, columnId }) => {
    return await models.Type.create({
        name,
        columnId,
        cuser
    })
}
