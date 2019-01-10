const { sequelize } = require('../models')

const devlogCount = async (req, res, next) => {
  try {
    await sequelize.transaction(async tx => {
      let query = `
        SELECT
          (SELECT COUNT(*) FROM topic) AS topic,
          (SELECT COUNT(*) FROM feed) AS feed,
          (SELECT COUNT(*) FROM tag) AS tag,
          (SELECT COUNT(*) FROM comment) AS comment
        FROM DUAL
      `
      sequelize.query(query).spread((results, metadata) => {
        return res.json({ ...results[0] });
      })
    })

  } catch(error) {
    next(error)
  }

}

module.exports = {
  devlogCount
}