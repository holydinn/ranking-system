const {Expert} = require('../models/models')

class ExpertController {

  async create(req, res) {
    try {
      const {name, eventId} = req.body
      const expert = await Expert.create({name, eventId})
        .then((expert)=>{
          const savedId=expert.id
          expert.update({link:`http://localhost:3000/votes/${savedId}`})
        })

      return res.json(expert)
    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }

  async getAll(req, res) {
    try {
      let {eventId} = req.query
      const experts = await Expert.findAll({where: {eventId}})
      return res.json(experts)

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }

  async getOne(req, res) {
    try {
      //const {id} = req.params
      const expert = await Expert.findOne({where:{id:req.params.id, eventId:req.body.eventId}})
      return res.json(expert)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module.exports = new ExpertController()