const moduleApi = require('../dao/module')

exports.getModuleList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    let result = await moduleApi.getModuleList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.getModule = async (ctx, next) => {
    let { id } = ctx.query
    let result = await moduleApi.getModule(id)
    ctx.rest(result)
}

exports.updateModule = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    try {
        await moduleApi.updateModule(params)
    } catch (e) {
        if (e.name == 'SequelizeUniqueConstraintError') {
            if (e.fields.name) {
                throw new ctx.ApiError('module_name_repeat')
            } else if (e.fields.mark) {
                throw new ctx.ApiError('module_mark_repeat')
            }
        }
    }
    ctx.rest(null)
}

exports.addModule = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    let result = null
    try {
        result = await moduleApi.addModule(params)
    } catch (e) {
        if (e.name == 'SequelizeUniqueConstraintError') {
            if (e.fields.name) {
                throw new ctx.ApiError('module_name_repeat')
            } else if (e.fields.mark) {
                throw new ctx.ApiError('module_mark_repeat')
            }
        }
    }
    ctx.rest(result)
}

exports.deleteModule = async (ctx, next) => {
    let { id } = ctx.request.body
    await moduleApi.deleteModule(id)
    ctx.rest(null)
}
