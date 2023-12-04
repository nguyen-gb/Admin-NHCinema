import { Ticket } from 'src/types/ticket.type'
import { SuccessResponse, Params } from 'src/types/utils.type'
import http from 'src/utils/http'
import { removeNullish } from 'src/utils/utils'

const URL = 'auth/booking'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const ticketApi = {
  getTickets(params?: Params) {
    return http.get<SuccessResponse<Ticket[]>>(URL, { params: removeNullish(params ?? queryConfig) })
  }
}

export default ticketApi
