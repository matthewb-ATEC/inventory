import express, { json } from 'express'
import cors from 'cors'

import middleware from './util/middleware'

import pingRouter from './controllers/ping'
import procoreRouter from './controllers/procore'

const app = express()
app.use(json())
app.use(cors())

app.use(middleware.requestLogger)

app.use('/api/ping', pingRouter)
app.use('/api/procore', procoreRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
