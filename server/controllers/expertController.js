const {Expert} = require('../models/models')

class ExpertController {

  async create(req, res) {
    try {
      const {name, eventId} = req.body
      const existing = await Expert.findOne({where: {name, eventId}})
      if (existing) {
        return res.status(500).json({message: 'Эксперт с таким именем уже существует!'})
      }
      const expert = await Expert.create({name, eventId})
        .then((expert) => {
          const savedId = expert.id
          expert.update({link: `http://localhost:3000/votes/${savedId}`})
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
      const expert = await Expert.findOne({where: {id: req.params.id}})
      return res.json(expert)
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }

  async updateOne(req, res) {
    try {
      const { id } = req.params;
      const { ranking } = req.body;
      const expert = await Expert.update(
        {ranking},
        {where: {id}}
      )
      return res.json(expert)
    } catch
      (e) {
      res.status(500).json(e.message)
    }
  }

  async deleteAllByEvent(req, res) {
    try {
      let {eventId} = req.query
      const experts = await Expert.destroy({where: {eventId}})
      return res.json("Experts were deleted!")

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
}

module
  .exports = new ExpertController()