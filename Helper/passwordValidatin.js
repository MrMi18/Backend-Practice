const validator  = require("validator");

const passwordValidation = (userEnteredPass) =>{
    if(!validator.isStrongPassword(userEnteredPass)){
        throw new Error("Please Enter valid Password (atleast one capital and special character)");
    }
}
module.exports = passwordValidation;