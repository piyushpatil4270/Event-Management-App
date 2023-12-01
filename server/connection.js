import {connect} from "mongoose"


export const connection=()=>{
    connect("mongodb://127.0.0.1:27017/getEvents")
    .then(console.log("Connected to mongoDB"))
    .catch((error)=>console.log("ERROR:",error))
}