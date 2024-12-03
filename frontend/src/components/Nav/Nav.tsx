import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavTab from './NavTab'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const links = ['Shipments', 'Purchases', 'Catalog', 'Stock', 'Requests']
  const sortedLinks = links.sort((a, b) => {
    return a.localeCompare(b)
  })

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-atec-light to-atec md:px-24 lg:px-48">
      <div className="w-full flex justify-between items-center p-4 md:py-4 md:px-0">
        {/* Logo */}
        <img
          className="h-12 max-w-full object-contain"
          src="/images/ATEC-logo-white.png"
          alt="AdvanceTEC"
        />

        {/* Hamburger Menu Icon (visible on small screens) */}
        <button
          className="flex items-center text-center block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <i className="material-icons text-white text-4xl">menu</i>
        </button>
      </div>
      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col pb-2 md:pb-0 md:flex-row md:space-x-8 md:items-center text-white`}
      >
        {sortedLinks.map((link, index) => (
          <NavTab key={index} name={link} />
        ))}
        <Link to={`/`}>
          <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-atec transition duration-200">
            Home
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Nav
