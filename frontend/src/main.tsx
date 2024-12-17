// Renders the app
import ReactDOM from 'react-dom/client'
import App from './App'

// Enables Tailwind
import './index.css'

// Provides access to global state via the Redux store
import { Provider } from 'react-redux'
import store from './store'

// Provides React Query hooks like useQuery and useMutation
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure there's an element with id='root' in your HTML."
  )
}

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
)
