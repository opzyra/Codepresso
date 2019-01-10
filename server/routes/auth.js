const router = require('express').Router()
const auth = require('../api/auth')

router.post('/email',auth.login)
router.post('/token', auth.tokenPublish)

router.get('/github', auth.github)
router.get('/github/callback', auth.githubCallback, auth.token)

router.get('/facebook', auth.facebook)
router.get('/facebook/callback', auth.facebookCallback, auth.token)

router.get('/google', auth.google)
router.get('/google/callback', auth.googleCallback, auth.token)

module.exports = router