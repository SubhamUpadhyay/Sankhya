const express = require("express")
const ProblemRouter = express.Router();
const AdminMiddleware = require("../Middleware/AdminMiddleware")
//create
ProblemRouter.post("/create",AdminMiddleware,createProblem);   //Admin required
//fetch problem with respective id
ProblemRouter.get("/:id",getProblemById);
//fetch all problems
ProblemRouter.get("/",getAllProblem);
//update
ProblemRouter.patch("/:id",AdminMiddleware,updateProblem);    //Admin Access required
//delete
ProblemRouter.delete("/:id",AdminMiddleware,deleteProblem);   //Admin Access required
//give back the problem solved by user
ProblemRouter.get("/user",solvedProblems);
