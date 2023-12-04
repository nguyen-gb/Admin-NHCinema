import { User } from 'src/types/user.type'
import { SuccessResponse, Params } from 'src/types/utils.type'
import http from 'src/utils/http'
import { removeNullish } from 'src/utils/utils'

const URL = 'auth/user'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const userApi = {
  getUsers(params?: Params) {
    return http.get<SuccessResponse<User[]>>(`${URL}`, { params: removeNullish(params ?? queryConfig) })
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
