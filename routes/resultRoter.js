const Router = require('express')
const router = new Router()
const resultController=require('../controllers/resultController')


router.get('/result',resultController.getAll)
router.get('/result/:id',resultController.getOne)


module.exports = router