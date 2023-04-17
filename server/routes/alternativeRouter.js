const Router = require('express')
const router=new Router()
const alternativeController=require('../controllers/alternativeController')

router.post('/',alternativeController.create)
router.get('/',alternativeController.getAll)
//router.get('/eventId',alternativeController.getByEvent)
router.get('/:id',alternativeController.getOne)
router.delete('/',alternativeController.deleteAllByEvent)

module.exports = router