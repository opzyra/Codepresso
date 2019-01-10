const { sequelize } = require('../models')
const Refer = require('../models/refer')

const ogs = require('open-graph-scraper');

const create = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { url } = req.body

      const { data } = await ogs({ url, encoding: 'utf8' })
      
      const title = data.ogTitle
      const image = data.ogImage.url
      const description = data.ogDescription
      
      const result = await Refer.findOrCreate({ where: { title, url, image, description } })

      return res.json(result)
    })

  } catch(error) {
    next(error)
  }

}

module.exports = {
  create
}