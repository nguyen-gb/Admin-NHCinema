import { Showtime, ShowtimeCreate } from 'src/types/showtime.type'
import { SuccessResponse, Params } from 'src/types/utils.type'
import http from 'src/utils/http'
import { removeNullish } from 'src/utils/utils'

const URL = 'unauth/showtime'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const showtimeApi = {
  getShowtimes(params?: Params) {
    return http.get<SuccessResponse<Showtime[]>>(`${URL}`, {
      params: removeNullish(params ?? queryConfig)
    })
  },
  createShowtime(body: ShowtimeCreate) {
    return http.post(URL, body)
  },
  updateShowtime(_id: string, body: ShowtimeCreate) {
    return http.post(`${URL}/${_id}/update`, body)
  },
  deleteShowtime(_id: string) {
    return http.post(`${URL}/${_id}/delete`)
  }
}

export default showtimeApi
