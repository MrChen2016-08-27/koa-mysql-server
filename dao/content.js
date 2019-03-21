const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getContentList = async ({
    pageNumber = 0,
    pageSize = 10,
    keyword,
    columnId,
    typeId
}) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    let options = {}
    if (columnId) {
        options.columnId = columnId
    }
    if (typeId) {
        options.typeId = typeId
    }
    return await models.Content.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: keyword
                    }
                },
                {
                    description: {
                        [Op.like]: keyword
                    }
                },
                {
                    content: {
                        [Op.like]: keyword
                    }
                },
                {
                    cuser: {
                        [Op.like]: keyword
                    }
                },
                {
                    muser: {
                        [Op.like]: keyword
                    }
                },
                {
                    keywords: {
                        [Op.like]: keyword
                    }
                }
            ],
            ...options
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']]
    })
}

exports.getContent = async id => {
    let column = await models.Content.findById(id)
    return column
}

exports.updateContent = async ({
    id,
    title,
    description,
    content,
    columnId,
    typeId,
    keywords,
    logo,
    muser
}) => {
    return await models.Content.update(
        {
            title,
            description,
            content,
            columnId,
            typeId,
            keywords,
            logo,
            muser
        },
        {
            where: {
                id
            }
        }
    )
}

exports.addContentView = async id => {
    let content = await models.Content.findById(id)
    content.views = Number(content.views) + 1
    content.save()
}

exports.deleteContent = async id => {
    return await models.Content.destroy({
        where: {
            id
        }
    })
}

exports.addContent = async ({
    title,
    description,
    content,
    columnId,
    typeId,
    keywords,
    logo,
    cuser
}) => {
    return await models.Content.create({
        title,
        description,
        content,
        columnId,
        typeId,
        keywords,
        logo,
        cuser
    })
}
