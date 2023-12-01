import React, { useState } from "react";
import "./orgevent.css";
import img1 from "../../assets/info1.jpeg";
import Usercontainer from "../usercontsiner/Usercontsiner";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Loader from "../loader/Loader";


const Orgevent = () => {
  const {eventId}=useParams()
  const [showselections,setshowselections]=useState(false)
  console.log(eventId)
  const {isLoading, error, data }=useQuery("orgevent",()=>
  makeRequest.get(`/events/${eventId}`).then((res)=>{
    console.log(res.data)
    return res.data
  })
  )
  const {isLoading:apploading, error:aperror, data:applicants}=useQuery(["applicants"],()=>
  makeRequest.get(`/events/${eventId}/applicants`).then((res)=>{
    console.log(res.data)
    return res.data
  })
  )
  const {isLoading:selloading, error:selerror, data:selections}=useQuery(["selections"],()=>
  makeRequest.get(`/events/${eventId}/selections`).then((res)=>{
    console.log(res.data)
    return res.data
  })
  )
const select={
  type:"select"
}
const apply={
  type:"apply"
}

  return (
    <div className="Mainorgevent">
      {isLoading?(<Loader/>):(<div className="mainorgeventcontainer">
        <img src={img1} alt="" className="maineventimg" />

        <div className="mainorgeventinfo">
          <span className="mainorgeventname">#{data.name.toUpperCase()}</span>
          <span className="mainorgeventname">{data.organiserId.toUpperCase()}</span>
          <span className="mainorgeventname">Location: {data.city}</span>
          {showselections?(<button className="orgselectionsbtn" onClick={()=>(setshowselections(!showselections))}>Applications</button>):(<button className="orgselectionsbtn" onClick={()=>(setshowselections(!showselections))}>Selections</button>)}
        </div>
     {showselections ? (selections ? (selections.map((user)=>{
            return(
              <Usercontainer user={user} type={select} />
            )
          })):(<Loader/>)):(applicants ? (applicants.map((user)=>{
            return(
              <Usercontainer user={user} type={apply} />
            )
          })):(<Loader/>)
          )}
     
        </div>
        )}
        </div>
      
        
    
  );
};

export default Orgevent;


