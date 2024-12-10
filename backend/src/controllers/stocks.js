import { Router } from 'express'
import { Material, Stock, Project } from '../models/index.js'
const stocksRouter = Router()

const stockFinder = async (request, response, next) => {
  const { id } = request.params
  const stock = await Stock.findByPk(id, {
    attributes: {
      exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Material,
        as: 'material',
        exclude: ['createdAt', 'updatedAt'],
      },
      {
        model: Project,
        as: 'project',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  })
  if (!stock) {
    return response.status(404).json({ error: 'Stock not found' })
  }
  request.stock = stock
  next()
}

stocksRouter.get('/', async (_request, response) => {
  const stock = await Stock.findAll({
    attributes: {
      exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Material,
        as: 'material',
        exclude: ['createdAt', 'updatedAt'],
      },
      {
        model: Project,
        as: 'project',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  })

  response.status(200).send(stock)
})

stocksRouter.get('/material/:partNumber', async (request, response) => {
  const { partNumber } = request.params

  const whereProject = request.query.projectNumber
    ? { projectNumber: request.query.projectNumber }
    : {}

  const stock = await Stock.findOne({
    attributes: {
      exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Material,
        as: 'material',
        where: { partNumber },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      {
        model: Project,
        as: 'project',
        where: whereProject,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  })

  if (!stock) {
    return response.status(404).send({
      message: 'No stock found for the given material and project',
    })
  }

  response.status(200).send(stock)
})

stocksRouter.post('/', async (request, response) => {
  const { material, project, quantity } = request.body

  let projectInDb = await Project.findOne({
    where: { number: project.number },
  })

  if (!projectInDb) {
    projectInDb = await Project.create({
      number: project.number,
      name: project.name,
    })
  }

  const stock = await Stock.create({
    materialId: material.id,
    projectId: projectInDb.id,
    quantity,
  })

  response.status(201).send(stock)
})

stocksRouter.put('/:id', stockFinder, async (request, response) => {
  const { quantity, material, project } = request.body

  if (!material || !material.id) {
    return response.status(400).json({
      error: 'Material objects with valid IDs are required.',
    })
  }

  request.stock.quantity = quantity
  request.stock.materialId = material.id
  request.stock.projectId = project.id ? project.id : null

  await request.stock.save()
  response.status(201).send(request.stock)
})

export default stocksRouter
