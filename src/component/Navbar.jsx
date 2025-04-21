import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex flex-row gap-4 place-content-evenly py-5'>
      <NavLink to= "/">
        Home
      </NavLink>
      <NavLink to="/paste">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
