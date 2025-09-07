const express =  require("express")
const authRouter = express.Router()
const {register,login,logout,getProfile,adminRegister} = require("../controllers/userAuthenticate");
const validateToken = require("../Middleware/validateToken")
const AdminMiddleware = require("../Middleware/AdminMiddleware");

//Register
authRouter.post('/register',register);

//login
authRouter.post('/login',login);

// //logout
authRouter.post('/logout',validateToken,logout);

// //getProfile
authRouter.get('/getProfile',validateToken,getProfile);

//Admin
authRouter.post('/register/admin',AdminMiddleware,adminRegister);

module.exports = authRouter;