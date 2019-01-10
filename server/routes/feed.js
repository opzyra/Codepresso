const router = require('express').Router()
const feed = require('../api/feed')
const jwt = require('../middlewares/jwt')

router.post('/', jwt.ensureAuth(['ROLE_ADMIN']),feed.create)
router.get('/', feed.findAll)
router.get('/latest', feed.findAndCountAll)
router.get('/:idx', feed.findByPk)
router.put('/:idx', jwt.ensureAuth(['ROLE_ADMIN']),feed.update)

module.exports = router