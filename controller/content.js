const contentApi = require('../dao/content')

exports.getContentList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    let result = await contentApi.getContentList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.getContent = async (ctx, next) => {
    let { id } = ctx.query
    let content = await contentApi.getContent(id)
    ctx.rest(content)
}

exports.updateContent = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.muser = username
    await contentApi.updateContent(params)
    ctx.rest(null)
}

exports.addContent = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    let content = await contentApi.addContent(params)
    ctx.rest(content)
}

exports.deleteContent = async (ctx, next) => {
    let { id } = ctx.request.body
    await contentApi.deleteContent(id)
    ctx.rest(null)
}
