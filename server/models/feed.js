const Sequelize = require('sequelize')
const { sequelize } = require('./')

const Feed = sequelize.define('feed', {
  idx: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  contents: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  hit: {
    type: Sequelize.INTEGER(11),
    defaultValue: 0
  },
  access: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  regDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
}, {
  tableName: 'feed',
  timestamps: false
})

module.exports = Feed