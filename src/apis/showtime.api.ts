import { Showtime, ShowtimeCreate } from 'src/types/showtime.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/showtime'

const showtimeApi = {
  getShowtimes(params: { theater_id: string; time?: string; movie_id?: string }) {
    return http.get<SuccessResponse<Showtime[]>>(`${URL}`, {
      params
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
