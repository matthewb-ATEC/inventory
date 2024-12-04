import { Router } from 'express'
import { Item, Stock } from '../models/index.js'
const stockRouter = Router()

stockRouter.get('/', async (_request, response) => {
  const stock = await Stock.findAll({
    attributes: { exclude: ['itemId', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Item,
        as: 'item',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  })

  response.status(200).send(stock)
})

export default stockRouter
