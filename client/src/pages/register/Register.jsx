import React,{useState} from 'react'
import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const[userid,setuserid]=useState("")
  const[username,setusername]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[phone,setphone]=useState("")
  const[file,setfile]=useState("")

  const input=new  FormData()
  input.append("userid",userid)
  input.append("username",username)
  input.append("email",email)
  input.append("password",password)
  input.append("phone",phone)
  if(file){
    input.append("file",file[0])
  }
 
 const handleRegister=async(e)=>{
  e.preventDefault()
  try {
   const res= await axios.post("http://localhost:4000/api/applicants/register",input)
  } catch (error) {
    console.log(error)
  }
 }


  return (
    <div className='Register'>
       <div className="registerform">
      <span className='registerhead' >Register</span>
        <input type="text" className="registerinput" placeholder='User Id' name='userid' onChange={(e)=>setuserid(e.target.value)} />
        <input type="text" className="registerinput" placeholder='Name' name='username' onChange={(e)=>setusername(e.target.value)} />
        <input type="email" className="registerinput" placeholder='Email' name='email' onChange={(e)=>setemail(e.target.value)} />
        <input type="password" className="registerinput" placeholder='Password' name='password' onChange={(e)=>setpassword(e.target.value)} />
        <input type="text" className="registerinput" placeholder='Phone No.' name='phone' onChange={(e)=>setphone(e.target.value)} />
        <input type="file" className="registerinput" placeholder='Profile-Picture' name='file' onChange={(e)=>setfile(e.target.files)} style={{backgroundColor:"white"}} />
        <div  style={{display:"flex",gap:"30px"}}>
        <Link  to={"/"}>
        <span className='registerlink'>Already have an account? Log-in</span>
        </Link>
        <Link  to={"/organiserlogin"}>
        <span className='registerlink'>Log-in as an Organiser</span>
        </Link>
        </div>
        <button  className='registerbtn' onClick={handleRegister} >Register</button>
      </div>
    </div>
  )
}

export default Register
