import express from 'express'
const app = express()
import cors from 'cors'
import 'express-async-errors'
import middleware from './util/middleware.js'
import { error as _error } from './util/logger.js'
import 'express-async-errors'

import consumablesRouter from './controllers/consumables.js'

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/health', (req, res) => {
  res.send('ok')
})

app.use('/api/stock/consumables', consumablesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
