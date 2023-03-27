const Router = require('express')
const router = new Router()
const adminRouter = require('./adminRouter')
const eventRouter = require('./eventRouter')
const alternativeRouter = require('./alternativeRouter')
const expertRouter = require('./expertRouter')
const resulRouter = require('./resultRoter')


router.use('/admin', adminRouter)
router.use('/event', eventRouter)
router.use('/alternative', alternativeRouter)
router.use('/expert', expertRouter)
router.use('/resul', resulRouter)


module.exports = router