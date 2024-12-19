import { Router } from 'express'
import { ShipmentCrate, Crate, Shipment } from '../models/index.js'
import { crateFindOptions } from './crates.js'
import { shipmentFindOptions } from './shipments.js'
const shipmentCrateRouter = Router()

const shipmentCrateFindOptions = {
  attributes: { exclude: ['shipmentId', 'crateId', 'createdAt', 'updatedAt'] },
  include: [
    {
      model: Shipment,
      as: 'shipment',
      ...shipmentFindOptions,
    },
    {
      model: Crate,
      as: 'crate',
      ...crateFindOptions,
    },
  ],
}

const shipmentCrateFinder = async (request, _response, next) => {
  const { id } = request.params
  const shipmentCrate = await ShipmentCrate.findByPk(
    id,
    shipmentCrateFindOptions,
  )

  if (!shipmentCrate) {
    throw new NotFoundError(`Shipment crate with id ${id} not found`)
  }
  request.shipmentCrate = shipmentCrate
  next()
}

shipmentCrateRouter.get('/', async (_request, response) => {
  const crate = await ShipmentCrate.findAll(shipmentCrateFindOptions)

  response.status(200).send(crate)
})

shipmentCrateRouter.get(
  '/:id',
  shipmentCrateFinder,
  async (request, response) => {
    response.status(200).send(request.shipmentCrate)
  },
)

shipmentCrateRouter.post('/', async (request, response) => {
  const { crateId, shipmentId } = request.body

  const crateExists = await Crate.findByPk(crateId)

  if (!crateExists) {
    return response
      .status(404)
      .send({ error: `No matching crate with id ${crateId}` })
  }

  const shipmentExists = await Shipment.findByPk(shipmentId)

  if (!shipmentExists) {
    return response
      .status(404)
      .send({ error: `No matching shipment with id ${shipmentId}` })
  }

  const shipmentCrate = await ShipmentCrate.create({
    crateId,
    shipmentId,
  })

  response.status(201).send(shipmentCrate)
})

shipmentCrateRouter.delete(
  '/:id',
  shipmentCrateFinder,
  async (request, response) => {
    await request.shipmentCrate.destroy()
    response
      .status(204)
      .json({ message: 'Shipment crate entry deleted successfully' })
  },
)

shipmentCrateRouter.delete('/', async (request, response) => {
  await ShipmentCrate.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All shipment crates deleted successfully' })
})

export default shipmentCrateRouter
