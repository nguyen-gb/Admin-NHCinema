import { Cinema } from 'src/types/cinema.type'
import { SuccessResponse, Params } from 'src/types/utils.type'
import http from 'src/utils/http'
import { removeNullish } from 'src/utils/utils'

const URL = 'unauth/theater'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const cinemaApi = {
  getCinemas(params?: Params) {
    return http.get<SuccessResponse<Cinema[]>>(`${URL}/admin`, {
      params: removeNullish(params ?? queryConfig)
    })
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
