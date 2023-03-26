const {Event} = require('../models/models')

class EventController {
  async create(req, res) {
    try {
      const {name} = req.body
      const event = await Event.create({name, adminId: req.user.id})
      return res.json(event)
    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }

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
      //const {id} = req.params
      const event = await Event.findOne({where:{id:req.params.id, adminId: req.user.id}})
      return res.json(event)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module.exports = new EventController()