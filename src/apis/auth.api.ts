import { AuthResponse, ForgotPassConfirm } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'oauth/login'
export const URL_LOGOUT = 'oauth/logout'
export const URL_REFRESH_TOKEN = 'oauth/refresh-token'
export const URL_FORGOT_PASS = 'oauth/forgot-password'
export const URL_FORGOT_PASS_CONFIRM = 'oauth/forgot-password-confirm'

const authApi = {
  login: (body: { email: string; password: string }) => http.post<AuthResponse>(URL_LOGIN, body),

  forgotPass: (body: { email: string }) => http.post<{ _id: string }>(URL_FORGOT_PASS, body),

  forgotPassConfirm: (body: ForgotPassConfirm) => http.post<AuthResponse>(URL_FORGOT_PASS_CONFIRM, body),

  logout: () => http.get(URL_LOGOUT)
}

export default authApi
