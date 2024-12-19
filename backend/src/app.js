import express from 'express'
const app = express()
import cors from 'cors'
import 'express-async-errors'
import middleware from './util/middleware.js'
import { error as _error } from './util/logger.js'
import 'express-async-errors'

import materialsRouter from './controllers/materials.js'
import stockRouter from './controllers/stock.js'
import projectsRouter from './controllers/projects.js'
import vendorsRouter from './controllers/vendors.js'
import cratesRouter from './controllers/crates.js'
import locationsRouter from './controllers/locations.js'
import crateStockRouter from './controllers/crateStock.js'
import shipmentsRouter from './controllers/shipments.js'
import shipmentCratesRouter from './controllers/shipmentCrates.js'
import requestsRouter from './controllers/requests.js'

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/health', (req, res) => {
  res.send('ok')
})

app.use('/api/materials', materialsRouter)
app.use('/api/stock', stockRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/vendors', vendorsRouter)
app.use('/api/crates', cratesRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/crateStock', crateStockRouter)
app.use('/api/shipments', shipmentsRouter)
app.use('/api/shipmentCrates', shipmentCratesRouter)
app.use('/api/requests', requestsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
