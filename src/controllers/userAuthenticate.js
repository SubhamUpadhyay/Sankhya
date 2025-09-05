const redisClient = require("../config/redis");
const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    //validate the data;
    validate(req.body);
    const { FirstName, LastName, EmailId, Password } = req.body;
    //Email already exist or not .. no need to check as we have made the EmailId as unique in Schema
    //user.exist({EmailId});
    // const salt = await bcrypt.genSalt(12);
    req.body.Password = await bcrypt.hash(req.body.Password, 12);

    req.body.role = "user";
    const user = await User.create(req.body);
    //jwt token
    const token = jwt.sign({ EmailId: EmailId }, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
    res.cookie("AccessToken", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registerd Successfully");
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
};

const login = async (req, res) => {
  try {
    const { EmailId, Password } = req.body;
    if (!EmailId || !Password) throw new Error("Invalid credientials");
    const user = await User.findOne({ EmailId });
    if (!user) return res.status(404).send("User doesn't exist");
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) return res.status(401).send("Invalid Credientials");
    const token = jwt.sign({ _id:user._id,EmailId: EmailId }, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
    res.cookie("AccessToken", token, { maxAge: 60 * 60 * 1000 });

    res.status(200).send("Logged In Successfully");
  } catch (err) {
    res.status(401).send("Error" + err);
  }
};

const getProfile = async(req,res)=>{
    try{
        const {AccessToken} = req.cookies;
        if(!AccessToken)
            throw new Error("Token doesn't exist");
        const payload = jwt.decode(AccessToken);
        const {_id} = payload;
        if(!_id)
            throw new Error("ID doesn't exist");
        const user = await User.findById(_id);
        if(!user)
            throw new Error("User doesn't exist");
        const {FirstName,LastName,Age,ProblemSolved,EmailId} = user;
        res.status(201).json({FirstName,LastName,Age,ProblemSolved,EmailId});
    }catch(err){
        res.status(401).send(`Error in getProfile:`+err);
    }

}
const logout = async (req, res) => {
  try {
    //validate the token what if already expired
    //done through Middleware
    const { AccessToken } = req.cookies;
    const payload = jwt.decode(AccessToken);

    await redisClient.set(`AccessToken:${AccessToken}`, "blocked");
    //fix the exipry time
    await redisClient.expireAt(`AccessToken:${AccessToken}`, payload.exp);
    //if valid add it to the blocklist
    //clear the cookies after that and then set the new expiry time as of Now
    res.cookie("AccessToken", null, {expires:new Date(Date.now())});
    res.status(200).send("Successfully Logged Out!");
  } catch (err) 
  {
    redisClient.status(401).send("Error in logout : " + err);
  }
};
module.exports = { register, login,logout,getProfile};
