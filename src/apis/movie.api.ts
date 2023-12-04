import http from 'src/utils/http'
import { Movie } from './../types/movie.type'
import { SuccessResponse, Params } from 'src/types/utils.type'
import { removeNullish } from 'src/utils/utils'

const URL = 'unauth/movie'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const movieApi = {
  getMovies(params?: Params) {
    return http.get<SuccessResponse<Movie[]>>(`${URL}/admin`, {
      params: removeNullish(params ?? queryConfig)
    })
  },
  getMovieDetail(id: string) {
    return http.get<SuccessResponse<Movie>>(`${URL}/${id}`)
  },
  createMovie(body: Movie) {
    return http.post(URL, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updateMovie(_id: string, body: Movie) {
    return http.post(`${URL}/${_id}/update`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteMovie(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
}

export default movieApi
