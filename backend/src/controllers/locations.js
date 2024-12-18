import { Router } from 'express'
import { Location } from '../models/index.js'
const locationsRouter = Router()

const locationFinder = async (request, _response, next) => {
  const { id } = request.params
  const location = await Location.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })
  if (!location) {
    throw new NotFoundError(`Location with id ${id} not found`)
  }
  request.location = location
  next()
}

locationsRouter.get('/', async (_request, response) => {
  const location = await Location.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(location)
})

locationsRouter.get('/:id', locationFinder, async (request, response) => {
  response.status(200).send(request.location)
})

locationsRouter.post('/', async (request, response) => {
  const { aisle, col, shelf } = request.body

  const location = await Location.create({
    aisle,
    col,
    shelf,
  })

  response.status(201).send(location)
})

locationsRouter.delete('/:id', locationFinder, async (request, response) => {
  await request.location.destroy()
  response.status(204).json({ message: 'location entry deleted successfully' })
})

locationsRouter.delete('/', async (request, response) => {
  await Location.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All locations deleted successfully' })
})

export default locationsRouter
