import { Router, Response } from 'express'
const router = Router()

router.get('/', (_request, response: Response<string>) => {
  response.status(200).send('pong')
})

export default router
