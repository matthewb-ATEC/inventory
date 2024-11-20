import 'dotenv/config'

export const PORT = process.env.PORT || 3001

// Procore Authorization
export const CLIENT_ID =
  process.env.NODE_ENV === 'development'
    ? process.env.SANDBOX_CLIENT_ID
    : process.env.PRODUCTION_CLIENT_ID

export const CLIENT_SECRET =
  process.env.NODE_ENV === 'development'
    ? process.env.SANDBOX_CLIENT_SECRET
    : process.env.PRODUCTION_CLIENT_SECRET

export const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? process.env.SANDBOX_REDIRECT_URI
    : process.env.PRODUCTION_REDIRECT_URI
