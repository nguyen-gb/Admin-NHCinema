import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmUyNmZmMWZhN2Q2MDMzOGJmYzNlYSIsImVtYWlsIjoibkBnLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTVUMTY6NDg6MTQuMTMyWiIsImlhdCI6MTY4Njg0NzY5NCwiZXhwIjoxNjg2ODUxMjk0fQ.uHIWq_mzXf-Ac7LMKDVHwgxASeMo2OrSqN7AmToZ8ng'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmUyNmZmMWZhN2Q2MDMzOGJmYzNlYSIsImVtYWlsIjoibkBnLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTVUMTY6NTU6MzguMTA2WiIsImlhdCI6MTY4Njg0ODEzOCwiZXhwIjoxNjg3NDUyOTM4fQ.DaMmL6HYEItq122UqqJQb15AhU1GzdcuMcw7CM3_8oc'

const profile =
  '{"_id":"646e26ff1fa7d60338bfc3ea","roles":["User"],"email":"n@g.com","createdAt":"2023-05-24T15:02:23.388Z","updatedAt":"2023-06-13T13:59:41.754Z","__v":0,"date_of_birth":"2002-02-01T17:00:00.000Z","name":"nguyen","address":"HCM","phone":"0123456789","avatar":"55ad61f6-1529-4f11-8247-d33fd96b51ed.png"}'

beforeEach(() => {
  localStorage.clear()
})

describe('setAccessTokenToLS', () => {
  it('access_token được lưu vào localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('setRefreshTokenToLS', () => {
  it('refresh_token được lưu vào localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})

describe('setProfileToLS', () => {
  it('profile được lưu vào localStorage', () => {
    setProfileToLS(JSON.parse(profile))
    expect(localStorage.getItem('profile')).toBe(profile)
  })
})

describe('getAccessTokenFromLS', () => {
  it('lấy được access_token từ localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(getAccessTokenFromLS())
  })
})

describe('getRefreshTokenFromLS', () => {
  it('lấy được refresh_token từ localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(getRefreshTokenFromLS())
  })
})

describe('getProfileFromLS', () => {
  it('lấy được profile từ localStorage', () => {
    setProfileToLS(JSON.parse(profile))
    expect(localStorage.getItem('profile')).toBe(JSON.stringify(getProfileFromLS()))
  })
})

describe('clearLS', () => {
  it('xoá access_token, refresh_token, profile khỏi localStorage', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(JSON.parse(profile))
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toBe(null)
  })
})
