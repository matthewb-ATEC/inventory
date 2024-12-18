import { Router } from 'express'
import { Crate, Location, Project } from '../models/index.js'
const cratesRouter = Router()

const crateFinder = async (request, _response, next) => {
  const { id } = request.params
  const crate = await Crate.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Location,
        as: 'location',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      {
        model: Project,
        as: 'project',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
  })
  if (!crate) {
    throw new NotFoundError(`Crate with id ${id} not found`)
  }
  request.crate = crate
  next()
}

cratesRouter.get('/', async (_request, response) => {
  const crate = await Crate.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Location,
        as: 'location',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      {
        model: Project,
        as: 'project',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
  })

  response.status(200).send(crate)
})

cratesRouter.get('/:id', crateFinder, async (request, response) => {
  response.status(200).send(request.crate)
})

cratesRouter.post('/', async (request, response) => {
  const { number, locationId, projectId } = request.body

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    return response
      .status(404)
      .send({ error: `No matching project with id ${projectId}` })
  }

  const locationExists = await Location.findByPk(locationId)

  if (!locationExists) {
    return response
      .status(404)
      .send({ error: `No matching location with id ${locationId}` })
  }

  const crate = await Crate.create({
    number,
    locationId,
    projectId,
  })

  response.status(201).send(crate)
})

cratesRouter.delete('/:id', crateFinder, async (request, response) => {
  await request.crate.destroy()
  response.status(204).json({ message: 'Crate entry deleted successfully' })
})

cratesRouter.delete('/', async (request, response) => {
  await Crate.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All crates deleted successfully' })
})

export default cratesRouter
