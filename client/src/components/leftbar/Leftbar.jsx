import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import "./leftbar.css"
import axios from 'axios'
import { makeRequest } from '../../axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AuthContext } from '../../context/Authcontext'
const Leftbar = () => {
  const{usertype}=useContext(AuthContext)
  
  return (
    <div className='Leftbar' >
      <div className="leftcontainer">
        <div className="leftbaricons">
          <Link to="/home">
        <i class="fa-solid fa-house fa-xl" style={{color: "#000000"}}></i>
        <span className="leftbariconname">Home</span>
        </Link>
        </div>
        {usertype==="organiser" && <div className="leftbaricons">
          <Link to="/home/createevent">
          <i class="fa-solid fa-plus fa-xl" style={{color: "#000000"}}></i>
        <span className="leftbariconname">Create Event</span>
        </Link>
        </div>
 
        }
       {usertype==="applicant" && <><div className="leftbaricons">
        <Link to="/home/findevents">
        <i class="fa-solid fa-magnifying-glass fa-xl" style={{color: "#000000"}}></i>
        <span className="leftbariconname">Find Events</span>
        </Link>
        </div>
        <div className="leftbaricons">
          <Link to="/home/myupdates">
        <i class="fa-solid fa-bell fa-xl" style={{color: "#000000"}}></i>
        <span className="leftbariconname">Updates</span>
        </Link>
        </div>
        <div className="leftbaricons">
        <Link to="/home/profile">
        <i class="fa-solid fa-user fa-xl" style={{color: "#000000"}}></i>
        <span className="leftbariconname">Profile</span>
        </Link>
        </div></> }
      </div>
     </div>
  )
}

export default Leftbar
