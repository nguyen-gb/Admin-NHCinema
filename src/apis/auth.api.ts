import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'oauth/login'
export const URL_LOGOUT = 'oauth/logout'
export const URL_REFRESH_TOKEN = 'oauth/refresh-token'

const authApi = {
  login: (body: { email: string; password: string }) => http.post<AuthResponse>(URL_LOGIN, body),

  logout: () => http.get(URL_LOGOUT)
}

export default authApi
