const { sequelize } = require('.')

const FeedTag = sequelize.define('feed_tag', {}, {
  tableName: 'feed_tag',
  timestamps: false
})

module.exports = FeedTag