import {Schema,model} from "mongoose"

const applicantSchema=Schema({
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
  },
  events:{
    type:Array,
    default:[]
  },
  selected:{
    type:Array,
    default:[]
  }

})

export const APPLICANTS=model("Applicant",applicantSchema)