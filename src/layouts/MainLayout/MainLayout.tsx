import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  return (
    <div className='bg-secondary'>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)

export default MainLayout
