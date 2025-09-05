const express =  require("express")
const authRouter = express.Router()
const {register,login} = require("../controllers/userAuthenticate");

//Register

authRouter.post('/register',register);

//login
authRouter.post('/login',login);

// //logout
// authRouter.post('/logout',logout);

// //getProfile
// authRouter.get('/getProfile',getProfile);

module.exports = authRouter;