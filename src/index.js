const express = require("express");
const app = express();
require('dotenv').config()
const connect_mongoose = require("./config/db")

const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());



async function InitiateConnection(){
    try{
     await connect_mongoose();
     
     app.listen(process.env.PORT,()=>{
        console.log("connect to server at port => "+process.env.PORT);
     })
    }catch(err)
    {
        console.log("Error : " + err.message);
    }
    
}
 InitiateConnection();