import http from 'src/utils/http'
import { Movie, MovieListConfig } from './../types/movie.type'
import { SuccessResponse } from 'src/types/utils.type'

const URL = 'unauth/movie'

const movieApi = {
  getMovies(params?: MovieListConfig) {
    return http.get<SuccessResponse<Movie[]>>(URL, {
      params
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
