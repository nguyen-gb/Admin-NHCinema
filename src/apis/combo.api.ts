import { Combo } from 'src/types/combo.type'
import { SuccessResponse, Params } from 'src/types/utils.type'
import http from 'src/utils/http'
import { removeNullish } from 'src/utils/utils'

const URL = 'unauth/product'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const comboApi = {
  getCombos(params?: Params) {
    return http.get<SuccessResponse<Combo[]>>(`${URL}`, {
      params: removeNullish(params ?? queryConfig)
    })
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
