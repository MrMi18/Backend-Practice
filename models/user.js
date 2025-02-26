const mongoose  = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
    firstName:{
        
        type:String,
        required: true,
        minLength:3,
        maxLength:10,
    },
    
    lastName:{
        type:String,
        minLength:3,
        maxLength:10,
        required:true

    },
    Age:{
        type:Number,
        min:16,
        
    } ,
    gender:{
        type:String,
        default:"Not Specified",
        validate(value){
            if(!["male","female","Not Specified"].includes(value)){
                throw new Error ("gender should be only male or female");
            }
        },
         
    } ,
    photoURL:{
        type:String,
    },
    emailID:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Please enter valid mail id");
            }
        }

    },
    password:{
        type:String,
        required:true,
        minLength:5,
       
        validate(value){
            if(value.includes(" ")){
                throw new Error("Spaces are not allowed in password,");
            }
           
            
        },
    },
    designation:{
        type:String,
        default:"Software Engineer",
    },
    skill:[String],
    about:{
        type:String,
        maxLength:50,
    },
    city:{
        type:String,
        maxLength:100,
    },
    
    company:{
        type:String,
        maxLength:50,
    },
    
},
{
    timestamps:true,
})



module.exports = mongoose.model("User",userSchema);