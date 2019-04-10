const reviewApi = require('../dao/review')
const { maxContentReview } = require('./review/config');

exports.addReviewContent = async (ctx, next) => {
    let params = ctx.request.body
    let { username } = ctx.state.user.data;
    if (!params.contentId) {
        return;
    }
    params.reviewUser = username;
    // const results = await reviewApi.getLastReview(params.contentId);
    const review = await reviewApi.addReview(params)
    const reviewList = await reviewApi.getEarliestReview(params.contentId, maxContentReview + 1)
    // 只保留最近的 maxReview 条审核记录
    if (reviewList.length > maxContentReview) {
        await reviewApi.deleteReview(reviewList[0].id);
    }
    ctx.rest(review);
}
