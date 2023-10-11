import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import path from 'src/constants/path'

export default function RegisterHeader() {
  const { t } = useTranslation()
  const loginMatch = useMatch(path.login)
  const registerMatch = useMatch(path.register)
  const isRegister = Boolean(registerMatch)
  const isLogin = Boolean(loginMatch)
  return (
    <header className='bg-quaternary py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={path.home}>
            <div className='bg-gradient-to-r from-tertiary to-primary bg-clip-text text-xl font-bold text-transparent lg:text-2xl'>
              NHCinema
            </div>
          </Link>
          <div className='ml-5 text-xl text-white lg:text-2xl'>
            {isRegister ? t('register') : isLogin ? t('login') : t('forgot-password')}
          </div>
        </nav>
      </div>
    </header>
  )
}
