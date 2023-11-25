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
  }
}

export default movieApi
