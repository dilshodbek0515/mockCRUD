import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Navbar() {
  const users = useSelector(s => s.users.value)
  return (
    <div className='navbar'>
      <h2>Redux Toolkit</h2>
      <p>Home</p>
      <NavLink to={"/create-user"}>Create user</NavLink>
      <p>All users</p>
    </div>
  )
}

export default Navbar