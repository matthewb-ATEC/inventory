import logger from './logger.js'

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  const { name, message, statusCode } = error

  logger.error(`${name}: ${message}`)

  if (response.headersSent) {
    return next(error)
  }

  // Handle known errors
  if (statusCode) {
    response.status(statusCode).json({ error: message })
  } else {
    // Handle unexpected errors
    response.status(500).json({ error: 'Internal Server Error' })
  }
}

export default { requestLogger, unknownEndpoint, errorHandler }
