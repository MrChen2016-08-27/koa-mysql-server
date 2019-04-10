const router = require('koa-router')()
const content = require('../../controller/content')
router.prefix('/content')

router.post('/add', content.addContent)
router.get('/list', content.getContentList)
router.get('/get', content.getContent)
router.post('/delete', content.deleteContent)
router.post('/update', content.updateContent)

router.post('/my/add', content.addContent)
router.get('/my/list', content.getMyContentList)
router.get('/my/get', content.getMyContent)
router.post('/my/delete', content.deleteMyContent)
router.post('/my/update', content.updateMyContent)

module.exports = router
