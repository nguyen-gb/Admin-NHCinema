export interface Statistics {
  date: number
  total_revenue: number
}

export interface StatisticsHome {
  total_revenue: number
  upcoming_movie: number
  showing_movie: number
  user_count: number
  movie_statistic: MovieStatistic[]
}

export const StatisticsType = [
  {
    label: 'month',
    value: 0
  },
  {
    label: 'year',
    value: 1
  },
  {
    label: 'all',
    value: 2
  }
]

interface MovieStatistic {
  movie_name: string
  total_revenue: number
  total_booking: number
}
