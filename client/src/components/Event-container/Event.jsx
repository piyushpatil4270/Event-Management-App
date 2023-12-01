import React, { useState } from "react";
import "./evet.css";
import eventimg from "../../assets/info1.jpeg";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useParams } from "react-router-dom";
import { useQuery,useMutation, QueryClient, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";

import Loader from "../loader/Loader";
const Event = () => {
  const queryClient=useQueryClient()
  const {usertype}=useContext(AuthContext)
  const {currentuser}=useContext(AuthContext)
  console.log("Currentuser",currentuser)
  const[event,setevent]=useState(null)
  console.log("User-type -",usertype)
  const {eventId}=useParams()
  console.log(eventId)
  const{isLoading ,error,data}=useQuery('event',()=>
  makeRequest.get(`/events/${eventId}`).then((res)=>{
    setevent(res.data)
    console.log("event",res.data)
    return res.data
  })
)
 const mutation=useMutation(
  (applied)=>{
    if(!applied) return makeRequest.post(`/events/apply/${currentuser.id}/${eventId}`)
  },
  {
    onSuccess:()=>{
      queryClient.invalidateQueries("event")
    }
  }
  
 )
  const handleapply=async()=>{
    mutation.mutate(data.applicants.includes(currentuser.id))
  }

   
  
  
 

  return (
   (isLoading?(<Loader/>):(data && <div className="Mainevent">
   <div className="maineventcontainer">
     <img src={"http://localhost:4000"+data.cover} alt="" className="maineventimg" />
     <div className="maineventinfo">
       <span className="maineventname">#{data.name}</span>
       <span className="maineventdetails">
        Details:{data.details}
       </span>
       <span className="maineventcity">Location: {data.city}</span>
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"35px"}}>
      {(data.selections.includes(currentuser.id)) || data.rejections.includes(currentuser.id)?"":(data.applicants.includes(currentuser.id)?( <button className="maineventbtnapp"  >Applied</button>):(<button className="maineventbtn" onClick={handleapply} >Apply</button>))} 
        <span className="maineventcity">Status:  {data.applicants.includes(currentuser.id) && <span className="pending">Pending</span>|| data.selections.includes(currentuser.id) && <span className="selected">Selected</span>|| data.rejections.includes(currentuser.id) && <span className="rejected">Rejected</span>}</span>
       </div>
     </div>
   </div>
 </div>)) 
  );
};

export default Event;
