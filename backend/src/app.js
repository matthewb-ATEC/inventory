import express from 'express'
const app = express()
import cors from 'cors'
import 'express-async-errors'
import middleware from './util/middleware.js'
import { error as _error } from './util/logger.js'
import 'express-async-errors'

import itemRouter from './controllers/item.js'
import stockRouter from './controllers/stock.js'
/*
import itemLocationRouter from './controllers/itemLocation.js'
import locationRouter from './controllers/location.js'
import projectRouter from './controllers/project.js'
import projectStockRouter from './controllers/projectStock.js'
*/
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/health', (req, res) => {
  res.send('ok')
})

app.use('/api/item', itemRouter)
app.use('/api/stock', stockRouter)
/*
app.use('/api/itemLocation', itemLocationRouter)
app.use('/api/location', locationRouter)
app.use('/api/project', projectRouter)
app.use('/api/projectStock', projectStockRouter)
*/

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
