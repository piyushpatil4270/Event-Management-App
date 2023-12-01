import {Schema,model} from "mongoose"

const organiserSchema=Schema({
  id:{
    type:String,
    unique:true
  },
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  picture:{
    type:String,
    default:''
  }

})

export const ORGANISERS=model("Organiser",organiserSchema)