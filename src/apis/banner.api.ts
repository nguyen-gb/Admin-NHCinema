import { Banner } from 'src/types/banner.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/banner'

const bannerApi = {
  getBanners() {
    return http.get<SuccessResponse<Banner[]>>(`${URL}`)
  },
  createBanner(body: Banner) {
    return http.post(URL, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updateBanner(_id: string, body: Banner) {
    return http.post(`${URL}/${_id}/update`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteBanner(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
}

export default bannerApi
