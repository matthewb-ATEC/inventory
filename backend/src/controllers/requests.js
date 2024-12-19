import { Router } from 'express'
import { Request, Project } from '../models/index.js'
import { projectFindOptions } from './projects.js'
const requestsRouter = Router()

export const requestFindOptions = {
  attributes: {
    exclude: ['projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
  ],
}

const requestFinder = async (req, _response, next) => {
  const { id } = req.params
  const request = await Request.findByPk(id, requestFindOptions)

  if (!request) {
    throw new NotFoundError(`request with id ${id} not found`)
  }
  req.request = request
  next()
}

requestsRouter.get('/', async (_req, response) => {
  const request = await Request.findAll(requestFindOptions)

  response.status(200).send(request)
})

requestsRouter.get('/:id', requestFinder, async (req, response) => {
  response.status(200).send(req.request)
})

requestsRouter.post('/', async (req, response) => {
  const { projectId } = req.body

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    return response
      .status(404)
      .send({ error: `No matching project with id ${projectId}` })
  }

  const request = await Request.create({
    projectId,
  })

  response.status(201).send(request)
})

requestsRouter.delete('/:id', requestFinder, async (req, response) => {
  await req.request.destroy()
  response.status(204).json({ message: 'Request entry deleted successfully' })
})

requestsRouter.delete('/', async (_req, response) => {
  await Request.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All requests deleted successfully' })
})

export default requestsRouter
