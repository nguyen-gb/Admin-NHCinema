import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LOGIN_EN from 'src/locales/en/login.json'
import MAIN_LAYOUT_EN from 'src/locales/en/main-layout.json'
import GENERAL_EN from 'src/locales/en/general.json'
import BANNER_EN from 'src/locales/en/banner.json'

import LOGIN_VN from 'src/locales/vn/login.json'
import MAIN_LAYOUT_VN from 'src/locales/vn/main-layout.json'
import GENERAL_VN from 'src/locales/vn/general.json'
import BANNER_VN from 'src/locales/vn/banner.json'

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
    banner: BANNER_EN
  },
  'vi-VN': {
    login: LOGIN_VN,
    'main-layout': MAIN_LAYOUT_VN,
    general: GENERAL_VN,
    banner: BANNER_VN
  }
}

export const defaultNS = 'header'

const lng = getLanguageFromLS()
// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: lng,
  ns: ['login', 'main-layout', 'general', 'banner'],
  defaultNS,
  fallbackLng: 'vi-VN',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
