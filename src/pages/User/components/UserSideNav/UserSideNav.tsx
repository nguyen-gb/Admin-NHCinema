import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { useContext } from 'react'

import path from 'src/constants/path'
// import { AppContext } from 'src/contexts/app.context'
// import { getAvatarURL } from 'src/utils/utils'

export default function UserSideNav() {
  const { t } = useTranslation('user')
  // const { profile } = useContext(AppContext)
  return (
    <div className='mt-10 text-white'>
      <h3 className='mb-10 text-center text-2xl font-bold'>{t('personal-information')}</h3>
      <div className='flex flex-wrap items-center justify-center gap-4' role='tablist' aria-orientation='horizontal'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames(
              'inline-flex h-10 items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              {
                'bg-primary': isActive,
                'border bg-transparent hover:bg-gray-700': !isActive
              }
            )
          }
        >
          {t('my-account')}
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames(
              'inline-flex h-10 items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              {
                'bg-primary': isActive,
                'border bg-transparent hover:bg-gray-700': !isActive
              }
            )
          }
        >
          {t('history-purchase')}
        </NavLink>
        <NavLink
          to={path.historyPoint}
          className={({ isActive }) =>
            classNames(
              'inline-flex h-10 items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              {
                'bg-primary': isActive,
                'border bg-transparent hover:bg-gray-700': !isActive
              }
            )
          }
        >
          {t('bonus-points-history')}
        </NavLink>
        {/* <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames(
              'inline-flex h-10 items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              {
                'bg-primary': isActive,
                'border bg-transparent hover:bg-gray-700': !isActive
              }
            )
          }
        >
          Đổi mật khẩu
        </NavLink> */}
      </div>
    </div>
  )
}
