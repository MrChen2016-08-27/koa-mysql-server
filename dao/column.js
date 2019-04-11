const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getColumnList = async ({
    pageNumber = 0,
    pageSize = 10,
    keyword,
    moduleMark
}) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    let whereOptions = {}
    if (moduleMark) {
        whereOptions.moduleMark = moduleMark
    }
    return await models.Column.findAndCountAll({
        where: {
            name: {
                [Op.like]: keyword
            },
            ...whereOptions
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']]
    })
}

exports.getColumn = async id => {
    let column = await models.Column.findById(id)
    return column
}

exports.updateColumn = async ({ id, name, moduleMark, cuser }) => {
    return await models.Column.update(
        {
            name,
            moduleMark,
            cuser
        },
        {
            where: {
                id
            }
        }
    )
}

exports.deleteColumn = async id => {
    return await models.Column.destroy({
        where: {
            id
        }
    })
}

exports.addColumn = async ({ name, moduleMark, cuser }) => {
    return await models.Column.create({
        name,
        moduleMark,
        cuser
    })
}
