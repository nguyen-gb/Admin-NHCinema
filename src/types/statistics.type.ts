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

interface MovieStatistic {
  movie_name: string
  total_revenue: number
  total_booking: number
}
