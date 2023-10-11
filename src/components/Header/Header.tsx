import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import path from 'src/constants/path'
import NavHeader from '../NavHeader'
import Notification from '../Notification'

export default function Header() {
  const { t } = useTranslation()

  return (
    <div className='bg-quaternary py-4 text-white'>
      <div className='container'>
        <NavHeader />
        <div className='my-4 hidden h-[2px] w-full bg-gradient-to-r from-primary to-tertiary md:block'></div>
        <div className='hidden grid-cols-11 items-center md:grid'>
          <div className='col-span-10 flex justify-center'>
            <NavLink
              to={path.home}
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              {t('home-page')}
            </NavLink>
            <NavLink
              to={path.movie}
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              {t('movie')}
            </NavLink>
            <NavLink
              to={path.showtimes}
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              {t('showtimes')}
            </NavLink>
            <NavLink
              to={path.fare}
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              {t('fare')}
            </NavLink>
            <NavLink
              to={path.member}
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              {t('member')}
            </NavLink>
          </div>
          <div className='col-span-1 justify-self-center'>
            <Notification />
          </div>
        </div>
      </div>
    </div>
  )
}
