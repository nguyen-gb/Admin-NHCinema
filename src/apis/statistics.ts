import { Statistics, StatisticsHome } from 'src/types/statistics.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'auth/statistical'

interface Params {
  time: string
  report_type: number
  theater_id?: string
  room_id?: string
  movie_id?: string
}

const statisticsApi = {
  getStatistics(params?: Params) {
    return http.get<SuccessResponse<Statistics[]>>(`${URL}/revenue`, { params: params })
  },
  getStatisticsHome() {
    return http.get<SuccessResponse<StatisticsHome>>(`${URL}/overview`)
  }
}

export default statisticsApi
