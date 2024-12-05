import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shipments from './components/Shipments/Shipments'
import Catalog from './components/Catalog/Catalog'
import Inventory from './components/Inventory/Inventory'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Catalog /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/shipments', element: <Shipments /> },
      { path: '/inventory', element: <Inventory /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
