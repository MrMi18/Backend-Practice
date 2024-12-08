- Error Handling and Middleware
  const express = require("express");
  const {adminAuth }= require("../middleware/utils");

const app = express();

app.use('/admin',(req,res)=>{
throw new Error("Eror") ;  
 // res.send("hey Mi ")
})

app.get('/admin/getData',(req,res)=>{
res.send("Hey Admin It's your data")
})
app.get('/admin/status',(req,res)=>{
res.send("Hey Admin It's your status")
})

app.use('/',(req,res,next)=>{

    try{
        res.send("Hello We are checking an error ");
    }catch(err){
        console.error(err.message);
        res.status(500).send("Something went wrong");
    }

})

app.listen(3000,()=>{
console.log("hey Server is running.....");
})

- Admin File
  const adminAuth = (req,res,next) =>{
  const token = "abc";
  const isAuth = token === "xxx";
  if(!isAuth){
  res.status(401).send("unauthorised request");
  }else{
  next();
  }

}
module.exports= {adminAuth};

- Setting up an Database
  const mongoose = require('mongoose');

const connectDb = async () =>{
try{
await mongoose.connect("mongodb+srv://mrmi18:shane@123+-@mrmi.yq3pm.mongodb.net/");
}
catch(err) {
console.error("Database connection failed:", err.message);
}

};
module.exports = {connectDb};

app.js
const{connectDb} = require("../config/Database")

connectDb()
.then(()=>{
console.log("Database Connected Succesfully..");
app.listen(3000,()=>{
console.log("hey Server is running.....");
});

})
.catch((err) =>{
console.log("Database connection not established")
});

- Creating an Schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
    type:String,
    },
    lastName:{
    type:String,

    },
    Age:{
        type:Number,
    } ,
    gender:{
        type:String,
    } ,
    email:{
        type:String,

    },
    password:{
        type:String,
    }

})

module.exports = mongoose.model("User",userSchema);
