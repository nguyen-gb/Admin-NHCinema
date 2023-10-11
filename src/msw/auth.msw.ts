import { rest } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmRjZTBhMWZhN2Q2MDMzOGJmYzNiYiIsImVtYWlsIjoibmd1eWVuZHpAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xNlQxMzo0NToxNy45OTBaIiwiaWF0IjoxNjg2OTIzMTE3LCJleHAiOjE2ODY5MjMxMTh9.i9BvJ_-YhFxzMjc_ioAYhXek_14NPrvh6fNKDYKmipY'

export const refresh_token_1000days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmRjZTBhMWZhN2Q2MDMzOGJmYzNiYiIsImVtYWlsIjoibmd1eWVuZHpAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xNlQxMzo0ODoxNS44ODJaIiwiaWF0IjoxNjg2OTIzMjk1LCJleHAiOjE3NzMzMjMyOTV9.TPk_87i5y7TTxa5u0DFAWbI_EPeMEBCjjtraRDf7eeU'

export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmRjZTBhMWZhN2Q2MDMzOGJmYzNiYiIsImVtYWlsIjoibmd1eWVuZHpAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xN1QxNDo1MDowMS4zNjlaIiwiaWF0IjoxNjg3MDEzNDAxLCJleHAiOjE2ODgwMTM0MDB9.eZRFjrFhrcwbeVn8kF1eZpomzCaBlBUXodua6mIg2Zs'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmRjZTBhMWZhN2Q2MDMzOGJmYzNiYiIsImVtYWlsIjoibmd1eWVuZHpAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xN1QwODo1NTo1NS4zNTZaIiwiaWF0IjoxNjg2OTkyMTU1LCJleHAiOjE2ODc5OTIxNTR9.0rUwq2XIiJbZ9dL5dz0h-GV38cV8XKi6suYRlyJuBxM',
    expires: 999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmRjZTBhMWZhN2Q2MDMzOGJmYzNiYiIsImVtYWlsIjoibmd1eWVuZHpAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xN1QwODo1NTo1NS4zNTZaIiwiaWF0IjoxNjg2OTkyMTU1LCJleHAiOjE2OTY5OTIxNTR9.hMMiuE9Jfc7GWnBGnO8lYQyODxmhsY2F6-BDM44zi9k',
    expires_refresh_token: 9999999,
    user: {
      _id: '646dce0a1fa7d60338bfc3bb',
      roles: ['User'],
      email: 'nguyendz@gmail.com',
      createdAt: '2023-05-24T08:42:50.165Z',
      updatedAt: '2023-05-24T09:15:41.197Z',
      __v: 0,
      address: 'Việt Nam',
      avatar: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg',
      date_of_birth: '1907-02-18T17:17:56.000Z',
      name: 'Trần Văn Nguyên',
      phone: '0123456789'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmRjZTBhMWZhN2Q2MDMzOGJmYzNiYiIsImVtYWlsIjoibmd1eWVuZHpAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xN1QxNDowNzozNC43ODBaIiwiaWF0IjoxNjg3MDEwODU0LCJleHAiOjE2ODc2MTU2NTR9.9jmVGUDxFpwLBhwJpcAs355NSqYFH9sj5OkNqGv3br0'
  }
}

export const loginRequest = rest.post(`${config.baseUrl}login`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const refreshToken = rest.post(`${config.baseUrl}refresh-access-token`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes))
})

const authRequests = [loginRequest, refreshToken]
export default authRequests
