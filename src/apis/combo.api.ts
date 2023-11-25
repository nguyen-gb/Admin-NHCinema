import { Combo } from 'src/types/combo.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/combo'

const comboApi = {
  getCombos() {
    return http.get<SuccessResponse<Combo[]>>(`${URL}`)
  },
  createCombo(body: Combo) {
    return http.post(URL, body)
  },
  updateCombo(_id: string, body: Combo) {
    return http.post(`${URL}/${_id}/update`, body)
  },
  deleteCombo(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
}

export default comboApi
