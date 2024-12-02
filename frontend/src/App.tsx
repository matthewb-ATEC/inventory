import ErrorPage from './components/ErrorPage'
import Home from './components/Home'
import Layout from './components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shipments from './components/Shipments/Shipments'
import Stock from './components/Stock/Stock'
import Requests from './components/Requests/Requests'
import Purchases from './components/Purchases/Purchases'
import Catalog from './components/Catalog/Catalog'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/shipments', element: <Shipments /> },
      { path: '/purchases', element: <Purchases /> },
      { path: '/requests', element: <Requests /> },
      { path: '/stock', element: <Stock /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
