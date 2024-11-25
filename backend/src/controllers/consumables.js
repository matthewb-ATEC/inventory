import { Router } from 'express'
import { Consumable } from '../models/index.js'
const consumablesRouter = Router()

consumablesRouter.get('/', async (_request, response) => {
  const consumables = await Consumable.findAll({})

  response.status(200).send(consumables)
})

export default consumablesRouter
