import { Router } from 'express'
import { CrateStock, Crate, Stock } from '../models/index.js'
import { crateFindOptions } from './crates.js'
import { stockFindOptions } from './stock.js'
const crateStockRouter = Router()

const crateStockFindOptions = {
  attributes: { exclude: ['crateId', 'stockId', 'createdAt', 'updatedAt'] },
  include: [
    {
      model: Crate,
      as: 'crate',
      ...crateFindOptions,
    },
    {
      model: Stock,
      as: 'stock',
      ...stockFindOptions,
    },
  ],
}
const crateStockFinder = async (request, _response, next) => {
  const { id } = request.params
  const crateStock = await CrateStock.findByPk(id, crateStockFindOptions)

  if (!crateStock) {
    throw new NotFoundError(`Crate stock with id ${id} not found`)
  }
  request.crateStock = crateStock
  next()
}

crateStockRouter.get('/', async (_request, response) => {
  const crate = await CrateStock.findAll(crateStockFindOptions)

  response.status(200).send(crate)
})

crateStockRouter.get('/:id', crateStockFinder, async (request, response) => {
  response.status(200).send(request.crateStock)
})

crateStockRouter.post('/', async (request, response) => {
  const { crateId, stockId } = request.body

  const crateExists = await Crate.findByPk(crateId)

  if (!crateExists) {
    return response
      .status(404)
      .send({ error: `No matching crate with id ${crateId}` })
  }

  const stockExists = await Stock.findByPk(stockId)

  if (!stockExists) {
    return response
      .status(404)
      .send({ error: `No matching stock with id ${stockId}` })
  }

  const crateStock = await CrateStock.create({
    crateId,
    stockId,
  })

  response.status(201).send(crateStock)
})

crateStockRouter.delete('/:id', crateStockFinder, async (request, response) => {
  await request.crateStock.destroy()
  response
    .status(204)
    .json({ message: 'Crate stock entry deleted successfully' })
})

crateStockRouter.delete('/', async (request, response) => {
  await CrateStock.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All crate stock deleted successfully' })
})

export default crateStockRouter
