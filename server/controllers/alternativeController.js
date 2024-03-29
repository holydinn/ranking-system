const {Alternative} = require('../models/models')

class AlternativeController {

  async create(req, res) {
    try {
      const {name, eventId} = req.body
      const existing = await Alternative.findOne({where:{name, eventId}})
      if (existing) {
        return res.status(500).json({ message: 'Участник с таким именем уже существует!' })
      }
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

  async deleteAllByEvent(req, res) {
    try {
      let {eventId} = req.query
      const alts = await Alternative.destroy({where: {eventId}})
      return res.json("Alternatives were deleted!")

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module.exports = new AlternativeController()