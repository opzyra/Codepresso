const Sequelize = require('sequelize')
const { sequelize } = require('.')

const Account = sequelize.define('account', {
  email: {
    type: Sequelize.STRING(200),
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING(200),
  },
  disabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  platform: {
    type: Sequelize.INTEGER(11),
    defaultValue: 0
  },
  name: {
    type: Sequelize.STRING(200)
  },
  avatar: {
    type: Sequelize.STRING(500)
  },
  role: {
    type: Sequelize.STRING(200),
    defaultValue: 'ROLE_USER'
  },
  regDate: {
    type: 'TIMESTAMP'
  },
  access: {
    type: 'TIMESTAMP'
  }
}, {
  tableName: 'account',
  timestamps: false
})

module.exports = Account