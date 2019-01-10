const { sequelize } = require('../models')
const Tag = require('../models/tag')

const findOrCreate = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { name } = req.body

      const result = await Tag.findOrCreate({ where: { name } })

      return res.json(result)
    })

  } catch(error) {
    next(error)
  }

}

const findAll = async (req, res, next) => {
  try {
    const result = await Tag.findAll()

    return res.json(result)

  } catch(error) {
    next(error)
  }

}

module.exports = {
  findOrCreate,
  findAll
}