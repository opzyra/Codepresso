const { sequelize } = require('../models')
const Topic = require('../models/topic')
const Feed = require('../models/feed')
const TopicFeed = require('../models/topic_feed')

const create = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { title, description, contents, thumbnail, access, feeds } = req.body

      const topic = await Topic.create({ title, description, contents, thumbnail, access })

      let topicFeed = []

      if (feeds) {
        feeds.forEach(e => { 
          topicFeed.push({
            topicIdx: topic.idx,
            feedIdx: e.idx
          })
        })
  
        await TopicFeed.bulkCreate(topicFeed, {
          ignoreDuplicates: true
        })
      }

      return res.json(topic);
    })

  } catch(error) {
    next(error)
  }

}

const update = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { idx } = req.params

      let { title, description, contents, thumbnail, access, feeds } = req.body

      const topic = await Topic.update({ title, description, contents, thumbnail, access }, { where: { idx }})

      let topicFeed = []

      if (feeds) {

        await TopicFeed.destroy({
          where: { topicIdx: idx }
        })

        feeds.forEach(e => { 
          topicFeed.push({
            topicIdx: idx,
            feedIdx: e.idx
          })
        })
  
        await TopicFeed.bulkCreate(topicFeed, {
          ignoreDuplicates: true
        })
      }
      
      return res.json({idx})
    })

  } catch(error) {
    next(error)
  }

}

const findByPk = async (req, res, next) => {
  try {
    let { idx } = req.params
    const result = await Topic.findByPk(idx, {
      include: [{ model: Feed, as: 'feeds' }]
    })
    const query = `
      select
      IFNULL((SELECT idx FROM topic WHERE idx < :idx AND access = 1 ORDER BY idx DESC LIMIT 1), 0) AS prev
      ,IFNULL((SELECT idx FROM topic WHERE idx > :idx AND access = 1 ORDER BY idx LIMIT 1), 0) AS next
      from topic
      where idx = :idx
    `
    const page = await Topic.sequelize.query(query, { replacements: { idx } })

    return res.json({ topic: result, page: page[0][0] })

  } catch(error) {
    next(error)
  }
}

const findAndCountAll = async (req, res, next) => {
  try {
    let { limit, offset } = req.query
    
    const result = await Topic.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset) - 1
    })

    return res.json(result)

  } catch(error) {
    next(error)
  }
}

module.exports = {
  create,
  update,
  findByPk,
  findAndCountAll
}