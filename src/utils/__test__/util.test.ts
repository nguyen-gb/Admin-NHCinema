import { describe, expect, it } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

//describe dùng để mô tả tập hợp cáic ngữ cảnh
//hoặc 1 đơn vị cần test
describe('isAxiosError', () => {
  //it dùng để ghi chứ trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    //expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  //it dùng để ghi chứ trường hợp cần test
  it('isAxiosUnprocessableEntityError trả về boolean', () => {
    //expect dùng để mong đợi giá trị trả về
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})
