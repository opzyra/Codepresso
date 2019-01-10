const router = require('express').Router()
const refer = require('../api/refer')
const jwt = require('../middlewares/jwt')

router.post('/', jwt.ensureAuth(['ROLE_ADMIN']), refer.create)

module.exports = router