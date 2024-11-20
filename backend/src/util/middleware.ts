import logger from './logger'
import { NextFunction, Request, Response } from 'express'

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (
  error: { message: unknown },
  _request: Request,
  _response: Response,
  next: NextFunction
) => {
  logger.error(error.message)
  next(error)
}

export default { unknownEndpoint, requestLogger, errorHandler }
