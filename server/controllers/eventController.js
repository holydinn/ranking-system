const {Event, Expert} = require('../models/models')

class EventController {
  async create(req, res) {
    try {
      const {name} = req.body
      const existing = await Event.findOne({where:{name:req.body.name, adminId: req.user.id}})
      if (existing) {
        return res.status(500).json({ message: 'Мероприятие с таким именем уже существует!' })
      }
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
  async getByExpertId(req, res) {
    try {
      let {id} = req.params
      const expert = await Expert.findOne({where:{id}})
      const event = await Event.findOne({where:{id: expert.eventId}})
      return res.json(event)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async deleteOne(req, res) {
    try {
      const event = await Event.destroy({where:{id:req.params.id, adminId: req.user.id}})
      return res.json("Event was deleted!")
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module.exports = new EventController()