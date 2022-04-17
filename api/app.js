const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personRouter = require('./controllers/person')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('../web/build'))

app.use(requestLogger)

app.use('/api/persons', personRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
