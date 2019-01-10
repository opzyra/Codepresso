const Sequelize = require('sequelize')
const { sequelize } = require('.')

const Comment = sequelize.define('comment', {
  idx: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  contents: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  blind: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  regDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
}, {
  tableName: 'comment',
  timestamps: false
})

module.exports = Comment