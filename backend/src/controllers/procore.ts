import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../util/config'
import { Router, Response } from 'express'
import axios from 'axios'
const router = Router()

let token: string = ''

router.get('/', (_request, response: Response) => {
  response.status(200).send('success')
})

router.get('/code', (_request, response: Response) => {
  const url = `https://sandbox.procore.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  response.redirect(url)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.get('/callback', async (request, response): Promise<any> => {
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
      { headers: { 'Content-Type': 'application/json' } }
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const accessToken = tokenResponse.data.access_token as string
    token = accessToken
    response.status(200).json(tokenResponse.data)
  } catch (error) {
    console.error('Error exchanging code for token:', error)
    response.status(500).send('Failed to fetch access token')
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.get('/deliveries', async (_request, response): Promise<any> => {
  const projectId = 126842
  const url = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/delivery_logs`

  try {
    const deliveriesResponse = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

    response.status(200).json(deliveriesResponse.data)
  } catch (error: unknown) {
    console.log('Error accessing deliveries using authorization token', error)
    response.status(500).send('Failed to fetch deliveries')
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/deliveries', async (request, response): Promise<any> => {
  const projectId = 126842
  const url = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/delivery_logs`

  const companyId = 4268200
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
  } catch (error: unknown) {
    console.log('Error accessing deliveries using authorization token', error)
    response.status(500).send('Failed to fetch deliveries')
  }
})

export default router
