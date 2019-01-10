const bcrypt = require('bcrypt')
const hashCode = require('../config/hash')

module.exports = {

  encoded (password) {
    return bcrypt.hashSync(password, hashCode.bcrypt)
  },

  match (password, encodedPassword) {
    return bcrypt.compareSync(password, encodedPassword)
  }

}