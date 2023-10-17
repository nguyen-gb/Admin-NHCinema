import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext, lazy, Suspense } from 'react'

import { AppContext } from './contexts/app.context'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'

const Login = lazy(() => import('./pages/Login'))
const MoviePage = lazy(() => import('./pages/Movie'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              index: true,
              path: path.home,
              element: (
                <Suspense>
                  <MoviePage />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routeElements
}
