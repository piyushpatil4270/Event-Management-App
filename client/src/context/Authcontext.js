import {createContext,useState,useEffect} from "react"
import axios from "axios"

export const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
   
    const[usertype,setusertype]=useState(null)
    const [currentuser,setcurrentuser]=useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const applicantlogin=async(inputs)=>{
        const res=await axios.post("http://localhost:4000/api/applicants/login",inputs,{
        withCredentials:true
        });
        
        setusertype("applicant")
        setcurrentuser(res.data)
        console.log("currentuser",currentuser)
    }
    const organiserlogin=async(inputs)=>{
        const res=await axios.post("http://localhost:4000/api/organisers/login",inputs,{
        withCredentials:true
        });
        
        console.log("RES",res)
        setusertype("organiser")
        setcurrentuser(res.data)
        console.log("currentuser",currentuser)
       
    }
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentuser))
    },[currentuser])

    return (
        <AuthContext.Provider value={{setcurrentuser,usertype,setusertype,currentuser,applicantlogin,organiserlogin}} >
            {children}
        </AuthContext.Provider>
    )
}