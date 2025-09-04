const validator = require('validator');
const validate = (data)=>{
    const mandatoryField = ['FirstName',"LastName","EmailId","Password"];
    const isAllowed = mandatoryField.every((k)=>Object.keys(data).includes(k));
    if(!isAllowed)
        throw new Error("Field Missing");
    if(validator.isEmail(data.EmailId))
        throw new Error("Invalid Email");
    if(validator.isStrongPassword(data.Password))
        throw new Error("Weak Password");
}

module.exports = validate;