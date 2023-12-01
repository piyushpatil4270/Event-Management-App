import React, { useContext } from 'react'
import eventimg from "../../assets/info1.jpeg";
import "./usercontainer.css"
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/Authcontext';
const Usercontainer = ({user,type}) => {
  const {eventId}=useParams()
  console.log(type)
  const {currentuser}=useContext(AuthContext)
  const organiserId=currentuser.id
  const queryClient=useQueryClient()
  const mutation=useMutation(
    (userid)=>{
      return  makeRequest.patch(`events/select/${eventId}/${user.id}`,organiserId)
    },
    {
      onSuccess:()=>{
        queryClient.invalidateQueries(["applicants"])
      }
    }
   )
   const handleselect=async()=>{
    mutation.mutate(user.id)
   }

  const deletemutation=useMutation(
    (userid)=>{
      return makeRequest.patch(`events/${eventId}/${user.id}/reject`,organiserId)
    },
    {
      onSuccess:()=>{
        queryClient.invalidateQueries(["applicants"])
      }
    }
  )

   const handlereject=async()=>{
        deletemutation.mutate(user.id)
   }
  return (
    <div className='usercontainer1'>
      <img src={"http://localhost:4000"+user.picture} alt="" className="usercontainerimg" />
      <div className="usercontainerflex">
       <span className="usercontainername">Name:{user.name}</span>
       <span className="usercontainername">Email:{user.email}</span>
       <span className="usercontainername">Phone:{user.phone}</span>
      </div>
      {(type.type==="select"?(""):(
        <div className="usercontsineralt">
        <button className="usercontsineralt1" onClick={handleselect}>Select</button>
        <button className="usercontsineralt2" onClick={handlereject} >Reject</button>
      </div>
      ))}
     
    </div>
  )
}

export default Usercontainer