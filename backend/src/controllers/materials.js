import { Router } from 'express'
import { Material } from '../models/index.js'
const materialsRouter = Router()

const materialFinder = async (request, _response, next) => {
  const { id } = request.params
  const material = await Material.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })
  if (!material) {
    throw new NotFoundError(`Material with id ${id} not found`)
  }
  request.material = material
  next()
}

materialsRouter.get('/', async (_request, response) => {
  const material = await Material.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(material)
})

materialsRouter.get('/:id', materialFinder, async (request, response) => {
  response.status(200).send(request.material)
})

materialsRouter.post('/', async (request, response) => {
  const { partNumber, partDescription, size, color, vendor, tag } = request.body

  const material = await Material.create({
    partNumber,
    partDescription,
    size,
    color,
    vendor,
    tag,
  })

  response.status(201).send(material)
})

materialsRouter.delete('/:id', materialFinder, async (request, response) => {
  await request.material.destroy()
  response.status(204).json({ message: 'material entry deleted successfully' })
})

materialsRouter.delete('/', async (request, response) => {
  await Material.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All materials deleted successfully' })
})

export default materialsRouter
