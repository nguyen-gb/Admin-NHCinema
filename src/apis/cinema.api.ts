import { Cinema } from 'src/types/cinema.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/theater'

const cinemaApi = {
  getCinemas() {
    return http.get<SuccessResponse<Cinema[]>>(URL)
  }
}

export default cinemaApi
