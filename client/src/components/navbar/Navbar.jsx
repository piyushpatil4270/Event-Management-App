import React from 'react'
import "./navbar.css"
const Navbar = () => {
  return (
    <div className='Navbar' >
      <div className="navleft">
      <div style={{marginRight:"10px"}} >
        <i class="fa-solid fa-list-check fa-xl" style={{color: "#000000"}}></i>
        </div>
        <span className="navmiddlehead">get-Events</span>
      </div>
      <div className="navmiddle">
       
      </div>
      <div className="navright"></div>
    </div>
  )
}

export default Navbar
