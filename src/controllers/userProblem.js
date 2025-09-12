const createProblem = async(req,res)=>{
    const {Title,Description,Difficulty,tags,VisibleTestCases,HiddenTestCases,StartCode,ProblemCreator,referenceSolution}= req.body;
    {/*before we push to our database ... we have to check whether the solution provided is correct or not so for that we'll be using the judge0 */}
}