const {Alternative} = require('../models/models')

class AlternativeController {

  async create(req, res) {
    try {
      const {name, eventId} = req.body
      const alternative = await Alternative.create({name, eventId})
      return res.json(alternative)
    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }

  async getAll(req, res) {
    try {
      let {eventId} = req.query
      const alts = await Alternative.findAll({where: {eventId}})
      return res.json(alts)

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }

  async getOne(req, res) {
    try {
      const {id} = req.params
      const alt = await Alternative.findOne({where:{id}})
      return res.json(alt)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module.exports = new AlternativeController()