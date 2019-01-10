const Sequelize = require('sequelize')
const db = require('../config/database')
const Op = Sequelize.Op

const sequelize = new Sequelize(db.database, db.username, db.password, db.config)

module.exports = {
  sequelize, 
  Op
}