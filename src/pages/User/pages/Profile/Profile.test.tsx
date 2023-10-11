import { waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { access_token } from 'src/msw/auth.msw'
import { setAccessTokenToLS } from 'src/utils/auth'
import { renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, test } from 'vitest'

describe('Profile', () => {
  test('Hiển thị trang profile', async () => {
    setAccessTokenToLS(access_token)
    const { container } = renderWithRouter({ route: path.profile })
    await waitFor(() => {
      expect((container.querySelector('input[placeholder="Tên"]') as HTMLInputElement).value).toBe('Trần Văn Nguyên')
    })
  })
})
