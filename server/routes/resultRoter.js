const Router = require('express')
const router = new Router()
const resultController=require('../controllers/resultController')
const auth = require("../middleware/authMiddleware");


router.get('/',auth,resultController.getAll)
router.get('/:id',auth,resultController.getOne)


module.exports = router