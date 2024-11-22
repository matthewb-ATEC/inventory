import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
