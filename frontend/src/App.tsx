import ErrorPage from './components/ErrorPage'
import Home from './components/Home'
import Layout from './components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shipments from './components/Shipments'
import Stock from './components/Stock'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shipments', element: <Shipments /> },
      { path: '/stock', element: <Stock /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
