import { Router } from 'express'
import { RequestStock, Request, Stock } from '../models/index.js'
import { requestFindOptions } from './requests.js'
import { stockFindOptions } from './stock.js'
const requestStockRouter = Router()

const requestStockFindOptions = {
  attributes: { exclude: ['requestId', 'stockId', 'createdAt', 'updatedAt'] },
  include: [
    {
      model: Request,
      as: 'request',
      ...requestFindOptions,
    },
    {
      model: Stock,
      as: 'stock',
      ...stockFindOptions,
    },
  ],
}

const requestStockFinder = async (request, _response, next) => {
  const { id } = request.params
  const requestStock = await RequestStock.findByPk(id, requestStockFindOptions)

  if (!requestStock) {
    throw new NotFoundError(`Request stock with id ${id} not found`)
  }
  request.requestStock = requestStock
  next()
}

requestStockRouter.get('/', async (_request, response) => {
  const request = await RequestStock.findAll(requestStockFindOptions)

  response.status(200).send(request)
})

requestStockRouter.get(
  '/:id',
  requestStockFinder,
  async (request, response) => {
    response.status(200).send(request.requestStock)
  },
)

requestStockRouter.post('/', async (request, response) => {
  const { requestId, stockId } = request.body

  const requestExists = await Request.findByPk(requestId)

  if (!requestExists) {
    return response
      .status(404)
      .send({ error: `No matching request with id ${requestId}` })
  }

  const stockExists = await Stock.findByPk(stockId)

  if (!stockExists) {
    return response
      .status(404)
      .send({ error: `No matching stock with id ${stockId}` })
  }

  const requestStock = await RequestStock.create({
    requestId,
    stockId,
  })

  response.status(201).send(requestStock)
})

requestStockRouter.delete(
  '/:id',
  requestStockFinder,
  async (request, response) => {
    await request.requestStock.destroy()
    response
      .status(204)
      .json({ message: 'Request stock entry deleted successfully' })
  },
)

requestStockRouter.delete('/', async (request, response) => {
  await RequestStock.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All request stock deleted successfully' })
})

export default requestStockRouter
