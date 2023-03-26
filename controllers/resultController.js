const {Event} = require('../models/models')

class ResultController {

  async getAll(req, res) {
    try {

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  }

  async getOne(req, res) {
    try {

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  }
}

module.exports = new ResultController()