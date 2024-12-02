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
    <div className="flex flex-col md:flex-row bg-ATECblue md:px-24 lg:px-48">
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
        {/*
        <Link to={`/shipments`}>
          <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-ATECblue transition duration-200">
            Shipments
          </div>
        </Link>
        <Link to={`/purchases`}>
          <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-ATECblue transition duration-200">
            Purchases
          </div>
        </Link>
        <Link to={`/catalog`}>
          <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-ATECblue transition duration-200">
            Catalog
          </div>
        </Link>
        <Link to={`/stock`}>
          <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-ATECblue transition duration-200">
            Stock
          </div>
        </Link>
        <Link to={`/requests`}>
          <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-ATECblue transition duration-200">
            Requests
          </div>
        </Link>*/}
        <Link to={`/`}>
          <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-ATECblue transition duration-200">
            Home
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Nav
