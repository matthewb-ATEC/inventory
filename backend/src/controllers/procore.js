import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../util/config'
import { Router } from 'express'
import axios from 'axios'
import { error } from 'logger.js'
const router = Router()

let token = ''

router.get('/', (_request, response) => {
  response.status(200).send('success')
})

router.get('/code', (_request, response) => {
  const url = `https://sandbox.procore.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  response.redirect(url)
})

router.get('/callback', async (request, response) => {
  const { code } = request.query

  if (!code) {
    return response.status(400).send('Authorization code is missing')
  }

  try {
    const tokenResponse = await axios.post(
      'https://sandbox.procore.com/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      },
      { headers: { 'Content-Type': 'application/json' } },
    )

    const accessToken = tokenResponse.data.access_token
    token = accessToken
    response.status(200).json(tokenResponse.data)
  } catch (error) {
    error('Error exchanging code for token:', error)
    response.status(500).send('Failed to fetch access token')
  }
})

router.get('/deliveries', async (_request, response) => {
  const projectId = 126842
  const url = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/delivery_logs`

  try {
    const deliveriesResponse = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

    response.status(200).json(deliveriesResponse.data)
  } catch (error) {
    error('Error accessing deliveries using authorization token', error)
    response.status(500).send('Failed to fetch deliveries')
  }
})

router.post('/deliveries', async (request, response) => {
  const projectId = 126842
  const url = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/delivery_logs`

  const companyId = 4268200
  const deliveryLogData = {
    ...request.body,
  }
  try {
    const delivery = await axios.post(url, deliveryLogData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Procore-Company-Id': `${companyId}`,
      },
    })

    response.status(200).json(delivery.data)
  } catch (error) {
    error('Error accessing deliveries using authorization token', error)
    response.status(500).send('Failed to fetch deliveries')
  }
})

export default router
