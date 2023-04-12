const Router = require('express')
const router = new Router()
const adminController=require('../controllers/adminController')
const {check} = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration',[
    check('email', "Некорректный email").isEmail(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
  ], adminController.registration)
router.post('/login',adminController.login)
router.get('/auth', authMiddleware, adminController.check)

module.exports = router