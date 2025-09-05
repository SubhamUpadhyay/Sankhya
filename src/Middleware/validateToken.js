const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/user");
const redisClient = require("../config/redis");

const validateToken = async(req,res,next)=>{
    try{
        const {AccessToken} = req.cookies;
        if(!AccessToken)
            throw new Error("No Token presenet");
        //validate the token 
        const payload = jwt.verify(AccessToken,process.env.JWT_KEY) //await not required;
        const {_id} = payload;
        if(!_id)
            throw new Error("User doesn't exist , Invalid Id");
        const result = await User.findById(_id);
        if(!result)
            throw new Error("User doesn't exist");
        //redis client ?
        //check if the token is present in the redis blocklist or not
        const isBlocked = await redisClient.exists(`AccessToken:${AccessToken}`);
        if(isBlocked)
            throw new Error("Invalid Token ");
        req.result = result;
        next();
    }catch(err)
    {
        res.status(401).send("Token not valid : "+err);
    }
}

module.exports = validateToken;