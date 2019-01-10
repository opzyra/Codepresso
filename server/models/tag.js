const Sequelize = require('sequelize')
const { sequelize } = require('.')

const Tag = sequelize.define('tag', {
  idx: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(200),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'tag',
  timestamps: false
})

module.exports = Tag