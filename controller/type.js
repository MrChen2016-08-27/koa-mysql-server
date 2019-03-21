const typeApi = require('../dao/type')

exports.getTypeList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    let result = await typeApi.getTypeList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.getType = async (ctx, next) => {
    let { id } = ctx.query
    let type = await typeApi.getType(id)
    ctx.rest(type)
}

exports.updateType = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    await typeApi.updateType(params)
    ctx.rest(null)
}

exports.addType = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    let type = await typeApi.addType(params)
    ctx.rest(type)
}

exports.deleteType = async (ctx, next) => {
    let { id } = ctx.request.body
    await typeApi.deleteType(id)
    ctx.rest(null)
}
