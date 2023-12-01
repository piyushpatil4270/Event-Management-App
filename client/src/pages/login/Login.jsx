import React, { useContext, useEffect, useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Authcontext'
import axios from 'axios'
const Login = () => {
  const navigate=useNavigate()
  const {setusertype,setcurrentuser,currentuser}=useContext(AuthContext)
  const[input,setinput]=useState({
    email:"",
    password:""
  })
  const handlechange=(e)=>{
    setinput((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  


  const handlelogin=async(e)=>{
    e.preventDefault()
    try {
      const res=await axios.post("http://localhost:4000/api/applicants/login",input,{
        withCredentials:true
        });
      if(res.statusText==="Accepted"){
        setcurrentuser(res.data)
        setusertype("applicant")
        navigate("/home")
      }
        
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='Login'>
        
      <div className="loginform">
      <span className='loginhead' >Login</span>
        
        <input type="email" className="logininput" placeholder='Email' name='email' onChange={handlechange } />
        <input type="password" className="logininput" placeholder='Password' name='password' onChange={handlechange} />
        <div style={{display:"flex",gap:"30px"}}>
        <Link to={"/register"} >
        <span className='loginlink' >Don't have an account? Register</span>
        </Link>
        <Link to={"/organiserregister"} >
        <span className='loginlink' >Register as an Organiser</span>
        </Link> 
        </div>
        
        <button  className='loginbtn' onClick={handlelogin} >Login</button>
      </div>
    </div>
  )
}

export default Login
