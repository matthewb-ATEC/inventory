import { Router } from 'express'
import { Material, Stock, Project } from '../models/index.js'
const stocksRouter = Router()

const stockFinder = async (request, response, next) => {
  const stock = await Stock.findByPk(request.params.id)
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

stocksRouter.get(
  '/material/:partNumber/:projectNumber',
  async (request, response) => {
    const { partNumber, projectNumber } = request.params

    try {
      const stock = await Stock.findOne({
        attributes: {
          exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Material,
            as: 'material',
            where: {
              partNumber,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Project,
            as: 'project',
            where: {
              number: projectNumber,
            },
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
    } catch (error) {
      response.status(500).send({ error: 'Error fetching stock' })
    }
  },
)

stocksRouter.get('/material/:partNumber', async (request, response) => {
  const { partNumber } = request.params

  try {
    const stock = await Stock.findOne({
      attributes: {
        exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Material,
          as: 'material',
          where: {
            partNumber,
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Project,
          as: 'project',
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
  } catch (error) {
    response.status(500).send({ error: 'Error fetching stock' })
  }
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

stocksRouter.put('/:id/quantity', stockFinder, async (request, response) => {
  const { quantity } = request.body
  request.stock.quantity = quantity
  await request.stock.save()
  response.status(201).send(request.stock)
})

export default stocksRouter
