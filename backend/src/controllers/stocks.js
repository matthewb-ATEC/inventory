import { Router } from 'express'
import { Material, Stock } from '../models/index.js'
import { info } from '../util/logger.js'
const stocksRouter = Router()

const stockFinder = async (request, response, next) => {
  const stock = await Stock.findByPk(request.params.id)
  if (!stock) {
    return response.status(404).json({ error: 'Stock not found' })
  }
  request.stock = stock
  info('REQUEST STOCK', request.stock)
  info('REQUEST STOCK QUANTITY', request.stock.quantity)
  next()
}

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

stocksRouter.get(
  '/material/:partNumber/:project',
  async (request, response) => {
    const { partNumber, project } = request.params

    try {
      const stock = await Stock.findOne({
        attributes: { exclude: ['materialId', 'createdAt', 'updatedAt'] },
        include: [
          {
            model: Material,
            as: 'material',
            where: {
              partNumber,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
        where: {
          project,
        },
      })

      if (!stock) {
        return response.status(404).send({
          message: 'No stock found for the given material and project',
        })
      }

      response.status(200).send(stock)
    } catch (error) {
      response.status(500).send({ error: 'Error fetching stock' })
    }
  },
)

stocksRouter.post('/', async (request, response) => {
  const { material, project, quantity } = request.body

  const stock = await Stock.create({
    materialId: material.id,
    project,
    quantity,
  })

  response.status(201).send(stock)
})

stocksRouter.put('/:id/quantity', stockFinder, async (request, response) => {
  const { quantity } = request.body
  info('QUANTITY', quantity)
  request.stock.quantity = quantity
  info('ADDING STOCKS', request.stock.quantity, 'WITH', quantity)
  await request.stock.save()
  response.status(201).send(request.stock)
})

export default stocksRouter
