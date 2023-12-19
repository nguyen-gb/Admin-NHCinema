import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import CountUp from 'react-countup'
import { Formatter } from 'antd/es/statistic/utils'

import { Card, Col, Divider, Row, Statistic, Table } from 'antd'
import statisticsApi from 'src/apis/statistics'
import { formatCurrency } from 'src/utils/utils'

export default function Home() {
  // hook
  const { t } = useTranslation('home')

  // query api
  const { data, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: () => statisticsApi.getStatisticsHome(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataStatistics = data?.data.data
  const dataTable = data?.data.data.movie_statistic

  const formatter = (value: number) => <CountUp end={value} separator='.' />

  return (
    <Card title={t('home')}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Statistic
            title={`${t('total-revenue')} (${t('vnd')})`}
            value={dataStatistics?.total_revenue}
            precision={3}
            formatter={formatter as Formatter}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic
            title={t('showing-movie')}
            value={dataStatistics?.showing_movie}
            formatter={formatter as Formatter}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic
            title={t('upcoming-movie')}
            value={dataStatistics?.upcoming_movie}
            formatter={formatter as Formatter}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic title={t('total-user')} value={dataStatistics?.user_count} formatter={formatter as Formatter} />
        </Col>
      </Row>
      <Divider />
      <Table
        title={() => t('top-10')}
        rowKey='_id'
        scroll={{ x: 1080 }}
        loading={isLoading}
        dataSource={dataTable}
        pagination={false}
        columns={[
          {
            title: '#',
            dataIndex: 'id',
            width: '7%',
            render: (_, __, index) => index + 1
          },
          {
            title: t('movie-name'),
            dataIndex: 'movie_name',
            render: (_, statistic) => statistic.movie_name
          },
          {
            title: `${t('total-revenue')} (${t('vnd')})`,
            dataIndex: 'total_revenue',
            render: (_, statistic) => `${formatCurrency(statistic.total_revenue)}`,
            sorter: (a, b) => b.total_revenue - a.total_revenue,
            defaultSortOrder: 'ascend'
          },
          {
            title: t('total-booking'),
            dataIndex: 'total_booking',
            render: (_, statistic) => statistic.total_booking,
            sorter: (a, b) => b.total_booking - a.total_booking
          }
        ]}
      />
    </Card>
  )
}
