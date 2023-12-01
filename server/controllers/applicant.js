import { APPLICANTS } from "../models/applicant.js"
import fs from "fs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const createapplicant=async(req,res)=>{
  try {
    const {userid,username,email,password,phone,file}=req.body
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath);
    const salt=bcrypt.genSaltSync(10)
    const hashedpassword=bcrypt.hashSync(password,salt)
    const applicant=await APPLICANTS.create({
        id:userid,
        name:username,
        email,
        password:hashedpassword,
        phone,
        picture:newpath

    })
    res.status(202).json(applicant)
    
  } catch (error) {
    res.status(404).json(error.message)
  }
}

export const loginapplicant=async(req,res)=>{
    try {
        const body =req.body
    const applicant=await APPLICANTS.find({email:body.email})
        const checkpassword=bcrypt.compareSync(body.password,applicant[0].password)
        if(!checkpassword) res.status(404).json("Wrong email or password")
        const token=jwt.sign({id:applicant.id},"secretkey")
      
        res.cookie("applicantToken",token).status(202).json(applicant[0])
       
       } catch (error) {
          res.status(404).json(error.message) 
       }
}