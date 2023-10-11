import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

// export const setIdCinemaFromLS = (_id: string) => {
//   localStorage.setItem('id_cinema', JSON.stringify(_id))
// }

// export const getIdCinemaFromLS = () => {
//   const result = localStorage.getItem('id_cinema')
//   return result ? JSON.parse(result) : null
// }
