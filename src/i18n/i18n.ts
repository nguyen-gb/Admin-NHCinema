import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LOGIN_EN from 'src/locales/en/login.json'
import MAIN_LAYOUT_EN from 'src/locales/en/main-layout.json'
import GENERAL_EN from 'src/locales/en/general.json'
import BANNER_EN from 'src/locales/en/banner.json'
import CHANGE_PASS_EN from 'src/locales/en/change-password.json'
import CINEMA_EN from 'src/locales/en/cinema.json'
import COMBO_EN from 'src/locales/en/combo.json'
import USER_EN from 'src/locales/en/user.json'
import MOVIE_EN from 'src/locales/en/movie.json'
import ROOM_EN from 'src/locales/en/room.json'
import SHOWTIMES_EN from 'src/locales/en/showtimes.json'
import TICKET_EN from 'src/locales/en/ticket.json'

import LOGIN_VN from 'src/locales/vn/login.json'
import MAIN_LAYOUT_VN from 'src/locales/vn/main-layout.json'
import GENERAL_VN from 'src/locales/vn/general.json'
import BANNER_VN from 'src/locales/vn/banner.json'
import CHANGE_PASS_VN from 'src/locales/vn/change-password.json'
import CINEMA_VN from 'src/locales/vn/cinema.json'
import COMBO_VN from 'src/locales/vn/combo.json'
import USER_VN from 'src/locales/vn/user.json'
import MOVIE_VN from 'src/locales/vn/movie.json'
import ROOM_VN from 'src/locales/vn/room.json'
import SHOWTIMES_VN from 'src/locales/vn/showtimes.json'
import TICKET_VN from 'src/locales/vn/ticket.json'

import { getLanguageFromLS } from 'src/utils/language'

export const locales = {
  'en-EN': 'English',
  'vi-VN': 'Tiếng Việt'
} as const

export const resources = {
  'en-EN': {
    login: LOGIN_EN,
    'main-layout': MAIN_LAYOUT_EN,
    general: GENERAL_EN,
    banner: BANNER_EN,
    'change-pass': CHANGE_PASS_EN,
    cinema: CINEMA_EN,
    combo: COMBO_EN,
    user: USER_EN,
    movie: MOVIE_EN,
    room: ROOM_EN,
    showtimes: SHOWTIMES_EN,
    ticket: TICKET_EN
  },
  'vi-VN': {
    login: LOGIN_VN,
    'main-layout': MAIN_LAYOUT_VN,
    general: GENERAL_VN,
    banner: BANNER_VN,
    'change-pass': CHANGE_PASS_VN,
    cinema: CINEMA_VN,
    combo: COMBO_VN,
    user: USER_VN,
    movie: MOVIE_VN,
    room: ROOM_VN,
    showtimes: SHOWTIMES_VN,
    ticket: TICKET_VN
  }
}

export const defaultNS = 'login'

const lng = getLanguageFromLS()
// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: lng,
  ns: [
    'login',
    'main-layout',
    'general',
    'banner',
    'change-pass',
    'cinema',
    'combo',
    'user',
    'movie',
    'room',
    'showtimes',
    'ticket'
  ],
  defaultNS,
  fallbackLng: 'vi-VN',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
