import { Cinema } from './cinema.type'
import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires: number
  expires_refresh_token: number
  user: User
  theater: Cinema
}>

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>

export type ForgotPassConfirm = {
  user_id: string
  otp: string
  password: string
  confirm_password: string
}
