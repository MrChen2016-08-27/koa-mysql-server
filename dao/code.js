const models = require('../model')

exports.addCode = async code => {
    let result = await models.Code.create({
        code
    })
    return result.code
}

exports.getCode = async () => {
    return await models.Code.findOne({
        where: {
            userId: {
                $eq: null
            }
        }
    })
}

exports.updateCode = async (code, userId, opt) => {
    return await models.Code.update(
        {
            userId
        },
        {
            where: {
                code: {
                    $eq: code
                }
            },
            ...opt
        }
    )
}
