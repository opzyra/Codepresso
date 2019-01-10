const Sequelize = require('sequelize')
const { sequelize } = require('.')

const Topic = sequelize.define('topic', {
  idx: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(200),
    require: true
  },
  thumbnail: {
    type: Sequelize.STRING(300),
    require: true
  },
  description: {
    type: Sequelize.STRING(500),
    require: true
  },
  contents: {
    type: Sequelize.TEXT,
    require: true
  },
  hit: {
    type: Sequelize.INTEGER(11),
    defaultValue: 0
  },
  access: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  seq: {
    type: Sequelize.INTEGER(11),
    defaultValue: 0
  },
  regDate: {
    type: Sequelize.DATE,
    default: Sequelize.NOW
  }
}, {
  tableName: 'topic',
  timestamps: false
})

module.exports = Topic