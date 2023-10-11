import { Product } from 'src/types/product.type';
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/showtime'

const showtimesApi = {
  getShowtimesByDate(params: { theater_id: string; time: string }) {
    return http.get<SuccessResponse<Product[]>>(`${URL}/times`, {
      params: params
    })
  }
}

export default showtimesApi
