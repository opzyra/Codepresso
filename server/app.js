const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const app = express()

const rotues = require('./routes')

const asyncError = require('express-async-errors')
const passport = require('passport');

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use(passport.initialize())

app.use('/api', rotues)

const startT = Date.now()
app.use('/health', (_, res) => res.json({time: Date.now() - startT}))

app.use((req, res, next) => {
  res.status(404)
  res.json({ error: 'not found' })
})

app.use((err, req, res, next) => {
  console.log(err)

  res.status(500)
  res.json({ error: 'internal server error' })
  
  next(err)
  
})

module.exports = app