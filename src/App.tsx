import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'

import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './useRouteElements'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary'
import { getLanguageFromLS, setLanguageToLS } from './utils/language'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  const language = getLanguageFromLS()

  useEffect(() => {
    setLanguageToLS(language || 'vi-VN')
  })

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <HelmetProvider>
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
