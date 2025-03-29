import express from "express";
import cors from "cors"//this is used to allow the request from the other domain
import cookieParser from "cookie-parser";//this is used to read the cookie from the browser

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

//this line is a configuration line to tell express that we can accept json data
app.use(express.json({limit :"16kb"}));
// when we get data from url it is in the incoded form this configuration is used for reading the data 
app.use(express.urlencoded({extended:true}));
// this configuration is used for storing some static data in public folder
app.use(express.static("public"))

//this is used to read the cookie form browser 
app.use(cookieParser())


export {app};//this is used to export the app object so that we can use it in other files