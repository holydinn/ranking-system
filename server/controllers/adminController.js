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
        return res.status(400).json({message: "Ошибка при регистрации", errors})
      }
      const {email, password} = req.body;
      const candidate = await Admin.findOne({where:{email}})
      if (candidate) {
        return res.status(400).json({message: "Пользователь с таким email уже существует"})
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const admin = await Admin.create({email, password: hashPassword})
      const token = generateJwt(admin.id, admin.email)
      return res.status(201).json({token,message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
      res.status(500).json({message: 'Registration error'})
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
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
  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new AdminController()