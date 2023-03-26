const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {Admin} = require('../models/models')

const generateJwt = (id, email) => {
  return jwt.sign(
    {id, email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class AdminController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        //next(ApiError.badRequest("Ошибка при регистрации"))
        return res.status(400).json({message: "Ошибка при регистрации", errors})
      }
      const {email, password} = req.body;
      const candidate = await Admin.findOne({where:{email}})
      if (candidate) {
        //return next(ApiError.badRequest("Пользователь с таким именем уже существует"))
        return res.status(400).json({message: "Пользователь с таким email уже существует"})
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const admin = await Admin.create({email, password: hashPassword})
      await admin.save()
      return res.status(201).json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
      //next(ApiError.internal("Registration error"))
      res.status(500).json({message: 'Registration error'})
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        //next(ApiError.badRequest("Ошибка при регистрации"))
        return res.status(400).json({message: "Введены некорректные данные", errors})
      }
      const {email, password} = req.body
      const admin = await Admin.findOne({where: {email}})
      if (!admin) {
        return res.status(400).json({message: `Пользователь не найден`})
      }
      const validPassword = await bcrypt.compare(password, admin.password)
      if (!validPassword) {
        return res.status(400).json({message: `Введен неверный пароль`})
      }
      const token = generateJwt(admin.id, admin.email)
      return res.json({token})
    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Login error'})
    }
  }
}

module.exports = new AdminController()