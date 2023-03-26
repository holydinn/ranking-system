const {Expert} = require('../models/models')

class ExpertController {

  async getAll(req, res, next) {
    try {

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  }

  async getOne(req, res, next) {
    try {

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  }
}

module.exports = new ExpertController()