import { request, Router } from 'express'
import { Project } from '../models/index.js'
const projectsRouter = Router()

projectsRouter.get('/', async (_request, response) => {
  const project = await Project.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(project)
})

projectsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const project = await Project.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(project)
})

projectsRouter.post('/', async (request, response) => {
  const { number, name } = request.body

  const project = await Project.create({
    number,
    name,
  })

  response.status(201).send(project)
})

projectsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const project = await Project.findOne({
    where: { id },
  })

  if (!project) {
    return response.status(404).json({ message: 'project entry not found' })
  }

  await project.destroy()

  response.status(200).json({ message: 'project entry deleted successfully' })
})

export default projectsRouter
