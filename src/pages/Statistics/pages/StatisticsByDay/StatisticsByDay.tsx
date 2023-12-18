import { useQuery } from '@tanstack/react-query'
import { Card, DatePicker, Divider, Select, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Line } from '@ant-design/charts'

import movieApi from 'src/apis/movie.api'
import statisticsApi from 'src/apis/statistics'
import { AppContext } from 'src/contexts/app.context'
import cinemaApi from 'src/apis/cinema.api'

export default function StatisticsByDay() {
  const { t } = useTranslation('statistics')
  const { profile, cinema } = useContext(AppContext)
  const [day, setDay] = useState(dayjs())
  const [movie, setMovie] = useState<string | undefined>(undefined)
  const [cinemaAdmin, setCinemaAdmin] = useState<string | undefined>(undefined)

  const queryConfig = {
    time: day.format('YYYY-MM-DD'),
    report_type: 1,
    theater_id: cinema?._id ?? cinemaAdmin,
    movie_id: movie
  }

  const { data } = useQuery({
    queryKey: ['statistics', queryConfig],
    queryFn: () => statisticsApi.getStatistics(queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const statistics = data?.data.data
  const config = {
    data: statistics,
    xField: 'date',
    yField: 'total_revenue',
    smooth: true
  }

  const { data: dataMovie } = useQuery({
    queryKey: ['movie', queryConfig],
    queryFn: () => movieApi.getMovies(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const movies = dataMovie?.data.data

  const { data: dataCinema } = useQuery({
    queryKey: ['cinema'],
    queryFn: () => {
      if ((profile?.role as number) === 2) {
        return cinemaApi.getCinemas()
      }
      return undefined
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const cinemas = dataCinema?.data.data

  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day')
  }

  return (
    <Card>
      <Space wrap>
        <DatePicker
          defaultValue={day}
          format='DD/MM/YYYY'
          onChange={(value) => setDay(dayjs(value, 'DD/MM/YYYY'))}
          disabledDate={disabledDate}
          allowClear={false}
        />
        <Select
          allowClear
          style={{ minWidth: 200 }}
          placeholder={t('movie')}
          showSearch={false}
          options={movies?.map((movie) => {
            return {
              value: movie._id,
              label: movie.name
            }
          })}
          onChange={(value) => setMovie(value)}
          value={movie}
        />
        <Select
          allowClear
          style={{ minWidth: 200, display: `${(profile?.role as number) === 2 ? '' : 'none'}` }}
          placeholder={t('cinema')}
          showSearch={false}
          options={cinemas?.map((cinema) => {
            return {
              value: cinema._id,
              label: cinema.name
            }
          })}
          onChange={(value) => setCinemaAdmin(value)}
        />
      </Space>
      <Divider />
      <Line {...config} />
    </Card>
  )
}
