const contentApi = require('../dao/content')
const reviewApi = require('../dao/review')
const { maxContentReview } = require('./review/config');

exports.getContentList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    delete params.username
    let result = await contentApi.getContentList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.getReviewContentList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    delete params.username
    let result = await contentApi.getReviewContentList(params)
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

exports.getReviewContent = async (ctx, next) => {
    let { id } = ctx.query
    let content = await contentApi.getContent(id)
    ctx.rest(content)
}

exports.updateContent = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.muser = username
    delete params.username
    await contentApi.updateContent(params)
    // 增加审核中记录
    await reviewApi.addReview({
        contentId: params.id,
        status: 1
    })
    const reviewList = await reviewApi.getEarliestReview(params.id, maxContentReview + 1)
    // 只保留最近的 maxContentReview 条审核记录
    if (reviewList.length > maxContentReview) {
        await reviewApi.deleteReview(reviewList[0].id);
    }
    ctx.rest(null)
}

exports.addContent = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    delete params.username
    let content = await contentApi.addContent(params)
    await reviewApi.addReview({
        contentId: content.id,
        status: 1
    })
    const reviewList = await reviewApi.getEarliestReview(content.id, maxContentReview + 1)
    if (reviewList.length > maxContentReview) {
        await reviewApi.deleteReview(reviewList[0].id);
    }
    ctx.rest(content)
}

exports.deleteContent = async (ctx, next) => {
    let { id } = ctx.request.body
    await contentApi.deleteContent(id)
    ctx.rest(null)
}

exports.getMyContentList = async (ctx, next) => {
    let { username } = ctx.state.user.data
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    params.username = username
    let result = await contentApi.getContentList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.getMyContent = async (ctx, next) => {
    let { username } = ctx.state.user.data
    let { id } = ctx.query
    let content = await contentApi.getContent(id, username)
    ctx.rest(content)
}

exports.updateMyContent = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.muser = username
    params.username = username
    await contentApi.updateContent(params)
    await reviewApi.addReview({
        contentId: params.id,
        status: 1
    })
    const reviewList = await reviewApi.getEarliestReview(params.id, maxContentReview + 1)
    if (reviewList.length > maxContentReview) {
        await reviewApi.deleteReview(reviewList[0].id);
    }
    ctx.rest(null)
}

exports.deleteMyContent = async (ctx, next) => {
    let { id } = ctx.request.body
    const { username } = ctx.state.user.data
    await contentApi.deleteContent(id, username)
    ctx.rest(null)
}
