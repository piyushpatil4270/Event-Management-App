import React, { useState } from 'react'
import "./findevets.css"
import { useMutation, useQuery,useQueryClient } from 'react-query'
import { makeRequest } from '../../axios'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader'
import img1 from "../../assets/info1.jpeg"
const Findevents = () => {
  const [city,setcity]=useState("Mumbai")
  console.log(city)
  const { isLoading, error, data } = useQuery(["findevents"], () =>
  makeRequest.get("/events").then((res) => {
  return res.data;
  })
);
  const queryClient=useQueryClient()
  const { mutate, isLoading:isfetching,data:citydata}=useMutation(
    (city)=>{
     return makeRequest.get(`/events/findbycity/${city}`)
     
    },
    {
      onSuccess:()=>{
         queryClient.invalidateQueries(["findevents"])
      }
    }
  )
  const handlecity=async(e)=>{
    mutate(e.target.value)
  }
 console.log("citydata",citydata)


  return (
    <div className='Findevents'>
      <div style={{display:"flex",justifyContent:"space-evenly",marginTop:"5px"}}>
    <div className="form-check">
  <input className="form-check-input w-3" type="radio" name="exampleRadios" id="exampleRadios1" value="Mumbai" /*defaultChecked*/ onChange={(e)=>handlecity(e)}/>
  <label className="form-check-label" for="exampleRadios1">
   Mumbai
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Delhi" onChange={(e)=>handlecity(e)}/>
  <label className="form-check-label" for="exampleRadios2">
   Delhi
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Bangalore" onChange={(e)=>handlecity(e)}/>
  <label className="form-check-label" for="exampleRadios2">
   Bangalore
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Hyderabad" onChange={(e)=>handlecity(e)}/>
  <label className="form-check-label" for="exampleRadios2">
   Hyderabad
  </label>
</div>
<div className="form-check"> 
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Goa" onChange={(e)=>handlecity(e)}/>
  <label className="form-check-label" for="exampleRadios2">
   Goa
  </label>
</div>
</div>
<div className="homeevents">
        {isfetching ? (
          <Loader />
        ) : (
          citydata&&
          citydata.data.map((event) => {
            return (
              <div className="homeeventcontainer">
                <img src={"http://localhost:4000"+event.cover} alt="" className="homeeventimg" />
                <div className="homeeventin" >
                  <Link to={`/home/events/${event.id}`}>
                    <span className="homeeventname" >{event.name}</span>
                    <span className="homeeventorgname" >{event.city}</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>


    </div>
  )
}

export default Findevents
