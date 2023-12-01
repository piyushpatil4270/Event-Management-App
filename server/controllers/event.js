import { EVENTS } from "../models/event.js"
import { APPLICANTS } from "../models/applicant.js"
import jwt from "jsonwebtoken"
import fs from "fs"
export const getallevents=async(req,res)=>{
    try {
       const events=await EVENTS.find({})
       res.status(202).json(events) 
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const getevent=async(req,res)=>{
    try {
        const {eventId}=req.params
        const event=await EVENTS.findOne({id:eventId})
       
        res.status(202).json(event)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const getapplicants=async(req,res)=>{
    try {
        const {eventId}=req.params
        const event=await EVENTS.find({id:eventId})
        const applicants=await Promise.all(
           event[0].applicants.map((id) => APPLICANTS.findOne({id:id}))
        
          )
        res.status(202).json(applicants)
    } catch (error) {
        res.status(404).json(error.message)
    }
}
export const getselections=async(req,res)=>{
    try {
        const {eventId}=req.params
        const event=await EVENTS.find({id:eventId})
        const selections=await Promise.all(
           event[0].selections.map((id) => APPLICANTS.findOne({id:id}))
        
          )
        res.status(202).json(selections)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const geteventbyorganiser=async(req,res)=>{
    try {
        const {organiserId}=req.params
      //  const token=req.cookies.organiserToken
      //  if(!token) return res.status(404).json("Not logged in!")
      //  jwt.verify(token,"secretkey",async(err,info)=>{
      //  if(err) return res.status(404).json("Token not valid")
        const events=await EVENTS.find({organiserId:organiserId})
        res.status(202).json(events)
      // })
        

    } catch (error) {
        res.status(404).json(error.message)
    }
}
export const createevent=async(req,res)=>{
 try {
  
    const {id,name,organiserId,city,details}=req.body
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath);
   const event=await EVENTS.create({
        id,
        name,
        organiserId,
        city,
        details,
        cover:newpath
    })
    res.status(202).json(event)
 } catch (error) {
    res.status(404).json(error.message)
 }   
}

export const applyforevent=async(req,res)=>{
    try {
        const {eventId,applicantId} = req.params
        const token=req.cookies.applicantToken
        jwt.verify(token,"secretkey",async(err,info)=>{
        if(err) return res.status(404).json("Token not valid")
        const user=await APPLICANTS.find({id:applicantId})
        await EVENTS.updateOne(
            { id: eventId },
            { $push: { applicants: user[0].id} }
         )
         
         await  APPLICANTS.updateOne(
            {id:applicantId},
            {$push:{events:eventId}}
        )
        const updatedevent=await EVENTS.find({id:eventId})
        res.status(202).json(updatedevent[0])
        })
        
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const selectforevent=async(req,res)=>{
    try {
    const {applicantId,eventId}=req.params
    const {organiserId}=req.body
    const user=await  APPLICANTS.find({id:applicantId})
    const event=await EVENTS.find({id:eventId})
   // if(event[0].organiserId  !== organiserId) return res.status(404).json("You are only allowed to select your events")
    const updatedapplicants= event[0].applicants.filter(applicant=>applicant.toString() !==applicantId)
    console.log(updatedapplicants)
    await EVENTS.updateOne(
        {id:eventId},
        {$set:{applicants:updatedapplicants}}
        
    )
    await EVENTS.updateOne(
        {id:eventId},
        {$push:{selections:user[0].id}}
    )
    await  APPLICANTS.updateOne(
        {id:applicantId},
        {$push:{selected:eventId}}
    )
    const updatedevent=await EVENTS.find({id:eventId})
    res.status(202).json(updatedevent[0])
    } catch (error) {
        res.status(404).json(error.message)
    }
}
export const rejectforevent=async(req,res)=>{
    const {applicantId,eventId}=req.params
    const event=await EVENTS.findOne({id:eventId})
    const updatedapplicants=event.applicants.filter((id)=>id.toString() !==applicantId)
    await EVENTS.updateOne(
        {id:eventId},
        {$set:{applicants:updatedapplicants}}
    )
    await EVENTS.updateOne(
        {id:eventId},
        {$push:{rejections:applicantId}}
    )
    const updatedevent=await EVENTS.findOne({id:eventId})
    res.status(202).json(updatedevent)

}

export const geteventbycity=async(req,res)=>{
    const {City}=req.params
    const events=await EVENTS.find({city:City})
    const formattedevents=events.map( ({ _id,id, name, city, details, organiserId, cover})=>{
        return {name,details,city,id,_id,organiserId,cover}
    })
    res.status(202).json(formattedevents)
}