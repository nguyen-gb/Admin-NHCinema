export interface Movie {
  _id: string
  name: string
  english_name: string
  genres: string | string[]
  genre_ids: string[]
  title: string
  format: string
  age: string
  release: string
  duration: string
  director: string
  performer: string
  description: string
  poster: string | File | undefined
  thumbnail: string | File | undefined
  trailer: string
  rating: number
  status: number
  times: string[]
  created_at?: string
  updated_at?: string
}
