const express = require("express")
const ProblemRouter = express.Router();
//create
ProblemRouter.post("/create",createProblem);   //Admin required
//fetch problem with respective id
ProblemRouter.get("/:id",fetchProblem);
//fetch all problems
ProblemRouter.get("/",getAllProblem);
//update
ProblemRouter.patch("/:id",updateProblem);    //Admin required
//delete
ProblemRouter.delete("/:id",deleteProblem);   //Admin required
//give back the problem solved by user
ProblemRouter.get("/user",solvedProblems);
