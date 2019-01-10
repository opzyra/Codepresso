const { sequelize } = require('.')

const TopicFeed = sequelize.define('topic_feed', {}, {
  tableName: 'topic_feed',
  timestamps: false
})

module.exports = TopicFeed