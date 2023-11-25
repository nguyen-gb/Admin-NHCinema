import { Ticket } from 'src/types/ticket.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'auth/booking'

const ticketApi = {
  getTickets() {
    return http.get<SuccessResponse<Ticket[]>>(URL)
  }
}

export default ticketApi
