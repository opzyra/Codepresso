const router = require('express').Router()
const tag = require('../api/tag')
const jwt = require('../middlewares/jwt')

router.get('/', tag.findAll)
router.post('/', jwt.ensureAuth(['ROLE_ADMIN']), tag.findOrCreate)

module.exports = router