import { Room } from 'src/types/room.type'
import { SuccessResponse, Params } from 'src/types/utils.type'
import http from 'src/utils/http'
import { removeNullish } from 'src/utils/utils'

const URL = 'auth/room'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const roomApi = {
  getRooms(params?: Params) {
    return http.get<SuccessResponse<Room[]>>(`${URL}/by-theater`, {
      params: removeNullish(params ?? queryConfig)
    })
  },
  createRoom(body: Room) {
    return http.post(URL, body)
  },
  updateRoom(_id: string, body: Room) {
    return http.post(`${URL}/${_id}/update`, body)
  },
  deleteRoom(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
}

export default roomApi
