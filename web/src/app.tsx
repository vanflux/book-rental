import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './contexts/auth'
import { Router } from './router'
import { queryClient } from './services/queryClient'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalSearchProvider } from './contexts/global-search'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalSearchProvider>
          <Router />
        </GlobalSearchProvider>
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  )
}
