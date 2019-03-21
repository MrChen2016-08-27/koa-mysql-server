const router = require('koa-router')()
const Role = require('../../controller/role')
router.prefix('/role')

router.post('/add', Role.addRole)
router.post('/delete', Role.deleteRole)
router.get('/list', Role.getRoleList)
router.post('/update', Role.updateRole)
router.get('/get', Role.getRole)
router.get('/all/menus', Role.getAllMenus)

module.exports = router
