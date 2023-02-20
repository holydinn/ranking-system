const {Event} = require('../models/models')
const ApiError = require('../error/ApiError')

class EventController {
  async create(req, res, next) {
    try {
      const {name, alt_num, exp_num, adminId} = req.body
      const event = await Event.create({name, alt_num, exp_num, adminId})
      return res.json(event)
    } catch (e) {
      next(ApiError.badRequest((e.message)))
    }
  }

  async getAll(req, res, next) {
    try {
      let {adminId, limit, page} = req.query
      page = page || 1
      limit = limit || 20
      let offset = page * limit - limit
      let events

      if (!adminId) {
        events = await Event.findAndCountAll({where: limit, offset})
      } else {
        events = await Event.findAndCountAll({where: {adminId}, limit, offset})
      }

      return res.json(events)
    } catch (e) {
      next(ApiError.badRequest((e.message)))
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      const events = await Event.findOne({where: {id}})
      return res.json(events)
    } catch (e) {
      next(ApiError.badRequest((e.message)))
    }
  }
}

module.exports = new EventController()