import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shipments from './components/Shipments/Shipments'
//import Requests from './components/Requests/Requests'
//import Purchases from './components/Purchases/Purchases'
import Catalog from './components/Catalog/Catalog'
//import ItemDetails from './components/Catalog/ItemDetails'
import Inventory from './components/Stock/Inventory'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Catalog /> },
      { path: '/catalog', element: <Catalog /> },
      //{ path: '/catalog/:id', element: <ItemDetails /> },
      { path: '/shipments', element: <Shipments /> },
      //{ path: '/purchases', element: <Purchases /> },
      //{ path: '/requests', element: <Requests /> },
      { path: '/inventory', element: <Inventory /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
