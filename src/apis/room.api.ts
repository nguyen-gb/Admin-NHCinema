import { Room } from 'src/types/room.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'auth/room'

const roomApi = {
  getRooms() {
    return http.get<SuccessResponse<Room[]>>(`${URL}/by-theater`)
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
