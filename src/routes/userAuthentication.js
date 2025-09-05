const express =  require("express")
const authRouter = express.Router()
const {register,login,logout,getProfile} = require("../controllers/userAuthenticate");
const validateToken = require("../Middleware/validateToken")
//Register

authRouter.post('/register',register);

//login
authRouter.post('/login',login);

// //logout
authRouter.post('/logout',validateToken,logout);

// //getProfile
authRouter.get('/getProfile',validateToken,getProfile);

module.exports = authRouter;