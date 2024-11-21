import ReactDOM from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure there's an element with id='root' in your HTML."
  )
}

ReactDOM.createRoot(rootElement).render(<App />)
