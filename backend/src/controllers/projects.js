import { Router } from 'express'
import { Project } from '../models/index.js'
const projectsRouter = Router()

const projectFinder = async (request, _response, next) => {
  const { id } = request.params
  const project = await Project.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })
  if (!project) {
    throw new NotFoundError(`Project with id ${id} not found`)
  }
  request.project = project
  next()
}

projectsRouter.get('/', async (_request, response) => {
  const project = await Project.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(project)
})

projectsRouter.get('/:id', projectFinder, async (request, response) => {
  response.status(200).send(request.project)
})

projectsRouter.post('/', async (request, response) => {
  const { number, name } = request.body

  const project = await Project.create({
    number,
    name,
  })

  response.status(201).send(project)
})

projectsRouter.delete('/:id', projectFinder, async (request, response) => {
  await request.project.destroy()
  response.status(204).json({ message: 'project entry deleted successfully' })
})

export default projectsRouter
