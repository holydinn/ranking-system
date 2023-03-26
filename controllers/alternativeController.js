const {Alternative} = require('../models/models')

class AlternativeController {

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

module.exports = new AlternativeController()