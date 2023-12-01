import {Schema,model} from "mongoose"

const eventSchema=Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    organiserId:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        default:""
    },
    applicants:{
        type:Array,
        default:[]
    },
    selections:{
        type:Array,
        default:[]
    },
    rejections:{
        type:Array,
        default:[]
    }
})

export const EVENTS=model("Event",eventSchema)