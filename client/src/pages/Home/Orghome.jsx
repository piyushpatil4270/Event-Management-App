import React, { useContext, useState } from "react";
import "./orghome.css";
import img1 from "../../assets/info1.jpeg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Loader from "../../components/loader/Loader";
const Orghome = () => {
  const { currentuser } = useContext(AuthContext);
  console.log(currentuser)
  const [events,setevents]=useState(null)
  const {isLoading, error, data}=useQuery(["orgevents",currentuser.id],()=>
  makeRequest.get(`events/organiser/${currentuser.id}`).then((res)=>{
    setevents(res.data)
    console.log("orgevents",res.data)
    return res.data
  })
  )
  return (
    <div className="Home">
      <div className="Home">
        <div className="homeevents">
        {isLoading?(<Loader/>): data.map((event)=>{
          return (
            <div className="homeeventcontainer">
            <img src={`http://localhost:4000/${event.cover}`} alt="" className="homeeventimg" />
            <div className="homeeventin">
              <Link to={`/home/events/${event.id}`}>
                <span className="homeeventname"># {event.name.toUpperCase()}</span>
                <span className="homeeventorgname">{event.city.toUpperCase()}</span>
                <span className="homeeventorgname">Applicants:{event.applicants.length}</span>
                <span className="homeeventorgname">Selections:{event.selections.length}</span>
              </Link>
            </div>
          </div>
          )
        })}  
        </div>
      </div>
    </div>
  );
};

export default Orghome;
