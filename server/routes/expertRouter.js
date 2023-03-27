const Router = require('express')
const router=new Router()
const expertController = require('../controllers/expertController')

router.post('/',expertController.create)
router.get('/',expertController.getAll)
router.get('/:id',expertController.getOne)


module.exports = router