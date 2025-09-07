const express = require("express");
const app = express();
require('dotenv').config()
const connect_mongoose = require("./config/db")
const authRouter = require("./routes/userAuthentication")
const cookieParser = require("cookie-parser")
const redisClient = require("./config/redis")
app.use(express.json());
app.use(cookieParser());
app.use("/user",authRouter);

async function InitiateConnection(){
    try{
    //  await connect_mongoose();
     await Promise.all[connect_mongoose(),redisClient.connect()];
     console.log(`Mongoose connected`);
     console.log("redisClient connected");
     
     app.listen(process.env.PORT,()=>{
        console.log("connect to server at port => "+process.env.PORT);
     })
    }catch(err)
    {
        console.log("Error : " + err.message);
    }
    
}
 InitiateConnection();