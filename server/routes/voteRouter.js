const Router = require('express')
const router = new Router()
const voteController=require('../controllers/voteController')

router.get('/:expertId',voteController.getOne)
router.post('/:expertId',voteController.create)


module.exports = router