import React, { useState } from "react";
import "./home.css";
import img1 from "../../assets/info1.jpeg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Loader from "../../components/loader/Loader";
const Home = () => {
  const { usertype } = useContext(AuthContext);
  console.log("User-type -", usertype);
  const [events, setevents] = useState(null);
  const { isLoading, error, data } = useQuery(["events"], () =>
    makeRequest.get("/events").then((res) => {
      setevents(res.data);
      console.log("Events", events);
      return res.data;
    })
  );

  return (
    <div className="Home">
      <div className="homeevents">
        {isLoading ? (
          <Loader />
        ) : (
          data &&
          data.map((event) => {
            console.log("this event",event)
            return (
              <div className="homeeventcontainer">
                <img src={`http://localhost:4000/${event.cover}`} alt="" className="homeeventimg" />
                <div className="homeeventin">
                  <Link to={`/home/events/${event.id}`}>
                    <span className="homeeventname">{event.name}</span>
                    <span className="homeeventorgname">{event.city}</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
