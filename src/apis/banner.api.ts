import { Banner } from 'src/types/banner.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/banner'

const bannerApi = {
  getBanners() {
    return http.get<SuccessResponse<Banner[]>>(URL)
  }
}

export default bannerApi
