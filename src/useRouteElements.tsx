import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext, lazy, Suspense } from 'react'

import { AppContext } from './contexts/app.context'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'

const Login = lazy(() => import('./pages/Login'))
const CinemaPage = lazy(() => import('./pages/Cinema'))
const HomePage = lazy(() => import('./pages/Home'))
const MoviePage = lazy(() => import('./pages/Movie'))
const RoomPage = lazy(() => import('./pages/Room'))
const ShowtimesPage = lazy(() => import('./pages/Showtimes'))
const TicketPage = lazy(() => import('./pages/Ticket'))
const BannerPage = lazy(() => import('./pages/Banner'))
const UserPage = lazy(() => import('./pages/User'))
const ComboPage = lazy(() => import('./pages/Combo'))
const StatisticsPage = lazy(() => import('./pages/Statistics'))
const StatisticsByDay = lazy(() => import('./pages/Statistics/pages/StatisticsByDay'))
const StatisticsByMonth = lazy(() => import('./pages/Statistics/pages/StatisticsByMonth'))
const StatisticsByYear = lazy(() => import('./pages/Statistics/pages/StatisticsByYear'))
const InformationPage = lazy(() => import('./pages/Information'))
const ChangePasswordPage = lazy(() => import('./pages/ChangePassword'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPassword'))
const ForgotPasswordConfirmPage = lazy(() => import('./pages/ForgotPasswordConfirm'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='login' />
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
                  <HomePage />
                </Suspense>
              )
            },
            {
              path: path.movie,
              element: (
                <Suspense>
                  <MoviePage />
                </Suspense>
              )
            },
            {
              path: path.cinema,
              element: (
                <Suspense>
                  <CinemaPage />
                </Suspense>
              )
            },
            {
              path: path.room,
              element: (
                <Suspense>
                  <RoomPage />
                </Suspense>
              )
            },
            {
              path: path.showtimes,
              element: (
                <Suspense>
                  <ShowtimesPage />
                </Suspense>
              )
            },
            {
              path: path.ticket,
              element: (
                <Suspense>
                  <TicketPage />
                </Suspense>
              )
            },
            {
              path: path.userManagement,
              element: (
                <Suspense>
                  <UserPage />
                </Suspense>
              )
            },
            {
              path: path.banner,
              element: (
                <Suspense>
                  <BannerPage />
                </Suspense>
              )
            },
            {
              path: path.combo,
              element: (
                <Suspense>
                  <ComboPage />
                </Suspense>
              )
            },
            {
              path: path.statistics,
              element: (
                <Suspense>
                  <StatisticsPage />
                </Suspense>
              ),
              children: [
                {
                  path: path.statisticsByDay,
                  element: (
                    <Suspense>
                      <StatisticsByDay />
                    </Suspense>
                  )
                },
                {
                  path: path.statisticsByMonth,
                  element: (
                    <Suspense>
                      <StatisticsByMonth />
                    </Suspense>
                  )
                },
                {
                  path: path.statisticsByYear,
                  element: (
                    <Suspense>
                      <StatisticsByYear />
                    </Suspense>
                  )
                }
              ]
            },
            {
              path: path.profile,
              element: (
                <Suspense>
                  <InformationPage />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePasswordPage />
                </Suspense>
              )
            },
            {
              path: '*',
              element: (
                <Suspense>
                  <NotFoundPage />
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
              index: true,
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.forgotPassword,
              element: (
                <Suspense>
                  <ForgotPasswordPage />
                </Suspense>
              )
            },
            {
              path: path.forgotPasswordConfirm,
              element: (
                <Suspense>
                  <ForgotPasswordConfirmPage />
                </Suspense>
              )
            },
            {
              path: '*',
              element: (
                <Suspense>
                  <NotFoundPage />
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
