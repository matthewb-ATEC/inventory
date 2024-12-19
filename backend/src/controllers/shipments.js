import { Router } from 'express'
import { Shipment, Project, Vendor } from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { vendorFindOptions } from './vendors.js'
const shipmentsRouter = Router()

export const shipmentFindOptions = {
  attributes: {
    exclude: ['projectId', 'vendorId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
    {
      model: Vendor,
      as: 'vendor',
      ...vendorFindOptions,
    },
  ],
}

const shipmentFinder = async (request, _response, next) => {
  const { id } = request.params
  const shipment = await Shipment.findByPk(id, shipmentFindOptions)

  if (!shipment) {
    throw new NotFoundError(`Shipment with id ${id} not found`)
  }
  request.shipment = shipment
  next()
}

shipmentsRouter.get('/', async (_request, response) => {
  const shipment = await Shipment.findAll(shipmentFindOptions)

  response.status(200).send(shipment)
})

shipmentsRouter.get('/:id', shipmentFinder, async (request, response) => {
  response.status(200).send(request.shipment)
})

shipmentsRouter.post('/', async (request, response) => {
  const { type, status, projectId, vendorId } = request.body

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    return response
      .status(404)
      .send({ error: `No matching project with id ${projectId}` })
  }

  const vendorExists = await Vendor.findByPk(vendorId)

  if (!vendorExists) {
    return response
      .status(404)
      .send({ error: `No matching vendor with id ${vendorId}` })
  }

  try {
    const shipment = await Shipment.create({
      type,
      status,
      projectId,
      vendorId,
    })
    response.status(201).send(shipment)
  } catch (error) {
    return response.status(400).send({ error: error })
  }
})

shipmentsRouter.delete('/:id', shipmentFinder, async (request, response) => {
  await request.shipment.destroy()
  response.status(204).json({ message: 'Shipment entry deleted successfully' })
})

shipmentsRouter.delete('/', async (request, response) => {
  await Shipment.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All shipments deleted successfully' })
})

export default shipmentsRouter
