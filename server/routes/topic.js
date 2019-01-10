const router = require('express').Router()
const topic = require('../api/topic')
const jwt = require('../middlewares/jwt')

router.post('/', jwt.ensureAuth(['ROLE_ADMIN']), topic.create)
router.get('/', topic.findAndCountAll)
router.put('/:idx', jwt.ensureAuth(['ROLE_ADMIN']), topic.update)
router.get('/:idx', topic.findByPk)

module.exports = router