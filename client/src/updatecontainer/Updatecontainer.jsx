import React, { useEffect, useState } from "react";
import "./updatecontainer.css";
import { useQuery } from "react-query";
import { makeRequest } from "../axios";
import Loader from "../components/loader/Loader";
const Updatecontainer = ({ eventid,i }) => {
  const [data,setdata]=useState(null)
   useEffect(()=>{
    makeRequest.get(`events/${eventid}`).then((res) => {
      console.log("resdata",res.data);
      setdata(res.data);
    })
   },[])
  
    
  return (
    <div className="Updatecontainer">
     
     {data?
     (<>
     <div className="updatein" style={{display:"flex"}}>
     <span className="updatename" style={{marginLeft:"2px"}}>{i+1}.</span> 
     <span className="updatename" style={{flex:8}}>EVENT:{data.name}</span> 
     <span className="updatename" style={{flex:2}}>VENUE:{data.city}</span> 
     <span className="updatename" style={{color:"green",flex:3}}>STATUS:Selected</span> 
    
     </div>
     
     </>
    ):(<Loader/>)}
    </div>
  );
};

export default Updatecontainer;
