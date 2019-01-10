const { sequelize } = require('../models')
const Topic = require('../models/topic')
const TopicFeed = require('../models/topic_feed')
const Feed = require('../models/feed')
const Tag = require('../models/tag')
const Refer = require('../models/refer')
const FeedTag = require('../models/feed_tag')
const FeedRefer = require('../models/feed_refer')

const create = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { title, description, contents, access, tags, refers } = req.body

      const feed = await Feed.create({ title, description, contents, access })

      let feedTag = []

      if (tags) {
        tags.forEach(e => { 
          feedTag.push({
            feedIdx: feed.idx,
            tagIdx: e.idx
          })
        })

        await FeedTag.bulkCreate(feedTag, {
          ignoreDuplicates: true
        })

      }

      let feedRefer = []

      if (refers) {
        refers.forEach(e => {
          feedRefer.push({
            feedIdx: feed.idx,
            referIdx: e.idx
          })
        })

        await FeedRefer.bulkCreate(feedRefer, {
          ignoreDuplicates: true
        })

      }

      return res.json(feed);
    })

  } catch(error) {
    next(error)
  }

}

const update = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { idx } = req.params

      let { title, description, contents, access, tags, refers } = req.body

      const data = await Feed.findByPk(idx)

      await Feed.update({ title, description, contents, access }, { where: { idx }})

      if (data.title !== title) {
        const query = `
          select
          *
          from topic_feed tf, topic tp
          where feedIdx = :idx
          and tf.topicIdx = tp.idx
        `
        let topic = await TopicFeed.sequelize.query(query, { replacements: { idx } })

        for(let i = 0; i < topic.length; i++) {
          let el = topic[0][i]
          if(el) {
            el.contents = el.contents.replace(`[${data.title}](/devlog/feed/${idx})`, `[${title}](/devlog/feed/${idx})`)
            let contents = el.contents
            await Topic.update({contents}, { where: { idx: el.idx } })
          }
        }
        
      }

      let feedTag = []

      if (tags) {
        tags.forEach(e => { 
          feedTag.push({
            feedIdx: idx,
            tagIdx: e.idx
          })
        })

        await FeedTag.destroy({
          where: { feedIdx: idx }
        })

        await FeedTag.bulkCreate(feedTag, {
          ignoreDuplicates: true
        })

      }

      let feedRefer = []

      if (refers) {
        refers.forEach(e => {
          feedRefer.push({
            feedIdx: idx,
            referIdx: e.idx
          })
        })

        await FeedRefer.destroy({
          where: { feedIdx: idx }
        })

        await FeedRefer.bulkCreate(feedRefer, {
          ignoreDuplicates: true
        })

      }

      return res.json({ idx });
    })

  } catch(error) {
    next(error)
  }

}

const findByPk = async (req, res, next) => {
  let { idx } = req.params

  const query = `
      select
      IFNULL((SELECT idx FROM feed WHERE idx < :idx AND access = 1 ORDER BY idx DESC LIMIT 1), 0) AS prev
      ,IFNULL((SELECT idx FROM feed WHERE idx > :idx AND access = 1 ORDER BY idx LIMIT 1), 0) AS next
      from feed
      where idx = :idx
    `
  const page = await Feed.sequelize.query(query, { replacements: { idx } })

  const result = await Feed.findByPk(idx, {
    include: [{ model: Tag, as: 'tags' }, { model: Refer, as: 'refers' }]
  })
  return res.json({feed: result, page: page[0][0]})
}

const findAll = async (req, res, next) => {
  const result = await Feed.findAll()
  return res.json(result)
}

const findAndCountAll = async (req, res, next) => {
  try {
    let { limit } = req.query
    
    const result = await Feed.findAndCountAll({
      order: [['idx', 'DESC']],
      limit: parseInt(limit)
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
  findAll,
  findAndCountAll
}