const Sequelize = require('sequelize')
const { sequelize } = require('.')

const Refer = sequelize.define('refer', {
  idx: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(200),
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING(500),
    defaultValue: ''
  },
  url: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  image: {
    type: Sequelize.STRING(200),
    defaultValue: ''
  }
}, {
  tableName: 'refer',
  timestamps: false
})

module.exports = Refer