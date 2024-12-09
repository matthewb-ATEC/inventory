import { Router } from 'express'
import { Material, Stock } from '../models/index.js'
const stocksRouter = Router()

stocksRouter.get('/', async (_request, response) => {
  const stock = await Stock.findAll({
    attributes: { exclude: ['materialId', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Material,
        as: 'material',
        exclude: ['createdAt', 'updatedAt'],
      },
    ],
  })

  response.status(200).send(stock)
})

stocksRouter.get('/:materialId', async (request, response) => {
  const materialId = request.params.materialId

  const stock = await Stock.findAll({
    attributes: { exclude: ['materialId', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Material,
        as: 'material',
        exclude: ['createdAt', 'updatedAt'],
      },
    ],
    where: {
      materialId,
    },
  })

  response.status(200).send(stock)
})

export default stocksRouter
