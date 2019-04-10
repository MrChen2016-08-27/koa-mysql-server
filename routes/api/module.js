const router = require('koa-router')()
const moduleC = require('../../controller/module')
router.prefix('/module')

router.post('/add', moduleC.addModule)
router.get('/list', moduleC.getModuleList)
router.get('/get', moduleC.getModule)
router.post('/delete', moduleC.deleteModule)
router.post('/update', moduleC.updateModule)

module.exports = router
