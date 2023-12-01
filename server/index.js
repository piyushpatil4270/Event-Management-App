import express from "express"
import { connection } from "./connection.js"
import bodyParser from "body-parser"
import applicantrouter from "./routes/applicant.js"
import organiserrouter from "./routes/organiser.js"
import eventrouter from "./routes/event.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

const app=express()
const port =4000
// connect with database
connection()
// middleware
app.use(express.json())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
}))
app.use('Uploads',express.static(__dirname + '/Uploads'));
//app.use('/Uploads', express.static('Uploads'));

app.use("/api/applicants",applicantrouter)
app.use("/api/organisers",organiserrouter)
app.use("/api/events",eventrouter)
app.listen(port,()=>console.log(`Server started on port ${port}`))