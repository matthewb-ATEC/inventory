import { Router } from 'express'
import { Consumable } from '../models/index.js'
const consumablesRouter = Router()

consumablesRouter.get('/', async (_request, response) => {
  const consumables = await Consumable.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(consumables)
})

consumablesRouter.post('/', async (request, response) => {
  const { name, quantity } = request.body
  const consumable = await Consumable.create({ name, quantity })

  response.status(201).send(consumable)
})

export default consumablesRouter
