import { Card, Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'

import path from 'src/constants/path'

export default function Statistics() {
  const { t } = useTranslation('statistics')
  const navigate = useNavigate()

  const statisticsMenu = [
    {
      key: path.statisticsByDay,
      label: t('statistics-by-day')
    },
    {
      key: path.statisticsByMonth,
      label: t('statistics-by-month')
    },
    {
      key: path.statisticsByYear,
      label: t('statistics-by-year')
    }
  ]

  return (
    <Card
      headStyle={{ minHeight: 'unset' }}
      bodyStyle={{ padding: '32px' }}
      title={
        <Menu
          theme='light'
          mode='horizontal'
          onClick={(event) => navigate(event.key)}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={[path.statisticsByDay]}
          items={statisticsMenu}
        />
      }
    >
      <Outlet />
    </Card>
  )
}
