import { request, Router } from 'express'
import { Material } from '../models/index.js'
const materialsRouter = Router()

materialsRouter.get('/', async (_request, response) => {
  const material = await Material.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(material)
})

materialsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const material = await Material.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  response.status(200).send(material)
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

materialsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const material = await Material.findOne({
    where: { id },
  })

  if (!material) {
    return response.status(404).json({ message: 'material entry not found' })
  }

  await material.destroy()

  response.status(200).json({ message: 'material entry deleted successfully' })
})

export default materialsRouter
