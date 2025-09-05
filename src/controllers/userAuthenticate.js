const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const register = async (req,res) =>{
    try{
        //validate the data;
        validate(req.body);
        const {FirstName,LastName,EmailId,Password}= req.body;
        //Email already exist or not .. no need to check as we have made the EmailId as unique in Schema
        //user.exist({EmailId});
        // const salt = await bcrypt.genSalt(12);
        req.body.Password= await bcrypt.hash(req.body.Password,12);

        //jwt token 
        
        const user = await User.create(req.body);
        const token = jwt.sign({EmailId:EmailId},process.env.JWT_KEY,{expiresIn:3600});
        res.cookie("AccessToken",token,{maxAge:60*60*1000});
        res.status(201).send("User Registerd Successfully");

    }catch(err){
            res.status(400).send("Error : "+err);
    }
}

const login = async(req,res)=>{
    try{
        const {EmailId,Password} = req.body;
        if(!EmailId || !Password)
        throw new Error("Invalid credientials");
        const user = await User.findOne({EmailId})
        if(!user)
            return res.status(404).send("User doesn't exist");
        const match = await bcrypt.compare(Password,user.Password);
        if(!match)
            return res.status(401).send("Invalid Credientials");
        const token = jwt.sign({EmailId:EmailId},process.env.JWT_KEY,{expiresIn:3600});
        res.cookie("AccessToken",token,{maxAge:60*60*1000});

        res.status(200).send("Logged In Successfully");          
        
    }catch(err)
    {
        res.status(401).send("Error"+err);
    }
}

module.exports = {register,login};