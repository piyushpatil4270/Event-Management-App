import React, { useContext, useState,useEffect } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Authcontext'
import axios from 'axios'
const Orglogin = () => {
  const navigate=useNavigate()
  const {setusertype,setcurrentuser,currentuser}=useContext(AuthContext)
  const [input,setinput]=useState({
    email:"",
    password:""
  })
  const handlechage=(e)=>{
    setinput((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const handlelogin=async(e)=>{
    e.preventDefault()
    try {
      const res=await axios.post("http://localhost:4000/api/organisers/login",input,{
        withCredentials:true
        });
      if(res.statusText==="Accepted"){
        setcurrentuser(res.data)
        setusertype("organiser")
        navigate("/home")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='Login'>
        
      <div className="loginform">
      <span className='loginhead' >Login as an Organiser</span>
        
        <input type="email" className="logininput" placeholder='Email' name='email' onChange={handlechage} />
        <input type="password" className="logininput" placeholder='Password' name='password' onChange={handlechage} />
        <div style={{display:"flex",gap:"30px"}}>
        <Link to={"/organiserregister"} >
        <span className='loginlink' >Don't have an account? Register</span>
        </Link>
        
        </div>
        
        <button  className='loginbtn' onClick={handlelogin}  >Login</button>
      </div>
    </div>
  )
}

export default Orglogin
