import { ORGANISERS } from "../models/organiser.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"
export const createorganiser=async(req,res)=>{
  try {
    const {userid,username,email,password,phone}=req.body
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath);
    const salt=bcrypt.genSaltSync(10)
    const hashedpassword=bcrypt.hashSync(password,salt)
    const organiser=await ORGANISERS.create({
        id:userid,
        name:username,
        email,
        password:hashedpassword,
        phone,
        picture:newpath
    })
    
    res.status(202).json(organiser)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

export const loginorganiser=async(req,res)=>{
    try {
     const body =req.body
  
     const organiser=await ORGANISERS.find({email:body.email})
     const checkpassword=bcrypt.compareSync(body.password,organiser[0].password)
     if(!checkpassword) res.status(404).json("Wrong email or password")
     const token=jwt.sign({id:organiser.id},"secretkey",async(err,info)=>{
     if(err) return res.status(404).json("Token invalid")
      res.cookie("organiserToken",token).status(202).json(organiser[0])
    })

    

    } catch (error) {
       res.status(404).json(error.message) 
    }
}
