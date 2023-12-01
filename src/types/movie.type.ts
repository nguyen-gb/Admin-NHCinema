export interface Movie {
  _id: string
  name: string
  english_name: string
  genres: string | string[]
  title: string
  format: string
  age: string
  release: string
  duration: string
  director: string
  performer: string
  description: string
  poster: string | File
  thumbnail: string | File
  trailer: string
  rating: number
  status: number
  times: string[]
  created_at?: string
  updated_at?: string
}

export interface MovieListConfig {
  genre_id?: number
  status?: number
  key_search?: string
}
