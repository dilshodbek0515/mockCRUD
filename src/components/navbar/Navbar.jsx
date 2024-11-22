import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div className='navbar'>
      <NavLink className="cards" to={"/"}>Cards</NavLink>
      <NavLink className="" to={"/create-user"}>Create User</NavLink>
    </div>
  )
}

export default Navbar