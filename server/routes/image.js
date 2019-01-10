const router = require('express').Router()
const { image, thumbnail } = require('../middlewares/image')
const jwt = require('../middlewares/jwt')

router.post('/', jwt.ensureAuth(['ROLE_ADMIN']), image)
router.post('/thumbnail', jwt.ensureAuth(['ROLE_ADMIN']), thumbnail)

module.exports = router