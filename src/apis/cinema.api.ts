import { Cinema } from 'src/types/cinema.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/theater'

const cinemaApi = {
  getCinemas() {
    return http.get<SuccessResponse<Cinema[]>>(URL)
  },
  createCinema(body: Cinema) {
    return http.post(URL, body)
  },
  updateCinema(_id: string, body: Cinema) {
    return http.post(`${URL}/${_id}/update`, body)
  },
  deleteCinema(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
}

export default cinemaApi
