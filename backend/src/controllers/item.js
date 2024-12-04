import { Router } from 'express'
import { Item } from '../models/index.js'
const itemRouter = Router()

itemRouter.get('/', async (_request, response) => {
  const item = await Item.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(item)
})

itemRouter.post('/', async (request, response) => {
  const { type, category, sku, name, unitOfMeasure } = request.body

  const item = await Item.create({
    type,
    category,
    sku,
    name,
    unitOfMeasure,
  })

  response.status(201).send(item)
})

itemRouter.delete('/:sku', async (request, response) => {
  const { sku } = request.params

  const item = await Item.findOne({
    where: { sku },
  })

  if (!item) {
    return response.status(404).json({ message: 'Item entry not found' })
  }

  await item.destroy()

  response.status(200).json({ message: 'Item entry deleted successfully' })
})

export default itemRouter
