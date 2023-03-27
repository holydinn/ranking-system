const Router = require('express')
const router=new Router()
const alternativeController=require('../controllers/alternativeController')

router.post('/',alternativeController.create)
router.get('/',alternativeController.getAll)
router.get('/:id',alternativeController.getOne)

module.exports = router