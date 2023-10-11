import { screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { renderWithRouter } from './utils/testUtils'
import path from './constants/path'

describe('App', () => {
  test('App render và chuyển trang', async () => {
    // render(<App />, {
    //   wrapper: BrowserRouter
    // })
    const { user } = renderWithRouter()

    //Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })

    await user.click(screen.getByText('Đăng nhập'))
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
    })
  })

  test('Trang NotFound', async () => {
    const badRoute = '/some/bad/route'
    // render(
    //   <MemoryRouter initialEntries={[badRoute]}>
    //     <App />
    //   </MemoryRouter>
    // )
    renderWithRouter({ route: badRoute })

    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
    screen.debug(document.body.parentElement as HTMLElement, 999999999)
  })

  test('Render trang Register', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
    screen.debug(document.body.parentElement as HTMLElement, 999999999)
  })
})
