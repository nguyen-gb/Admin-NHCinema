import { Seat } from './showtime.type'

export interface Ticket {
  _id: string
  theater_name: string
  user_id: string
  email: string
  user_name: string
  movie_id: string
  movie_name: string
  format: string
  room_id: string
  room_number: string
  seats: Seat[]
  combos: []
  time: string
  showtime: string
  payment_method: number
  payment_status: number
  total_amount: number
}
