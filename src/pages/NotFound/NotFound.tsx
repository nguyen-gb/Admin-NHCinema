import { Button, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import path from 'src/constants/path'

export default function NotFoundPage() {
  const { t } = useTranslation('login')
  const navigate = useNavigate()
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => navigate(path.home)}>
          {t('back-home')}
        </Button>
      }
    />
  )
}
