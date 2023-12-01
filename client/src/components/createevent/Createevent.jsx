import React, { useState } from 'react'
import "./create.css"

import { makeRequest } from '../../axios'
import axios from 'axios'
const Createevent = () => {
 const[id,setid]=useState("")
 const[name,setname]=useState("")
 const[organiserId,setorganiserId]=useState("")
 const[city,setcity]=useState("")
 const[details,setdetails]=useState("")
 const[file,setfile]=useState("")

 const data=new FormData()
 data.append("id",id )
 data.append("name",name)
 data.append("organiserId",organiserId)
 data.append("city",city)
 data.append("details",details)
 if(file){
 data.append("file",file[0])
 }
 const handlecreate=async(e)=>{
  e.preventDefault()
  try {
    const res= await makeRequest.post("/events/",data)
    
  } catch (error) {
    console.log(error)
  }
 
 }
  return (
    <div className='createevent'>
      <div className="createevetcontainer">
        <span className="createeventhead">Create Event</span>
        <input type="text" className="createinput" name='id' placeholder='Event Id' onChange={(e)=>setid(e.target.value)} />
        <input type="text" className="createinput" name='name' placeholder='Event Name' onChange={(e)=>setname(e.target.value)}/>
        <input type="text" className="createinput" name='organiserId' placeholder='Organiser Id' onChange={(e)=>setorganiserId(e.target.value)}/>
        <input type="text" className="createinput" name='city' placeholder='City' onChange={(e)=>setcity(e.target.value)} />
        <input type="text" className="createinput" name='details' placeholder='Event Details' onChange={(e)=>setdetails(e.target.value)}/>
        <input type="file" className="createinput" name='cover' placeholder='Cover Image' onChange={(e)=>setfile(e.target.files)}/>
        <button className="createmaineventbtn" onClick={handlecreate}  >Create</button>
      </div>
    </div>
  )
}

export default Createevent
