const { sequelize } = require('../models')
const Comment = require('../models/comment')
const Account = require('../models/account')

const cleanXss = data => {
  return data.replace(/\&/g, '&amp;')
  .replace(/\</g, '&lt;')
  .replace(/\>/g, '&gt;')
  .replace(/\"/g, '&quot;')
  .replace(/\'/g, '&#x27')
  .replace(/\//g, '&#x2F')
}

const create = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { contents, feedIdx } = req.body
      let { sub } = req.user

      contents = cleanXss(contents)

      const comment = await Comment.create({ contents, feedIdx, accountEmail: sub })

      return res.json(comment);
    })

  } catch(error) {
    next(error)
  }

}

const update = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {

      let { idx } = req.params

      let { contents } = req.body

      let { sub } = req.user

      contents = cleanXss(contents)

      const result = await Comment.update({ contents }, { where: { idx, accountEmail: sub }})
      if(result[0] === 0) {
        return res.status(400).json({ error: 'update error' })
      }
      return res.json({ idx });
    })

  } catch(error) {
    next(error)
  }

}

const findAll = async (req, res, next) => {
  const result = await Comment.findAll()
  return res.json(result)
}

const findAndCountByPk = async (req, res, next) => {
  try {
    let { idx } = req.params
    
    const result = await Comment.findAndCountAll({
      where: { feedIdx: idx },
      order: [['idx', 'DESC']],
      include: [{ model: Account, as: 'account', attributes: { exclude: ['password', 'access', 'disabled', 'platform', 'role', 'regDate'] } }]
    })

    return res.json(result)

  } catch(error) {
    next(error)
  }
}

const destroy = async (req, res, next) => {
  try {
    let { idx } = req.params

    let { sub, role } = req.user

    let result = []

    if(role === 'ROLE_ADMIN') {
      result = await Comment.destroy({ where: { idx } })
    } else {
      result = await Comment.destroy({ where: { idx, accountEmail: sub } })
    }

    if(result[0] === 0) {
      return res.status(400).json({ error: 'delete error' })
    }

    return res.json(idx)
  } catch(error) {
    next(error)
  }
}

module.exports = {
  create,
  update,
  findAll,
  findAndCountByPk,
  destroy
}