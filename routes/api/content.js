const router = require('koa-router')()
const content = require('../../controller/content')
router.prefix('/content')

router.post('/add', content.addContent)
router.get('/list', content.getContentList)
router.get('/get', content.getContent)
router.post('/delete', content.deleteContent)
router.post('/update', content.updateContent)

module.exports = router
