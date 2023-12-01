import React, { useContext } from 'react'
import { AuthContext } from '../../context/Authcontext'
import Updatecontainer from '../../updatecontainer/Updatecontainer'
import "./updates.css"
const Updates = () => {
    const {currentuser}=useContext(AuthContext)
    console.log("CU",currentuser.selected)
    
  return (
    <div className='Updates' >
        <span  style={{fontSize:"22px",marginTop:"5px"}}>UPDATES</span>
        {currentuser.selected.map((id,i)=>{
            
        return  <Updatecontainer i={i} eventid={id} />
        })}
   
    </div>
  )
}

export default Updates
