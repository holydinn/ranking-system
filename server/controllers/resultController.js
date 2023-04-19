const {Event} = require('../models/models')

class ResultController {

  async getAll(req, res) {
    try {
      const events = await Event.findAll({where: {adminId: req.user.id}})
      return res.json(events)

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }

  async getOne(req, res) {
    try {
      const event = await Event.findOne({where:{id:req.params.id, adminId: req.user.id}})
      return res.json(event)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module.exports = new ResultController()