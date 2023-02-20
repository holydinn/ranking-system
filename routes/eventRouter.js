const Router = require('express')
const router = new Router()
const eventController = require('../controllers/eventController')

router.post('/', eventController.create)
router.get('/', eventController.getAll)
router.get('/:id', eventController.getOne)

module.exports = router