import { Router } from 'express'
import { Material, Stock } from '../models/index.js'
import { info } from '../util/logger.js'
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

stocksRouter.post('/', async (request, response) => {
  const { material, project, quantity } = request.body

  const stock = await Stock.create({
    materialId: material.id,
    project,
    quantity,
  })

  response.status(201).send(stock)
})

export default stocksRouter
