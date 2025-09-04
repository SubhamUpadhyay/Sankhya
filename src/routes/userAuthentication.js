const express =  require("express")
const authRouter = express.Router()

//Register

authRouter.post('/register',register);

//login
authRouter.post('/login',login);
//logout
authRouter.post('/logout',logout);

//getProfile
authRouter.get('/getProfile',getProfile);

