const Router = require('express')
const router = new Router()
const eventController = require('../controllers/eventController')
const auth = require('../middleware/authMiddleware.js')

router.post('/', auth, eventController.create)
router.get('/',  auth, eventController.getAll)
router.get('/:id', auth, eventController.getOne)
router.get('/vote/:id',eventController.getByExpertId)
router.delete('/:id',auth,eventController.deleteOne )


module.exports = router