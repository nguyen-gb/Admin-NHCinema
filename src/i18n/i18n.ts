import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import HEADER_EN from 'src/locales/en/header.json'
import FOOTER_EN from 'src/locales/en/footer.json'
import LOGIN_EN from 'src/locales/en/login.json'
import HOME_EN from 'src/locales/en/home.json'
import SHOW_TIMES_EN from 'src/locales/en/show-times.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import BOOK_TICKETS_EN from 'src/locales/en/book-tickets.json'
import PAYMENT_EN from 'src/locales/en/payment.json'
import USER_EN from 'src/locales/en/user.json'
import FARE_EN from 'src/locales/en/ticket-prices.json'
import MEMBER_EN from 'src/locales/en/member.json'

import HEADER_VN from 'src/locales/vn/header.json'
import FOOTER_VN from 'src/locales/vn/footer.json'
import LOGIN_VN from 'src/locales/vn/login.json'
import HOME_VN from 'src/locales/vn/home.json'
import SHOW_TIMES_VN from 'src/locales/vn/show-times.json'
import PRODUCT_VN from 'src/locales/vn/product.json'
import BOOK_TICKETS_VN from 'src/locales/vn/book-tickets.json'
import PAYMENT_VN from 'src/locales/vn/payment.json'
import USER_VN from 'src/locales/vn/user.json'
import FARE_VN from 'src/locales/vn/ticket-prices.json'
import MEMBER_VN from 'src/locales/vn/member.json'

export const locales = {
  'en-EN': 'English',
  'vi-VN': 'Tiếng Việt'
} as const

export const resources = {
  'en-EN': {
    header: HEADER_EN,
    footer: FOOTER_EN,
    login: LOGIN_EN,
    home: HOME_EN,
    'show-times': SHOW_TIMES_EN,
    product: PRODUCT_EN,
    'book-tickets': BOOK_TICKETS_EN,
    payment: PAYMENT_EN,
    user: USER_EN,
    fare: FARE_EN,
    member: MEMBER_EN
  },
  'vi-VN': {
    header: HEADER_VN,
    footer: FOOTER_VN,
    login: LOGIN_VN,
    home: HOME_VN,
    'show-times': SHOW_TIMES_VN,
    product: PRODUCT_VN,
    'book-tickets': BOOK_TICKETS_VN,
    payment: PAYMENT_VN,
    user: USER_VN,
    fare: FARE_VN,
    member: MEMBER_VN
  }
}

export const defaultNS = 'header'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi-VN',
  ns: [
    'header',
    'footer',
    'login',
    'home',
    'showtimes',
    'product',
    'book-tickets',
    'payment',
    'user',
    'fare',
    'member'
  ],
  defaultNS,
  fallbackLng: 'vi-VN',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
