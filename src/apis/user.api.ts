import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'auth/user'

const userApi = {
  getUsers() {
    return http.get<SuccessResponse<User[]>>(`${URL}`)
  },
  createUser(body: User) {
    return http.post(URL, body)
  },
  updateUser(_id: string, body: User) {
    return http.post(`${URL}/${_id}/update`, body)
  },
  deleteUser(_id: string[]) {
    return http.post(`${URL}/${_id}/delete`)
  },
  changePassword(body: { password: string; new_password: string; confirm_password: string }) {
    return http.post(`${URL}/change-password`, body)
  }
}

export default userApi
