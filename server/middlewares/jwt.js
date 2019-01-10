const jwt = require('jsonwebtoken')
const { secret, exp, issur } = require('../config/token')

module.exports = {
  signToken(email, name, role) {
    return jwt.sign({ sub: email, role, exp: parseInt(Date.now() / 1000) + exp, iss: issur, name }, secret, { algorithm: 'HS512' })
  },
  ensureAuth(role) {
    return (req, res, next) => {
      const { authorization } = req.headers
      const user = req.user
      if (!authorization) {
        res.status(401)
        throw Error('No Authorization headers')
      }

      try {
        req.user = this.verify(authorization)
        if(role && role.indexOf(req.user.role) === -1) {
          res.status(401)
          throw Error('Invalid Authorization')
        }
        next()
      } catch (e) {
        return res.status(401).json({error: e.message})
      }
    }
  },
  verify(token) {
    return jwt.verify(token.replace(/^Bearer\s/, ''), secret)
  }
}
