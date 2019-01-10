const router = require('express').Router()
const info = require('../api/info')

router.get('/devlog/count', info.devlogCount)

module.exports = router