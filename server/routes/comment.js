const router = require('express').Router()
const comment = require('../api/comment')
const jwt = require('../middlewares/jwt')

router.post('/', jwt.ensureAuth(['ROLE_USER', 'ROLE_ADMIN']), comment.create)
router.get('/', comment.findAll)
router.get('/:idx', comment.findAndCountByPk)
router.put('/:idx', jwt.ensureAuth(['ROLE_USER', 'ROLE_ADMIN']), comment.update)
router.delete('/:idx', jwt.ensureAuth(['ROLE_USER', 'ROLE_ADMIN']), comment.destroy)

module.exports = router