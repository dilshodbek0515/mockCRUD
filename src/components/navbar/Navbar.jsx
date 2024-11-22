import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Navbar() {
  const users = useSelector(s => s.users.value)
  return (
    <div className='navbar'>
      <NavLink className="cards" to={"/create-user"}>Cards</NavLink>
    </div>
  )
}

export default Navbar