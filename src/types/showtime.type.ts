export interface Showtime {
  _id: string
  room_id: string
  movie_id: string
  time: string
  showtime: string
  seat_array: Seat[]
  movie_name: string
  room_name: string
}

export interface Time {
  time: string
  showtime_id: string
}

export interface ShowtimeCreate {
  _id: string
  theater_id: string
  room_id: string
  movie_id: string
  time: string
  showtime: string
}

export interface Seat {
  _id: string
  seat_number: string
  status: number
  seat_type: number
  time_order: string
  price: number
}
