const { sequelize } = require('.')

const FeedRefer = sequelize.define('feed_refer', {}, {
  tableName: 'feed_refer',
  timestamps: false
})

module.exports = FeedRefer