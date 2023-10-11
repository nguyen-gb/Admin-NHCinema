import { rest } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { access_token_1s } from './auth.msw'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '646dce0a1fa7d60338bfc3bb',
    roles: ['User'],
    email: 'nguyendz@gmail.com',
    createdAt: '2023-05-24T08:42:50.165Z',
    updatedAt: '2023-05-24T09:15:41.197Z',
    address: 'Việt Nam',
    avatar: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg',
    date_of_birth: '1907-02-18T17:17:56.000Z',
    name: 'Trần Văn Nguyên',
    phone: '0123456789'
  }
}

const meRequest = rest.get(`${config.baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization')
  if (access_token === access_token_1s) {
    ctx.status(HttpStatusCode.Unauthorized)
    ctx.json({
      massage: 'Lỗi',
      data: {
        message: 'Token hết hạn',
        name: 'EXPIRED_TOKEN'
      }
    })
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequests = [meRequest]
export default userRequests
