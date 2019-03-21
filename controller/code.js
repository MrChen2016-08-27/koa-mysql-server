const codeApi = require('../dao/code')

/**
 * 预添加邀请码
 */
exports.addCode = async (ctx, next) => {
    // 添加个数
    let { count } = ctx.request.body
    let i = 0
    let resultList = []
    await addCode()
    async function addCode() {
        let result = await createUniqueCode()
        if (i < count) {
            resultList.push(result)
            i++
            await addCode()
        }
    }
    ctx.rest({
        resultList
    })
}

/**
 * @desc 生成唯一的邀请码列表
 * @param {Number} codeLength 邀请码位数，默认为4
 */
async function createUniqueCode(codeLength = 4) {
    // 生成结果
    let result = ''
    let codeList =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    codeList = codeList.split('')
    // 生成随机码
    for (let i = 0; i < codeLength; i++) {
        let position = parseInt(Math.random() * 62)
        result += String(codeList[position])
    }
    try {
        return await codeApi.addCode(result)
    } catch (e) {
        return createUniqueCode()
    }
}
