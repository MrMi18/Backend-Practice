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

    },
    Age:{
        type:Number,
        min:13,
        
    } ,
    gender:{
        type:String,
        validate(value){
            if(!["male","female"].includes(value)){
                throw new Error ("gender should be only male or female");
            }
        }
    } ,
    photoURL:{
        typr:String,
        // validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("Enter valid URL")
        //     }
        // }
    },
    emailID:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valid URL")
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
        
           
        // validate: {
        //     validator: function (value) {
        //         return !value.includes(" "); // Returns `true` if valid
        //     },
        //     message: "Spaces are not allowed in the password",
        // },
        
    },
    deignation:{
        type:String,
        default:"Software Engineer",
    },
    skill:[String]
},
{
    timestamps:true,
})



module.exports = mongoose.model("User",userSchema);