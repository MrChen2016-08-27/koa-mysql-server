const router = require('koa-router')()
const content = require('../../controller/content')
const review = require('../../controller/review')

router.prefix('/review')

router.get('/content/list', content.getReviewContentList)
router.get('/content/get', content.getReviewContent)
router.post('/content/add', review.addReviewContent)

module.exports = router;