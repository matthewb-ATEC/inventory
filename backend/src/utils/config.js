import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3001

export const DATABASE_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URI
    : process.env.NODE_ENV === 'development'
      ? process.env.DEV_DATABASE_URI
      : process.env.PROD_DATABASE_URI
