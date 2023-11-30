import { Genre } from 'src/types/genre.type'

import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/genre'

const genreApi = {
  getGenres() {
    return http.get<SuccessResponse<Genre[]>>(`${URL}`)
  },
  createGenre(body: Genre) {
    return http.post(URL, body)
  },
  updateGenre(_id: string, body: Genre) {
    return http.post(`${URL}/${_id}/update`, body)
  },
  deleteGenre(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
}

export default genreApi
