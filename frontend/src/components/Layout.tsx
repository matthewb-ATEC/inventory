import Nav from './Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Body from './Body'
import Notification from './Notification'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Body>
        <Notification />
        <Outlet />
      </Body>
      <Footer />
    </div>
  )
}

export default Layout
