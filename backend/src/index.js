import app from './app.js'
import { PORT } from './util/config.js'
import { connectToDatabase } from './util/db.js'
import { info } from './util/logger.js'

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
  })
}

start()
