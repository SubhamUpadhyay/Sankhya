const {getLangugageById,submitBatch} = require("../utils/problemLangugageUtility"); 
const createProblem = async(req,res)=>{
    const {Title,Description,Difficulty,tags,VisibleTestCases,HiddenTestCases,StartCode,ProblemCreator,referenceSolution}= req.body;
    {/*before we push to our database ... we have to check whether the solution provided is correct or not so for that we'll be using the judge0 */}
    try{
        
    for (const {Langugage,completeCode} of referenceSolution)
    {
        //source code
        //langugage_id 
        //input => std_in
        //output => expected_output
        const langugageId = getLangugageById(Langugage);
        if(langugageId=="Notfound")
            throw new Error("Language doesn't exist ");
        //creating batch submission
        const submissions = VisibleTestCases.map((Input,Output)=>({
            source_code:completeCode,
            langugage_id:langugageId,
            stdin:Input,
            expected_output:Output
        }))

        const submitResult = await submitBatch(submissions);
    }

    }catch(err){
        res.status(401).send("Error",err.message);
    }
}

module.exports = createProblem;