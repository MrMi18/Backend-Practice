const validator  = require("validator");

const signupValidation = (req) =>{
    const{firstName,lastName,password,emailID} = req.body;
    if(!validator.isStrongPassword(password)){
        throw new Error ("Password must be Strong");
    }else if(!firstName || !lastName){
        throw new Error(" Please Enter Correct Name ")
    }
}

module.exports = signupValidation;