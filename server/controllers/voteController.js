const {Expert} = require('../models/models')

class VoteController {

  async create(req, res) {
    try {
      const expert = await Expert.update({ranking:req.body.ranking},{where:{id:req.params.expertId}})
      return res.json(expert)
    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }


  async getOne(req, res) {
    try {
      //const {id} = req.params
      const expert = await Expert.findOne({where:{id:req.params.expertId}})
      return res.json(expert)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module.exports = new VoteController()